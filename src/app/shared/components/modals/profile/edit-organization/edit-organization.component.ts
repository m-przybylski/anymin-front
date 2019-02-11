// tslint:disable:no-object-literal-type-assertion
// tslint:disable:readonly-array
import { Component, OnInit } from '@angular/core';
import { AlertService, FormUtilsService } from '@anymind-ng/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { tap, finalize } from 'rxjs/operators';
import { NavbarActions } from '@platform/core/actions';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { waitForSession } from '@platform/core/utils/wait-for-session';
import { EditOrganizationComponentService } from './edit-organization.component.service';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';
import { PutProfileDetails } from '@anymind-ng/api';

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
  public linksFormControl = new FormControl([]);

  private profileId: string;

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private editOrganizationModalComponentService: EditOrganizationComponentService,
    private store: Store<fromCore.IState>,
  ) {}

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
          this.profileId = modalData.getProfileWithDocuments.profile.id;
        }
        this.hasProfileConsultationsAsExpert = modalData.hasConsultations;
      });
  }

  public onModalClose(profileId: string): void {
    this.activeModal.close(profileId);
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
    const organizationProfileDetails = this.getFormValues();
    this.editOrganizationModalComponentService
      .editOrganizationProfile(organizationProfileDetails, this.profileId)
      .pipe(
        tap(() => this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.COMPANY))),
        waitForSession(this.store),
      )
      .subscribe(
        profile => {
          this.onModalClose(profile.id);
          this.alertService.pushSuccessAlert('DASHBOARD.CREATE_PROFILE.EDIT_ORGANIZATION_PROFILE.SUCCESS_ALERT');
        },
        () => this.handleResponseError(),
      );
  }

  /** end update organization callbacks */

  /** initialize modal callbacks */
  private setCompanyFormValues(companyProfileDetails: GetProfileWithDocuments): void {
    this.avatarTokenProfileNameFormControl.patchValue({
      avatarToken: companyProfileDetails.profile.avatar,
      name: companyProfileDetails.profile.name,
    } as IBasicProfileData);
    this.organizationFormGroup.controls[this.descriptionControlName].setValue(
      companyProfileDetails.profile.description,
    );
    this.linksFormControl.setValue(companyProfileDetails.profile.links);
    this.profileDocumentsList = companyProfileDetails.documents;
    this.fileUploadTokensList = companyProfileDetails.documents.map(file => file.token);
  }

  /** end initialize modal callbacks */

  private getFormValues(): PutProfileDetails {
    return {
      name: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
      description: this.organizationFormGroup.controls[this.descriptionControlName].value,
      files: [...this.fileUploadTokensList],
      links: this.linksFormControl.value,
    };
  }

  private handleResponseError(): void {
    this.isRequestPending = false;
  }
}
