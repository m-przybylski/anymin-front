// tslint:disable:no-object-literal-type-assertion
// tslint:disable:max-file-line-count
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { CreateProfileModalComponentService } from './create-profile.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { PutGeneralSettings } from '@anymind-ng/api/model/putGeneralSettings';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { PutExpertDetails } from '@anymind-ng/api/model/putExpertDetails';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { NavbarActions, SessionUpdateApiActions } from '@platform/core/actions';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { VisibilityInitActions } from '@platform/features/dashboard/actions';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';

@Component({
  selector: 'plat-create-profile',
  styleUrls: ['./create-profile.component.sass'],
  templateUrl: './create-profile.component.html',
})
export class CreateProfileModalComponent implements OnInit, OnDestroy {
  /** form fields */
  // TODO: remove once not needed
  public readonly expertFormControlDescription = 'expertDescriptionControl';

  public profileForm: FormGroup;

  public fileUploadTokensList: ReadonlyArray<string>;
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  /**
   * start modal with pending set to false
   * initial information are from store.
   * This is potential candidate to be removed.
   */
  public isPending = false;
  public isInputDisabled = false;
  /**
   * filed used to disable possibility to collapse modal to only client profile
   */
  public isOpenedAsExpert: boolean;
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

  private readonly modalHeaderTrKeys = {
    createProfile: 'EDIT_PROFILE.CREATE_TITLE',
    editProfile: 'EDIT_PROFILE.EDIT_TITLE',
  };
  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();
  private avatarTokenProfileNameFormControl = new FormControl();
  private linksFormControl = new FormControl();

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private createProfileModalComponentService: CreateProfileModalComponentService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private router: Router,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateProfileModalComponent');
    this.profileForm = new FormGroup({
      avatarTokenProfileName: this.avatarTokenProfileNameFormControl,
      links: this.linksFormControl,
    });
  }

  public ngOnInit(): void {
    this.modalAnimationComponentService.startLoadingAnimation();

    this.createProfileModalComponentService
      .getModalData()
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        finalize(() => {
          this.handleResponseError();
          this.modalAnimationComponentService.stopLoadingAnimation();
        }),
      )
      .subscribe(({ getSessionWithAccount, getProfileWithDocuments }) => {
        this.setBasicProfileData(getSessionWithAccount);
        this.setExpertFormValues(getProfileWithDocuments);
        this.isOpenedAsExpert = getSessionWithAccount.isExpert;
        this.modalHeaderTr = this.isOpenedAsExpert
          ? this.modalHeaderTrKeys.editProfile
          : this.modalHeaderTrKeys.createProfile;
      });
  }

  public ngOnDestroy(): void {
    this.modalAnimationComponentService.getPreviousHeight$().next('inherit');
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onSaveProfile(): void {
    if (this.profileForm.valid) {
      // 1. expert or client?
      if (this.isExpertForm) {
        this.sendExpertProfile();
      } else {
        this.sendClientProfile(this.getClientDetails());
      }
      // 2. update session in store
      this.store.dispatch(
        new SessionUpdateApiActions.CreateUpdateNameAndAvatarAction({
          ...(this.avatarTokenProfileNameFormControl.value as IBasicProfileData),
        }),
      );
    } else {
      this.formUtils.validateAllFormFields(this.profileForm);
    }
  }
  public onBackToClientStep = (): void => {
    this.isExpertForm = false;
    this.modalAnimationComponentService.onModalContentChange().next(true);
  };

  public toggleIsExpert = (): void => {
    this.isExpertForm = !this.isExpertForm;
  };

  public onFileUploadTokensList = (tokenList: ReadonlyArray<string>): void => {
    this.fileUploadTokensList = tokenList;
  };

  public onFileUploadingStatusChange(isUploading: boolean): void {
    if (isUploading) {
      this.profileForm.disable();
      this.isInputDisabled = true;
    } else {
      this.profileForm.enable();
      this.isInputDisabled = false;
    }
  }

  private sendClientProfile = (data: PutGeneralSettings): void => {
    this.createProfileModalComponentService.createClientProfile(data).subscribe(
      () => {
        this.onModalClose();
      },
      () => this.handleResponseError(),
    );
  };

  //#region init callbacks
  private setBasicProfileData(accountDetails: GetSessionWithAccount): void {
    const basicProfileData: IBasicProfileData = {
      name: accountDetails.account.details.nickname || '',
      avatarToken: accountDetails.account.details.avatar || '',
    };
    this.avatarTokenProfileNameFormControl.patchValue(basicProfileData);
  }

  private setExpertFormValues = (profileDetails?: GetProfileWithDocuments): void => {
    if (profileDetails === undefined) {
      return;
    }
    if (profileDetails.profile.expertDetails !== undefined) {
      this.linksFormControl.setValue(profileDetails.profile.expertDetails.links);
      this.profileForm.controls[this.expertFormControlDescription].setValue(
        profileDetails.profile.expertDetails.description,
      );
      this.profileDocumentsList = profileDetails.expertDocuments;
      this.fileUploadTokensList = profileDetails.expertDocuments.map(file => file.token);
    }
  };
  //#endregion init callbacks

  private getExpertDetails(): PutExpertDetails {
    return {
      name: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
      description: this.profileForm.controls[this.expertFormControlDescription].value.toString(),
      links: this.linksFormControl.value,
      files: this.fileUploadTokensList,
    } as PutExpertDetails;
  }
  private getClientDetails(): PutGeneralSettings {
    return {
      nickname: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).name,
      avatar: (this.avatarTokenProfileNameFormControl.value as IBasicProfileData).avatarToken,
    };
  }

  private sendExpertProfile = (): void => {
    /** to sync session name and avatar with expert need to update client as well */
    this.createProfileModalComponentService
      .createClientProfile(this.getClientDetails())
      /** and update expert profile */
      .pipe(switchMap(() => this.createProfileModalComponentService.createExpertProfile(this.getExpertDetails())))
      .subscribe(
        getProfile => {
          this.store.dispatch(new NavbarActions.SetUserType(UserTypeEnum.EXPERT));
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
  };

  private redirectToExpertState = (val: string): void => {
    this.router
      .navigate([`dashboard/user/profile/${val}`])
      .then(isRedirectSuccessful => {
        this.onModalClose();
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Error when redirect to dashboard/user/profile/');
        }
      })
      .catch(this.logger.error.bind(this));
  };

  private handleResponseError = (): void => {
    this.isPending = false;
    this.isInputDisabled = false;
  };

  private onModalClose(): void {
    this.activeModal.close(true);
  }
}
