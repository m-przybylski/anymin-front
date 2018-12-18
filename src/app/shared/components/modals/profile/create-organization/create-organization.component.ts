// tslint:disable:no-object-literal-type-assertion
import { Component, OnInit } from '@angular/core';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { Config } from '../../../../../../config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrganizationModalComponentService } from './create-organization.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { PutOrganizationDetails } from '@anymind-ng/api';
import { Subject } from 'rxjs';
import { takeUntil, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavbarActions } from '@platform/core/actions';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { waitForSession } from '@platform/core/utils/wait-for-session';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';

@Component({
  selector: 'plat-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.sass'],
})
export class CreateOrganizationModalComponent implements OnInit {
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;
  public readonly descriptionFormControl = 'descriptionFormControl';
  public readonly profileLinksFormControl = 'profileLinksFormControl';
  public createOrganizationFormGroup: FormGroup;
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  public isInputDisabled = false;
  public maxValidFileSize = 30000000;
  public maxValidFilesCount = 20;
  public isPending = true;
  public isFileUploading = false;
  public fileUploadTokensList: ReadonlyArray<string>;
  public profileLinksList: ReadonlyArray<string> = [];
  public linksList: ReadonlyArray<string> = [];
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;
  public isProfileHasConsultations = false;
  public avatarToken: string;
  public modalHeaderTr: string;

  /** form controls */
  public avatarTokenProfileNameFormControl = new FormControl();

  /**
   * flag shows if company exists on modal open.
   * based on that flag user logic determines if navigate to profile or not
   */
  private isCompany = false;

  private readonly modalHeaderTrKeys = {
    createProfile: 'DASHBOARD.CREATE_PROFILE.CREATE_ORGANIZATION_PROFILE.CREATE_TITLE',
    editProfile: 'DASHBOARD.CREATE_PROFILE.CREATE_ORGANIZATION_PROFILE.EDIT_TITLE',
  };
  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private router: Router,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private createOrganizationModalComponentService: CreateOrganizationModalComponentService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateOrganizationModalComponent');

    this.createOrganizationFormGroup = new FormGroup({
      avatarTokenProfileName: this.avatarTokenProfileNameFormControl,
    });
  }

  public ngOnDestroy(): void {
    this.modalAnimationComponentService.getPreviousHeight$().next('inherit');
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.modalAnimationComponentService.startLoadingAnimation();
    this.createOrganizationModalComponentService
      .getModalData()
      .pipe(
        finalize(() => {
          this.modalAnimationComponentService.stopLoadingAnimation();
          this.handleResponseError();
        }),
      )
      .subscribe(modalData => {
        if (modalData.getProfileWithDocuments !== undefined) {
          /** company exists prepare for edit */
          this.modalHeaderTr = this.modalHeaderTrKeys.editProfile;
          this.isCompany = true;
          this.setCompanyFormValues(modalData.getProfileWithDocuments);
        } else {
          /** company does exist prepare for create */
          this.modalHeaderTr = this.modalHeaderTrKeys.createProfile;
        }
        this.isProfileHasConsultations = modalData.hasConsultations;
      });
  }

  public onUploadingFile = (isUploading: boolean): void => {
    this.isFileUploading = isUploading;
    this.isInputDisabled = isUploading;
    this.isPending = isUploading;
  };

  public onUploadFile = (tokenList: ReadonlyArray<string>): ReadonlyArray<string> =>
    (this.fileUploadTokensList = tokenList);

  public onAddProfileLink = (links: ReadonlyArray<string>): ReadonlyArray<string> => (this.linksList = links);

  public onModalClose = (): void => this.activeModal.close(true);

  public onCreateOrganizationProfile = (formGroup: FormGroup): void => {
    if (formGroup.valid && !this.isPending) {
      this.isInputDisabled = true;
      this.sendOrganizationProfile();
    } else {
      this.formUtils.validateAllFormFields(formGroup);
    }
  };

  /** update organization callbacks */
  private sendOrganizationProfile = (): void => {
    this.createOrganizationModalComponentService
      .createOrganizationProfile(this.getFormValues())
      .pipe(
        tap(() => this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.COMPANY))),
        waitForSession(this.store),
        takeUntil(this.ngUnsubscribe$),
        finalize(() => this.handleResponseError()),
      )
      .subscribe(getProfile => {
        !this.isCompany ? this.redirectToOrganizationState(getProfile.id) : this.onModalClose();
      });
  };

  private redirectToOrganizationState = (profileId: string): void => {
    this.router
      .navigate([`/dashboard/company/profile/${profileId}`])
      .then(isRedirectSuccessful => {
        this.onModalClose();
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Error when redirect to /dashboard/company/activities');
        }
      })
      .catch(this.logger.error.bind(this));
  };
  /** end update organization callbacks */

  /** initialize modal callbacks */
  private setCompanyFormValues = (companyProfileDetails: GetProfileWithDocuments): void => {
    if (companyProfileDetails.profile.organizationDetails !== undefined) {
      const basicDataValue: IBasicProfileData = {
        name: companyProfileDetails.profile.organizationDetails.name,
        avatarToken: companyProfileDetails.profile.organizationDetails.logo,
      };
      this.avatarTokenProfileNameFormControl.setValue(basicDataValue);
      this.createOrganizationFormGroup.controls[this.descriptionFormControl].setValue(
        companyProfileDetails.profile.organizationDetails.description,
      );
      this.profileLinksList = companyProfileDetails.profile.organizationDetails.links;
      this.profileDocumentsList = companyProfileDetails.organizationDocuments;
      this.avatarToken = companyProfileDetails.profile.organizationDetails.logo;
      this.fileUploadTokensList = companyProfileDetails.organizationDocuments.map(file => file.token);
    }
  };
  /** end initialize modal callbacks */

  private getFormValues = (): PutOrganizationDetails =>
    ({
      name: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      logo: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
      description: this.createOrganizationFormGroup.controls[this.descriptionFormControl].value,
      files: this.fileUploadTokensList,
      links: this.linksList,
    } as PutOrganizationDetails);

  private handleResponseError = (): void => {
    this.isPending = false;
    this.isInputDisabled = false;
  };
}
