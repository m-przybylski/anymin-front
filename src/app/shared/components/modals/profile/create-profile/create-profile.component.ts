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
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { Config } from '../../../../../../config';
import { PutExpertDetails } from '@anymind-ng/api/model/putExpertDetails';
import { finalize, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { NavbarActions, SessionUpdateApiActions } from '@platform/core/actions';
import * as fromCore from '@platform/core/reducers';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { Store } from '@ngrx/store';
import { VisibilityInitActions } from '@platform/features/dashboard/actions';
import { IBasicProfileData } from '@platform/shared/components/modals/profile/components/basic-profile-data/basic-profile-data.component';
import { Animations } from '@platform/shared/animations/animations';

@Component({
  selector: 'plat-create-profile',
  styleUrls: ['./create-profile.component.sass'],
  templateUrl: './create-profile.component.html',
  animations: Animations.collapse,
})
export class CreateProfileModalComponent implements OnInit, OnDestroy {
  /** form fields */
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;
  public readonly expertFormControlName = 'expertNameProfileControl';
  public readonly expertFormControlAvatar = 'expertAvatarProfileControl';
  public readonly expertFormControlDescription = 'expertDescriptionControl';
  public readonly expertFormControlLink = 'expertLinkControl';
  public readonly clientFormControlName = 'clientNameProfileControl';
  public readonly clientFormControlAvatar = 'clientAvatarProfileControl';

  public avatarTokenProfileNameFormControl = new FormControl();
  public profileForm = new FormGroup({
    avatarTokenProfileName: this.avatarTokenProfileNameFormControl,
  });

  public isFileUploading: boolean;
  public maxValidFileSize = 30000000;
  public maxValidFilesCount = 20;
  public profileDetails: GetProfileWithDocuments;
  public fileUploadTokensList: ReadonlyArray<string>;
  public linksList: ReadonlyArray<string> = [];
  public profileLinksList: ReadonlyArray<string> = [];
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  /**
   * start modal with pending set to false
   * initial information are from store.
   * This is potential candidate to be removed.
   */
  public isPending = false;
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;
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
  }

  public ngOnInit(): void {
    this.isPending = true;
    this.createProfileModalComponentService
      .getModalData()
      .pipe(
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
    // 1. expert or client?
    if (this.isExpertForm) {
      this.onCreateExpertFormSubmit(this.profileForm);
    } else {
      this.onClientFormSubmit(this.profileForm);
    }
    // 2. update session in store
    this.store.dispatch(
      new SessionUpdateApiActions.CreateUpdateNameAndAvatarAction({
        ...(this.avatarTokenProfileNameFormControl.value as IBasicProfileData),
      }),
    );
  }
  public onBackToClientStep = (): void => {
    this.isExpertForm = false;
    this.modalAnimationComponentService.onModalContentChange().next(true);
  };

  public toggleIsExpert = (): void => {
    this.isExpertForm = !this.isExpertForm;
  };

  public onUploadingFile = (isUploading: boolean): void => {
    this.isFileUploading = isUploading;
    this.isInputDisabled = isUploading;
    this.isPending = isUploading;
  };

  public onAddProfileLink = (links: ReadonlyArray<string>): void => {
    this.linksList = links;
  };

  public onUploadFile = (tokenList: ReadonlyArray<string>): void => {
    this.fileUploadTokensList = tokenList;
  };

  private onCreateExpertFormSubmit = (expertFormGroup: FormGroup): void => {
    if (expertFormGroup.valid && !this.isPending) {
      this.isInputDisabled = true;
      this.sendExpertProfile();
    } else {
      this.formUtils.validateAllFormFields(expertFormGroup);
    }
  };

  private onClientFormSubmit = (clientNameForm: FormGroup): void => {
    if (clientNameForm.valid && !this.isPending) {
      this.isInputDisabled = true;
      this.sendClientProfile(this.getClientDetails());
    } else {
      this.formUtils.validateAllFormFields(clientNameForm);
    }
  };

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
      this.profileForm.controls[this.expertFormControlDescription].setValue(
        profileDetails.profile.expertDetails.description,
      );
      this.profileLinksList = profileDetails.profile.expertDetails.links;
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
      links: this.linksList,
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

  private onModalClose = (): void => this.activeModal.close(true);
}
