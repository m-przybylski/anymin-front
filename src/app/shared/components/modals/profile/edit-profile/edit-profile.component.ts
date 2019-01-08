// tslint:disable:no-object-literal-type-assertion
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { EditProfileComponentService } from './edit-profile.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { PutGeneralSettings } from '@anymind-ng/api/model/putGeneralSettings';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { PutExpertDetails } from '@anymind-ng/api/model/putExpertDetails';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { NavbarActions } from '@platform/core/actions';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { Animations } from '@platform/shared/animations/animations';
import { GetAccountDetails } from '@anymind-ng/api/model/getAccountDetails';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';
import { waitForSession } from '@platform/core/utils/wait-for-session';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

@Component({
  selector: 'plat-edit-profile',
  styleUrls: ['./edit-profile.component.sass'],
  templateUrl: './edit-profile.component.html',
  animations: Animations.collapse,
})
export class EditProfileModalComponent implements OnInit, OnDestroy {
  /** form fields */
  // TODO: remove once not needed
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
  public isOpenedAsExpert: boolean;
  public isCompany: boolean;
  /**
   * provided as external parameter when opened modal
   * indicated if modal will store expert data or only
   * client data.
   */
  @Input()
  public isExpertForm = true;

  private logger: LoggerService;
  private linksFormControl = new FormControl();

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private editProfileComponentService: EditProfileComponentService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('EditProfileModalComponent');
  }

  public ngOnInit(): void {
    this.profileForm = new FormGroup({
      [this.linksControlName]: this.linksFormControl,
      [this.basicProfileDataControlName]: this.avatarTokenProfileNameFormControl,
    });
    this.editProfileComponentService
      .getModalData()
      .pipe(
        finalize(() => {
          this.handleResponseError();
          this.modalAnimationComponentService.stopLoadingAnimation();
        }),
        catchError(() => {
          this.onModalClose();

          return EMPTY;
        }),
      )
      .subscribe(({ getSessionWithAccount, getProfileWithDocuments }) => {
        this.setBasicProfileData(getSessionWithAccount.account.details);
        this.setExpertFormValues(getProfileWithDocuments);
        this.isOpenedAsExpert = getSessionWithAccount.isExpert;
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
        this.sendClientProfile(this.getClientDetails());
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

  private sendClientProfile(data: PutGeneralSettings): void {
    this.editProfileComponentService
      .editClientProfile(data)
      .pipe(
        tap(() => this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.USER))),
        waitForSession(this.store),
      )
      .subscribe(
        () => {
          this.onModalClose();
        },
        () => this.handleResponseError(),
      );
  }

  /** #region init callbacks */
  private setBasicProfileData(accountDetails: GetAccountDetails): void {
    if (accountDetails.nickname === undefined || accountDetails.avatar === undefined) {
      return;
    }
    this.avatarTokenProfileNameFormControl.patchValue({
      avatarToken: accountDetails.avatar,
      name: accountDetails.nickname,
    } as IBasicProfileData);
  }

  private setExpertFormValues(profileDetails?: GetProfileWithDocuments): void {
    if (profileDetails === undefined) {
      return;
    }
    if (profileDetails.profile.expertDetails !== undefined) {
      this.linksFormControl.setValue(profileDetails.profile.expertDetails.links);
      this.profileForm.controls[this.descriptionControlName].setValue(profileDetails.profile.expertDetails.description);
      this.profileDocumentsList = profileDetails.expertDocuments;
      this.fileUploadTokensList = profileDetails.expertDocuments.map(file => file.token);
    }
  }
  /** #endregion init callbacks */

  private getExpertDetails(): PutExpertDetails {
    return {
      name: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
      description: this.profileForm.controls[this.descriptionControlName].value.toString(),
      links: this.linksFormControl.value,
      files: [...this.fileUploadTokensList],
    };
  }

  private getClientDetails(): PutGeneralSettings {
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
        switchMap(() => this.editProfileComponentService.editExpertProfile(this.getExpertDetails())),
        tap(() => this.store.dispatch(new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.EXPERT))),
        waitForSession(this.store),
      )
      .subscribe(
        () => {
          this.onModalClose();
          this.alertService.pushSuccessAlert('EDIT_PROFILE.SUCCESS_ALERT');
        },
        () => this.handleResponseError(),
      );
  }

  private handleResponseError(): void {
    this.isRequestPending = false;
  }

  private onModalClose(): void {
    this.activeModal.close(true);
  }
}
