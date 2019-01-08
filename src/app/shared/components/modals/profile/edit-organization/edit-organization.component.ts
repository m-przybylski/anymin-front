// tslint:disable:no-object-literal-type-assertion
// tslint:disable:readonly-array
import { Component, OnInit } from '@angular/core';
import { AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { PutOrganizationDetails } from '@anymind-ng/api';
import { tap, finalize } from 'rxjs/operators';
import { NavbarActions } from '@platform/core/actions';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { waitForSession } from '@platform/core/utils/wait-for-session';
import { EditOrganizationComponentService } from './edit-organization.component.service';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';

@Component({
  selector: 'plat-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.sass'],
})
export class EditOrganizationModalComponent implements OnInit {
  public readonly descriptionControlName = 'description';
  public readonly basicProfileDataControlName = 'basicProfileData';
  public readonly linksControlName = 'links';
  public organizationFormGroup: FormGroup;
  public avatarTokenProfileNameFormControl = new FormControl('', Validators.required);
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  public isRequestPending = false;
  public isFileUploading = false;
  public fileUploadTokensList: ReadonlyArray<string> = [];
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;
  public hasProfileConsultationsAsExpert = false;
  public linksFormControl = new FormControl();

  private logger: LoggerService;

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private editOrganizationModalComponentService: EditOrganizationComponentService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('EditOrganizationModalComponent');
  }

  public ngOnInit(): void {
    this.organizationFormGroup = new FormGroup({
      [this.linksControlName]: this.linksFormControl,
      [this.basicProfileDataControlName]: this.avatarTokenProfileNameFormControl,
    });
    this.modalAnimationComponentService.startLoadingAnimation();
    this.editOrganizationModalComponentService
      .getModalData()
      .pipe(
        finalize(() => {
          this.modalAnimationComponentService.stopLoadingAnimation();
          this.handleResponseError();
        }),
      )
      .subscribe(modalData => {
        if (typeof modalData.getProfileWithDocuments !== 'undefined') {
          this.setCompanyFormValues(modalData.getProfileWithDocuments);
        }
        this.hasProfileConsultationsAsExpert = modalData.hasConsultations;
      });
  }

  public onModalClose(): void {
    this.activeModal.close(true);
  }

  public onEditOrganizationProfile(): void {
    if (this.organizationFormGroup.valid) {
      this.isRequestPending = true;
      this.sendOrganizationProfile();
    } else {
      this.formUtils.validateAllFormFields(this.organizationFormGroup);
    }
  }

  public onFileUploadingStatusChange(isUploading: boolean): void {
    this.isFileUploading = isUploading;
  }

  public onFileUploadTokensList(files: ReadonlyArray<string>): void {
    this.fileUploadTokensList = files;
  }

  /** update organization callbacks */
  private sendOrganizationProfile(): void {
    this.editOrganizationModalComponentService
      .editOrganizationProfile(this.getFormValues())
      .pipe(
        tap(() => this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.COMPANY))),
        waitForSession(this.store),
      )
      .subscribe(
        () => {
          this.onModalClose();
          this.alertService.pushSuccessAlert('DASHBOARD.CREATE_PROFILE.EDIT_ORGANIZATION_PROFILE.SUCCESS_ALERT');
        },
        () => this.handleResponseError(),
      );
  }
  /** end update organization callbacks */

  /** initialize modal callbacks */
  private setCompanyFormValues(companyProfileDetails: GetProfileWithDocuments): void {
    if (companyProfileDetails.profile.organizationDetails !== undefined) {
      this.avatarTokenProfileNameFormControl.patchValue({
        avatarToken: companyProfileDetails.profile.organizationDetails.logo,
        name: companyProfileDetails.profile.organizationDetails.name,
      } as IBasicProfileData);
      this.organizationFormGroup.controls[this.descriptionControlName].setValue(
        companyProfileDetails.profile.organizationDetails.description,
      );
      this.linksFormControl.setValue(companyProfileDetails.profile.organizationDetails.links);
      this.profileDocumentsList = companyProfileDetails.organizationDocuments;
      this.fileUploadTokensList = companyProfileDetails.organizationDocuments.map(file => file.token);
    }
  }
  /** end initialize modal callbacks */

  private getFormValues(): PutOrganizationDetails {
    return {
      name: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      logo: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
      description: this.organizationFormGroup.controls[this.descriptionControlName].value,
      files: [...this.fileUploadTokensList],
      links: this.linksFormControl.value,
    };
  }

  private handleResponseError(): void {
    this.isRequestPending = false;
  }
}
