// tslint:disable:no-object-literal-type-assertion
import { Component, Inject, InjectionToken, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService, FormUtilsService, LoggerFactory, Alerts } from '@anymind-ng/core';
import { EditProfileComponentService } from './edit-profile.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { NavbarActions } from '@platform/core/actions';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { Animations } from '@platform/shared/animations/animations';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';
import { waitForSession } from '@platform/core/utils/wait-for-session';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { Logger } from '@platform/core/logger';
import { PutDetails, PutProfileDetails } from '@anymind-ng/api';
import { IS_EXPERT_FORM } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';

export const MODAL_HEADER: InjectionToken<string> = new InjectionToken('Modal header translation');

@Component({
  selector: 'plat-edit-profile',
  styleUrls: ['./edit-profile.component.sass'],
  templateUrl: './edit-profile.component.html',
  animations: Animations.collapse,
})
export class EditProfileModalComponent extends Logger implements OnInit, OnDestroy {
  /** form fields */
  public readonly descriptionControlName = 'description';
  public readonly basicProfileDataControlName = 'basicProfileData';
  public readonly linksControlName = 'links';

  public profileForm: FormGroup;
  public avatarTokenProfileNameFormControl = new FormControl('', Validators.required);
  public fileUploadTokensList: ReadonlyArray<string> = [];
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  /**
   * start modal with pending set to false
   * initial information are from store.
   * This is potential candidate to be removed.
   */
  public isRequestPending = false;
  public isFileUploading = false;
  /**
   * filed used to disable possibility to collapse modal to only client profile
   */
  public isCompany: boolean;
  /**
   * provided as external parameter when opened modal
   * indicated if modal will store expert data or only
   * client data.
   */
  public isValidated = false;

  private isOpenedAsExpert = false;
  private linksFormControl = new FormControl();
  private profileId: string;

  constructor(
    @Optional() @Inject(IS_EXPERT_FORM) public isExpertForm = true,
    @Optional() @Inject(MODAL_HEADER) public modalHeader: string,
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private editProfileComponentService: EditProfileComponentService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('EditProfileModalComponent'));
  }

  public ngOnInit(): void {
    this.profileForm = new FormGroup({
      [this.linksControlName]: this.linksFormControl,
      [this.basicProfileDataControlName]: this.avatarTokenProfileNameFormControl,
      [this.descriptionControlName]: new FormControl(),
    });
    this.editProfileComponentService
      .getModalData()
      .pipe(
        finalize(() => {
          this.handleResponseError();
          this.modalAnimationComponentService.stopLoadingAnimation();
        }),
        catchError(() => {
          this.closeModal();

          return EMPTY;
        }),
      )
      .subscribe(({ getSessionWithAccount, getProfileWithDocuments }) => {
        /**
         * account details and expert details should be aligned (statement from 2019.01.11)
         * but for safety reasons we pass name and avatar from different places.
         * For client it is from account object tight to session and for expert from expert profile
         */
        this.isOpenedAsExpert = getSessionWithAccount.isExpert;
        if (!this.isOpenedAsExpert) {
          this.setBasicProfileData(
            getSessionWithAccount.account.details.avatar,
            getSessionWithAccount.account.details.nickname,
          );

          return;
        }
        if (getProfileWithDocuments && getProfileWithDocuments.profile) {
          this.setExpertFormValues(getProfileWithDocuments);
          this.setBasicProfileData(getProfileWithDocuments.profile.avatar, getProfileWithDocuments.profile.name);
        } else {
          this.loggerService.error('Edit profile opened in expert mode but no expert details available');
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.closeModal();

          return;
        }
      });
  }

  public ngOnDestroy(): void {
    this.modalAnimationComponentService.getPreviousHeight$().next('inherit');
  }

  public onSaveProfile(): void {
    if (this.profileForm.valid) {
      this.isRequestPending = true;
      // 1. expert or client?
      if (this.isExpertForm) {
        this.sendExpertProfile();
      } else {
        this.sendClientProfile();
      }
    } else {
      this.formUtils.validateAllFormFields(this.profileForm);
    }
  }

  public onFileUploadingStatusChange(isUploading: boolean): void {
    this.isFileUploading = isUploading;
  }

  public onFileUploadTokensList(files: ReadonlyArray<string>): void {
    this.fileUploadTokensList = files;
  }

  private sendClientProfile(): void {
    this.editProfileComponentService
      .editClientProfile(this.getClientDetails())
      .pipe(
        tap(() => this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.USER))),
        waitForSession(this.store),
      )
      .subscribe(
        () => {
          this.closeModal();
        },
        () => this.handleResponseError(),
      );
  }

  /** #region init callbacks */
  private setBasicProfileData(avatar?: string, name?: string): void {
    this.avatarTokenProfileNameFormControl.patchValue({
      avatarToken: avatar || '',
      name: name || '',
    });
  }

  private setExpertFormValues(profileDetails: GetProfileWithDocuments): void {
    this.profileId = profileDetails.profile.id;
    this.linksFormControl.setValue(profileDetails.profile.links);
    this.profileForm.controls[this.descriptionControlName].setValue(profileDetails.profile.description);
    this.profileDocumentsList = profileDetails.documents;
    this.fileUploadTokensList = profileDetails.documents.map(file => file.token);
  }

  /** #endregion init callbacks */

  private getExpertDetails(): PutProfileDetails {
    return {
      name: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
      description: this.profileForm.controls[this.descriptionControlName].value.toString(),
      links: this.linksFormControl.value,
      files: [...this.fileUploadTokensList],
    };
  }

  private getClientDetails(): PutDetails {
    return {
      nickname: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
    };
  }

  private sendExpertProfile(): void {
    /** to sync session name and avatar with expert need to update client as well */
    this.editProfileComponentService
      .editClientProfile(this.getClientDetails())
      /** and update expert profile */
      .pipe(
        switchMap(() => this.editProfileComponentService.editExpertProfile(this.getExpertDetails(), this.profileId)),
        tap(() => this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.EXPERT))),
        waitForSession(this.store),
      )
      .subscribe(
        () => {
          this.closeModal();
          this.alertService.pushSuccessAlert('EDIT_PROFILE.SUCCESS_ALERT');
        },
        () => this.handleResponseError(),
      );
  }

  private handleResponseError(): void {
    this.isRequestPending = false;
  }

  private closeModal(): void {
    this.activeModal.close(true);
  }
}
