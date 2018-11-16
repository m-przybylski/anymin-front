// tslint:disable:no-object-literal-type-assertion
import { Component, OnInit } from '@angular/core';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { FormGroup } from '@angular/forms';
import { FileCategoryEnum } from '../../../../../../angularjs/common/classes/file-type-checker/file-type-checker';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { Config } from '../../../../../../config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrganizationModalComponentService } from './create-organization.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { HttpErrorResponse } from '@angular/common/http';
import { PutOrganizationDetails } from '@anymind-ng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { NavbarActions } from '@platform/core/actions';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.sass'],
})
export class CreateOrganizationModalComponent implements OnInit {
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;
  public readonly createOrganizationNameFormControl = 'createOrganizationNameFormControl';
  public readonly avatarFormControl = 'avatarFormControl';
  public readonly descriptionFormControl = 'descriptionFormControl';
  public readonly profileLinksFormControl = 'profileLinksFormControl';
  public createOrganizationFormGroup = new FormGroup({});
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
  public isExpert: boolean;
  public isCompany: boolean;
  public avatarToken: string;
  public modalHeaderTr: string;

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
  }

  public ngOnDestroy(): void {
    this.modalAnimationComponentService.getPreviousHeight$().next('inherit');
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.createOrganizationModalComponentService
      .getSession()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        session => this.adjustProfileDetails(session),
        err => this.handleResponseError(err, 'Can not get session'),
      );
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

  private adjustProfileDetails = (session: GetSessionWithAccount): void => {
    this.isExpert = session.isExpert;
    this.isCompany = session.isCompany;
    if (this.isCompany) {
      this.assignOrganizationDetails();
      this.modalHeaderTr = this.modalHeaderTrKeys.editProfile;

      return;
    }
    this.checkExpertConsultationsLength(session.account.id);
    this.modalHeaderTr = this.modalHeaderTrKeys.createProfile;
  };

  private sendOrganizationProfile = (): void => {
    this.createOrganizationModalComponentService
      .createOrganizationProfile(this.assignFormValues())
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        val => {
          this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.COMPANY));
          !this.isCompany ? this.redirectToOrganizationState(val.id) : this.onModalClose();
        },
        err => this.handleResponseError(err, 'Can not send company profile'),
      );
  };

  private assignOrganizationDetails = (): void => {
    this.modalAnimationComponentService.isPendingRequest().next(true);
    this.createOrganizationModalComponentService
      .getProfileDetails()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        companyProfileDetails => {
          this.setCompanyFormValues(companyProfileDetails);
          this.checkExpertConsultationsLength(companyProfileDetails.profile.id);
          this.isPending = false;
        },
        err => this.handleResponseError(err, 'Can not get user session'),
      );
  };

  private checkExpertConsultationsLength = (accountId: string): void => {
    this.modalAnimationComponentService.isPendingRequest().next(true);
    this.createOrganizationModalComponentService
      .getProfileService(accountId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        consultations => {
          this.isProfileHasConsultations = consultations.length > 0;
          this.isPending = false;
          this.modalAnimationComponentService.isPendingRequest().next(this.isPending);
        },
        err => this.handleResponseError(err, 'Can not get profile consultations'),
      );
  };

  private setCompanyFormValues = (companyProfileDetails: GetProfileWithDocuments): void => {
    if (companyProfileDetails.profile.organizationDetails !== undefined) {
      this.createOrganizationFormGroup.controls[this.createOrganizationNameFormControl].setValue(
        companyProfileDetails.profile.organizationDetails.name,
      );
      this.createOrganizationFormGroup.controls[this.avatarFormControl].setValue(
        companyProfileDetails.profile.organizationDetails.logo,
      );
      this.createOrganizationFormGroup.controls[this.descriptionFormControl].setValue(
        companyProfileDetails.profile.organizationDetails.description,
      );
      this.profileLinksList = companyProfileDetails.profile.organizationDetails.links;
      this.profileDocumentsList = companyProfileDetails.organizationDocuments;
      this.avatarToken = companyProfileDetails.profile.organizationDetails.logo;
      this.fileUploadTokensList = companyProfileDetails.organizationDocuments.map(file => file.token);
    }
  };

  private redirectToOrganizationState = (id: string): void => {
    this.router
      .navigate([`/dashboard/company/profile/${id}`])
      .then(isRedirectSuccessful => {
        this.onModalClose();
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Error when redirect to /dashboard/company/activities');
        }
      })
      .catch(this.logger.error.bind(this));
  };

  private assignFormValues = (): PutOrganizationDetails =>
    ({
      name: this.createOrganizationFormGroup.controls[this.createOrganizationNameFormControl].value,
      logo: this.createOrganizationFormGroup.controls[this.avatarFormControl].value,
      description: this.createOrganizationFormGroup.controls[this.descriptionFormControl].value,
      files: this.fileUploadTokensList,
      links: this.linksList,
    } as PutOrganizationDetails);

  private handleResponseError = (error: HttpErrorResponse, errorMsg: string): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn(errorMsg, error);
    this.isPending = false;
    this.isInputDisabled = false;
  };
}
