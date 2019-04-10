// tslint:disable:no-object-literal-type-assertion
// tslint:disable:readonly-array
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrganizationComponentService } from './create-organization.component.service';
import { PostProfileDetails } from '@anymind-ng/api';
import { Subject, EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { COMPANY_FORM_NAME } from '@platform/shared/components/payout-invoice-details/components/company-form/company-form.component';
import { PostProfileWithInvoiceDetails } from '@anymind-ng/api/model/postProfileWithInvoiceDetails';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { NavbarActions } from '@platform/core/actions';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';
import { waitForSession } from '@platform/core/utils/wait-for-session';

enum CreateOrganizationModalSteps {
  ORGANIZATION_DETAILS,
  INVOICE_DETAILS,
}

@Component({
  selector: 'plat-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.sass'],
})
export class CreateOrganizationModalComponent implements OnInit, OnDestroy {
  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  public readonly basicProfileDataControlName = 'basicProfileData';
  public readonly descriptionControlName = 'description';
  public readonly linksControlName = 'links';
  public organizationForm: FormGroup;
  public invoiceDetailsForm: FormGroup;
  public avatarTokenProfileNameFormControl = new FormControl('', Validators.required);
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  public isRequestPending = false;
  public isFileUploading = false;
  public isValidated = false;
  public fileUploadTokensList: ReadonlyArray<string> = [];
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;
  public hasProfileConsultationsAsExpert = false;
  public modalSteps = CreateOrganizationModalSteps;
  public currentModalStep = CreateOrganizationModalSteps.ORGANIZATION_DETAILS;

  /** form controls */
  public linksFormControl = new FormControl([]);

  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private router: Router,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private createOrganizationComponentService: CreateOrganizationComponentService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateOrganizationModalComponent');
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.invoiceDetailsForm = new FormGroup({});
    this.organizationForm = new FormGroup({
      [this.linksControlName]: this.linksFormControl,
      [this.basicProfileDataControlName]: this.avatarTokenProfileNameFormControl,
    });

    this.modalAnimationComponentService.startLoadingAnimation();
    this.createOrganizationComponentService
      .getInitialData()
      .pipe(
        catchError(() => {
          this.onModalClose();

          return EMPTY;
        }),
      )
      .subscribe(({ hasConsultations, getInvoiceDetails }) => {
        this.modalAnimationComponentService.stopLoadingAnimation();
        this.hasProfileConsultationsAsExpert = hasConsultations;
        if (getInvoiceDetails !== undefined) {
          this.createOrganizationComponentService.patchInvoiceDetailsForm(this.invoiceDetailsForm, getInvoiceDetails);
        }
      });
  }

  public onModalClose(): void {
    this.activeModal.close(true);
  }

  public onSaveProfile(): void {
    if (this.isCreateOrganizationDataValid()) {
      this.isRequestPending = true;
      this.sendOrganizationProfile();
    } else {
      this.formUtils.validateAllFormFields(this.invoiceDetailsForm);
    }
  }

  public onFileUploadingStatusChange(isUploading: boolean): void {
    this.isFileUploading = isUploading;
  }

  public onBackwardClick(): void {
    this.stepper.previous();
    this.currentModalStep = CreateOrganizationModalSteps.ORGANIZATION_DETAILS;
  }

  public onVerifyProfile(): void {
    this.isValidated = true;
    if (this.organizationForm.valid) {
      this.isRequestPending = true;
      this.validateProfileDetails();
    } else {
      this.formUtils.validateAllFormFields(this.organizationForm);
    }
  }

  public onFileUploadTokensList(files: ReadonlyArray<string>): void {
    this.fileUploadTokensList = files;
  }

  private sendOrganizationProfile(): void {
    this.createOrganizationComponentService
      .createOrganizationProfile(this.getOrganizationProfileData())
      .pipe(
        tap(() => {
          this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.COMPANY));
        }),
        waitForSession(this.store),
        catchError(() => {
          this.isRequestPending = false;

          return EMPTY;
        }),
      )
      .subscribe(profile => {
        this.alertService.pushSuccessAlert('DASHBOARD.CREATE_PROFILE.CREATE_ORGANIZATION_PROFILE.SUCCESS_ALERT');
        this.redirectToOrganizationState(profile.id);
      });
  }

  private redirectToOrganizationState(accountId: string): void {
    this.router
      .navigate([`/dashboard/company/profile/${accountId}`])
      .then(isRedirectSuccessful => {
        this.onModalClose();
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Error when redirect to /dashboard/company/profile/');
        }
      })
      .catch(this.logger.error.bind(this));
  }

  private getOrganizationDetails(): PostProfileDetails {
    const formControls = this.organizationForm.controls;

    return {
      profileType: PostProfileDetails.ProfileTypeEnum.ORG,
      name: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
      description: formControls[this.descriptionControlName].value,
      files: [...this.fileUploadTokensList],
      links: this.linksFormControl.value,
    };
  }

  private getOrganizationProfileData(): PostProfileWithInvoiceDetails {
    return {
      profileDetails: this.getOrganizationDetails(),
      companyDetails: this.createOrganizationComponentService.getInvoiceDetailsFromForm(this.invoiceDetailsForm),
    };
  }

  private isCreateOrganizationDataValid(): boolean {
    return this.organizationForm.valid && this.invoiceDetailsForm.controls[COMPANY_FORM_NAME].valid;
  }

  private validateProfileDetails(): void {
    this.createOrganizationComponentService
      .validateOrganizationDetails(this.getOrganizationDetails())
      .pipe(
        finalize(() => {
          this.isRequestPending = false;
        }),
      )
      .subscribe(() => {
        this.currentModalStep = CreateOrganizationModalSteps.INVOICE_DETAILS;
        this.stepper.next();
      });
  }
}
