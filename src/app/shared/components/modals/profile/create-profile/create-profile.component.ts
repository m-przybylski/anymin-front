// tslint:disable:no-object-literal-type-assertion
// tslint:disable:max-file-line-count
// tslint:disable:readonly-array
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { CreateProfileComponentService } from './create-profile.component.service';
import { PutGeneralSettings } from '@anymind-ng/api/model/putGeneralSettings';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { NavbarActions } from '@platform/core/actions';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { VisibilityInitActions } from '@platform/features/dashboard/actions';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { GetInvoiceDetails, PostCompanyDetails, PostProfileDetails } from '@anymind-ng/api';
import { PostProfileWithInvoiceDetails } from '@anymind-ng/api/model/postProfileWithInvoiceDetails';
import { PostNaturalPersonDetails } from '@anymind-ng/api/model/postNaturalPersonDetails';
import {
  NATURAL_PERSON_FORM_NAME,
  NaturalPersonInvoiceDetailsFormControlNames,
} from '@platform/shared/components/payout-invoice-details/components/natural-person-form/natural-person-form.component';
import {
  COMPANY_FORM_NAME,
  CompanyInvoiceDetailsFormControlNames,
} from '@platform/shared/components/payout-invoice-details/components/company-form/company-form.component';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';

enum CreateProfileModalSteps {
  PROFILE_DETAILS,
  INVOICE_DETAILS,
}

@Component({
  selector: 'plat-create-profile',
  styleUrls: ['./create-profile.component.sass'],
  templateUrl: './create-profile.component.html',
})
export class CreateProfileModalComponent implements OnInit, OnDestroy, AfterViewInit {
  /** form fields */
  // TODO: remove once not needed
  public readonly descriptionControlName = 'description';
  public readonly basicProfileDataControlName = 'basicProfileData';
  public readonly linksControlName = 'links';

  public profileForm: FormGroup;
  public invoiceDetailsForm: FormGroup;
  public avatarTokenProfileNameFormControl = new FormControl('', Validators.required);
  public fileUploadTokensList: ReadonlyArray<string> = [];
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  public currentModalStep = CreateProfileModalSteps.PROFILE_DETAILS;
  public modalSteps = CreateProfileModalSteps;
  /**
   * start modal with pending set to false
   * initial information are from store.
   * This is potential candidate to be removed.
   */
  public isRequestPending = false;
  public isFileUploading = false;
  public isValidated = false;

  /**
   * determines weather user has already create a profile.
   * If profile exists do not show invoice details.
   */
  public hasProfile = false;
  /**
   * filed used to disable possibility to collapse modal to only client profile
   */
  public isOpenedAsExpert = true;
  public isExpert: boolean;
  public isCompany: boolean;
  public modalHeaderTr: string;
  /**
   * provided as external parameter when opened modal
   * indicated if modal will store expert data or only
   * client data.
   */
  @Input()
  public isExpertForm = true;

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  private userCountryIsoCode: string;
  private logger: LoggerService;
  private linksFormControl = new FormControl();
  private selectedInvoiceDetailsType = GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON;
  private selectedInvoiceDetailsFormName = NATURAL_PERSON_FORM_NAME;

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private createProfileComponentService: CreateProfileComponentService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private router: Router,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateProfileModalComponent');
  }

  public ngOnInit(): void {
    this.createProfileComponentService
      .getCountryIsoAndProfile()
      .pipe(
        catchError(() => {
          this.onModalClose();

          return EMPTY;
        }),
      )
      .subscribe(({ countryISO, hasProfile }) => {
        this.userCountryIsoCode = countryISO;
        this.hasProfile = hasProfile;
      });
    this.invoiceDetailsForm = new FormGroup({});
    this.profileForm = new FormGroup({
      [this.basicProfileDataControlName]: this.avatarTokenProfileNameFormControl,
      [this.linksControlName]: this.linksFormControl,
    });
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation();
  }

  public ngOnDestroy(): void {
    this.modalAnimationComponentService.getPreviousHeight$().next('inherit');
  }

  public onVerifyProfile(): void {
    this.isValidated = true;
    if (this.profileForm.valid) {
      this.isRequestPending = true;
      if (this.isExpertForm) {
        this.validateProfileDetails();
      } else {
        this.sendClientProfile(this.getClientDetails());
      }
    } else {
      this.formUtils.validateAllFormFields(this.profileForm);
    }
  }

  public onSaveProfile(): void {
    if (this.isCreateProfileDataValid()) {
      this.isRequestPending = true;
      this.sendExpertProfile();
    } else {
      this.validateInvoiceForm();
    }
  }

  public onBackwardClick(): void {
    this.stepper.previous();
    this.currentModalStep = CreateProfileModalSteps.PROFILE_DETAILS;
  }

  public onFileUploadingStatusChange(isUploading: boolean): void {
    this.isFileUploading = isUploading;
  }

  public onFileUploadTokensList(files: ReadonlyArray<string>): void {
    this.fileUploadTokensList = files;
  }

  // TODO uncomment this after Beta release ends
  // public toggleIsExpertForm(): void {
  //   this.isExpertForm = !this.isExpertForm;
  // }

  public onSelectInvoiceDetailsType(type: GetInvoiceDetails.InvoiceDetailsTypeEnum): void {
    this.selectedInvoiceDetailsType = type;
    this.selectedInvoiceDetailsFormName =
      type === GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON ? NATURAL_PERSON_FORM_NAME : COMPANY_FORM_NAME;
  }

  private sendClientProfile(data: PutGeneralSettings): void {
    this.createProfileComponentService.createClientProfile(data).subscribe(
      () => {
        this.onModalClose();
      },
      () => this.handleResponseError(),
    );
  }

  private getProfileWithInvoiceDetails(): PostProfileWithInvoiceDetails {
    const postProfileWithInvoiceDetails: PostProfileWithInvoiceDetails = {
      profileDetails: this.getProfileDetails(),
    };
    if (this.hasProfile) {
      return postProfileWithInvoiceDetails;
    }
    if (this.selectedInvoiceDetailsType === GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON) {
      return {
        ...postProfileWithInvoiceDetails,
        naturalPersonDetails: this.getNaturalPersonInvoiceDetails(),
      };
    }

    return {
      ...postProfileWithInvoiceDetails,
      companyDetails: this.getCompanyInvoiceDetails(),
    };
  }

  private getClientDetails(): PutGeneralSettings {
    return {
      nickname: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
    };
  }

  private sendExpertProfile(): void {
    this.createProfileComponentService
      .createClientProfile(this.getClientDetails())
      /** and update expert profile */
      .pipe(
        switchMap(() => this.createProfileComponentService.createExpertProfile(this.getProfileWithInvoiceDetails())),
      )
      .subscribe(
        getProfile => {
          this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.EXPERT));
          this.store.dispatch(new VisibilityInitActions.FetchInitVisibilityAction());
          /* It have to be refactor, for now we don't want to redirect users from invitations list view */
          !this.isExpert &&
          this.router.url !== '/dashboard/user/discover' &&
          this.router.url !== '/dashboard/user/invitations/list'
            ? this.redirectToExpertState(getProfile.id)
            : this.onModalClose();
        },
        () => this.handleResponseError(),
      );
  }

  private redirectToExpertState(id: string): void {
    this.router
      .navigate([`dashboard/user/profile/${id}`])
      .then(isRedirectSuccessful => {
        this.onModalClose();
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Error when redirect to dashboard/user/profile/');
        }
      })
      .catch(this.logger.error.bind(this));
  }

  private handleResponseError(): void {
    this.isRequestPending = false;
  }

  private onModalClose(): void {
    this.activeModal.close(true);
  }

  private getProfileDetails(): PostProfileDetails {
    const formControls = this.profileForm.controls;

    return {
      profileType: PostProfileDetails.ProfileTypeEnum.EXP,
      name: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
      description: formControls[this.descriptionControlName].value,
      files: [...this.fileUploadTokensList],
      links: this.linksFormControl.value,
    };
  }

  private getNaturalPersonInvoiceDetails(): PostNaturalPersonDetails {
    const formGroup = <FormGroup>this.invoiceDetailsForm.controls[NATURAL_PERSON_FORM_NAME];
    const controls = formGroup.controls;

    return {
      firstName: controls[NaturalPersonInvoiceDetailsFormControlNames.FIRST_NAME].value,
      lastName: controls[NaturalPersonInvoiceDetailsFormControlNames.LAST_NAME].value,
      address: {
        street: controls[NaturalPersonInvoiceDetailsFormControlNames.STREET].value,
        streetNumber: controls[NaturalPersonInvoiceDetailsFormControlNames.STREET_NUMBER].value,
        apartmentNumber: controls[NaturalPersonInvoiceDetailsFormControlNames.APARTMENT_NUMBER].value,
        city: controls[NaturalPersonInvoiceDetailsFormControlNames.CITY].value,
        postalCode: this.getPostalCode(controls[NaturalPersonInvoiceDetailsFormControlNames.POSTAL_CODE].value),
        countryISO: this.userCountryIsoCode,
      },
    };
  }

  private getCompanyInvoiceDetails(): PostCompanyDetails {
    const formGroup = <FormGroup>this.invoiceDetailsForm.controls[COMPANY_FORM_NAME];
    const controls = formGroup.controls;

    return {
      companyName: controls[CompanyInvoiceDetailsFormControlNames.COMPANY_NAME].value,
      vatNumber: controls[CompanyInvoiceDetailsFormControlNames.VAT_NUMBER].value,
      address: {
        street: controls[CompanyInvoiceDetailsFormControlNames.STREET].value,
        streetNumber: controls[CompanyInvoiceDetailsFormControlNames.STREET_NUMBER].value,
        apartmentNumber: controls[CompanyInvoiceDetailsFormControlNames.APARTMENT_NUMBER].value,
        city: controls[CompanyInvoiceDetailsFormControlNames.CITY].value,
        postalCode: this.getPostalCode(controls[CompanyInvoiceDetailsFormControlNames.POSTAL_CODE].value),
        countryISO: this.userCountryIsoCode,
      },
      vatRateType: controls[CompanyInvoiceDetailsFormControlNames.VAT_RATE].value,
    };
  }

  private getPostalCode(postCodeValue: string): string {
    const firstPartOfPostalCode = 2;

    return `${postCodeValue.slice(0, firstPartOfPostalCode)}-${postCodeValue.slice(firstPartOfPostalCode)}`;
  }

  private isCreateProfileDataValid(): boolean {
    if (this.hasProfile) {
      return this.profileForm.valid;
    } else {
      return this.profileForm.valid && this.invoiceDetailsForm.controls[this.selectedInvoiceDetailsFormName].valid;
    }
  }

  private validateInvoiceForm(): void {
    this.formUtils.validateAllFormFields(this.invoiceDetailsForm.controls[
      this.selectedInvoiceDetailsFormName
    ] as FormGroup);
  }

  private validateProfileDetails(): void {
    this.createProfileComponentService
      .validateProfileDetails(this.getProfileDetails())
      .pipe(
        finalize(() => {
          this.isRequestPending = false;
        }),
      )
      .subscribe(() => {
        this.currentModalStep = CreateProfileModalSteps.INVOICE_DETAILS;
        this.stepper.next();
      });
  }
}
