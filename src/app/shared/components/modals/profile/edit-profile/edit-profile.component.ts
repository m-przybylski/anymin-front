// tslint:disable:readonly-array
// tslint:disable:no-empty
import {
  Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ExpertDetailsUpdate } from '@anymind-ng/api/model/expertDetailsUpdate';
import { EditProfileModalComponentService } from './edit-profile.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { HttpErrorResponse } from '@angular/common/http';
import { PutGeneralSettings } from '@anymind-ng/api/model/putGeneralSettings';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { GetSession } from '@anymind-ng/api';
import { ConfigDEFAULT } from '../../../../../../../generated_modules/common-config/common-config.default';
import { CommonConfig } from '../../../../../../common-config';
import { FileCategoryEnum } from '../../../../../../angularjs/common/classes/file-type-checker/file-type-checker';
import { NavbarComponentService } from '../../../navbar/navbar.component.service';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { Config } from '../../../../../../config';

@Component({
  styleUrls: ['./edit-profile.component.sass'],
  templateUrl: './edit-profile.component.html'
})

export class EditProfileModalComponent implements OnInit, OnDestroy {
  public profileDetails: GetProfileWithDocuments;
  public expertFormControlName = 'expertNameProfileControl';
  public expertFormControlAvatar = 'expertAvatarProfileControl';
  public expertFormControlDescription = 'expertDescriptionControl';
  public expertFormControlLink = 'expertLinkControl';
  public clientFormControlName = 'clientNameProfileControl';
  public clientFormControlAvatar = 'clientAvatarProfileControl';
  public clientNameForm = new FormGroup({});
  public expertNameForm = new FormGroup({});
  public isExpertForm = true;
  public isFileUploading: boolean;
  public maxValidFileSize: number;
  public maxValidFilesCount: number;
  public fileUploadTokensList: string[];
  public linksList: string[] = [];
  public profileLinksList: string[] = [];
  public profileDocumentsList: ProfileDocument[] = [];
  public isPending = true;
  public commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;
  public isInputDisabled = false;
  public profileDescription: string;

  @Input()
  public isOpenAsExpert: boolean;

  private clientFormModel: PutGeneralSettings;
  private expertFormModel: ExpertDetailsUpdate;
  private logger: LoggerService;

  constructor(private activeModal: NgbActiveModal,
              private alertService: AlertService,
              private formUtils: FormUtilsService,
              private navbarComponentService: NavbarComponentService,
              private editProfileModalComponentService: EditProfileModalComponentService,
              private modalAnimationComponentService: ModalAnimationComponentService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('EditProfileModalComponent');
  }

  public ngOnInit(): void {
    this.getProfileDetails();
    this.isExpertForm = this.isOpenAsExpert;
    this.maxValidFileSize = this.commonConfig.validation.profile['document-size'];
    this.maxValidFilesCount = this.commonConfig.validation.profile['documents-count'];
  }

  public ngOnDestroy(): void {
    this.modalAnimationComponentService.getPreviousHeight$().next('inherit');
    this.editProfileModalComponentService.getPreviousAvatarSrc().next('');
    this.editProfileModalComponentService.getPreviousValue$().next('');
  }

  public onCreateExpertFormSubmit = (expetFormGroup: FormGroup): void => {
    if (expetFormGroup.valid && !this.isPending) {
      this.isInputDisabled = true;
      this.sendExpertForm();
      this.putWizardProfileRoute();
    } else {
      this.formUtils.validateAllFormFields(expetFormGroup);
    }
  }

  public onExpertFormSubmit = (expetFormGroup: FormGroup): void => {
    if (expetFormGroup.valid && !this.isPending) {
      this.isInputDisabled = true;
      this.sendExpertForm();
      this.putExpertProfileRoute();
    } else {
      this.formUtils.validateAllFormFields(expetFormGroup);
    }
  }

  public onClientFormSubmit = (clientNameForm: FormGroup): void => {
    if (clientNameForm.valid && !this.isPending) {
      this.isInputDisabled = true;
      this.clientFormModel = {
        isAnonymous: false,
        nickname: clientNameForm.controls[this.clientFormControlName].value,
        avatar: clientNameForm.controls[this.clientFormControlAvatar].value
      };
      this.assignClientProfileDetails();
    } else {
      this.formUtils.validateAllFormFields(clientNameForm);
    }
  }

  public onBackToClientStep = (): void => {
    this.isExpertForm = false;
    this.modalAnimationComponentService.onModalContentChange().next(true);
  }

  public onCreateExpertAccount = (): void => {
    this.isExpertForm = !this.isExpertForm;
    this.modalAnimationComponentService.onModalContentChange().next(true);
  }

  public onModalClose = (): void =>
    this.activeModal.close()

  public onUploadingFile = (isUploading: boolean): void => {
    this.isFileUploading = isUploading;
    this.isInputDisabled = isUploading;
    this.isPending = isUploading;
  }

  public onAddProfileLink = (links: string[]): void => {
    this.linksList = links;
  }

  public onUploadFile = (tokenList: string[]): void => {
    this.fileUploadTokensList = tokenList;
  }

  public getProfileDetails = (): void => {
    if (this.isOpenAsExpert) {
      this.getExpertProfileDetails();
    } else {
      this.getClientProfileDetils();
    }
  }

  private assignClientProfileDetails = (): void => {
    this.editProfileModalComponentService.saveClientProfile(this.clientFormModel)
      .subscribe(() => {
        this.onModalClose();
      }, (err) => this.handleResponseError(err, 'Can not set client profile'));
  }

  private handleResponseError = (error: HttpErrorResponse, errorMsg: string): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn(errorMsg, error);
    this.isPending = false;
  }

  private getClientProfileDetils = (): void => {
    this.editProfileModalComponentService.getListAccountRoute()
      .subscribe((response) => {
        const accountDetails: GetSession = response;
        this.isPending = false;
        this.modalAnimationComponentService.isPendingRequest().next(this.isPending);
        if (accountDetails.account !== undefined) {
          this.clientNameForm.controls[this.clientFormControlName].setValue(accountDetails.account.settings.nickname);
          this.clientNameForm.controls[this.clientFormControlAvatar].setValue(accountDetails.account.settings.avatar);
          this.editProfileModalComponentService.getPreviousAvatarSrc()
            .next(accountDetails.account.settings.avatar);
        }
      }, (err) => this.handleResponseError(err, 'Can not get account list route'));
  }

  private getExpertProfileDetails = (): void => {
    this.editProfileModalComponentService.getUserProfile()
      .subscribe((profileDetails) => {
        this.setExpertFormValues(profileDetails);
        this.isPending = false;
        this.modalAnimationComponentService.isPendingRequest().next(this.isPending);
      }, (err) => this.handleResponseError(err, 'Can not get expert file profile'));
  }

  private setExpertFormValues = (profileDetails: GetProfileWithDocuments): void => {
    if (profileDetails.profile.expertDetails !== undefined) {
      this.expertNameForm.controls[this.expertFormControlName].setValue(profileDetails.profile.expertDetails.name);
      this.expertNameForm.controls[this.expertFormControlAvatar].setValue(profileDetails.profile.expertDetails.avatar);
      this.expertNameForm.controls[this.expertFormControlDescription]
        .setValue(profileDetails.profile.expertDetails.description);
      this.profileLinksList = profileDetails.profile.expertDetails.links;
      this.profileDocumentsList = profileDetails.expertDocuments;
      this.fileUploadTokensList = profileDetails.expertDocuments.map(file => file.token);
      this.profileDescription = profileDetails.profile.expertDetails.description;
      this.editProfileModalComponentService.getPreviousAvatarSrc().next(profileDetails.profile.expertDetails.avatar);
    }
  }

  private sendExpertForm = (): void => {
    this.expertFormModel = {
      name: this.expertNameForm.controls[this.expertFormControlName].value,
      avatar: this.expertNameForm.controls[this.expertFormControlAvatar].value,
      description: this.expertNameForm.controls[this.expertFormControlDescription].value.toString(),
      links: this.linksList,
      files: this.fileUploadTokensList
    };
  }

  private putExpertProfileRoute = (): void => {
    this.editProfileModalComponentService.saveExpertProfile(this.expertFormModel)
      .subscribe(() => this.onModalClose(), (err) => this.handleResponseError(err, 'Can not put profile route'));
  }

  private putWizardProfileRoute = (): void => {
    this.editProfileModalComponentService.createExpertProfile(
      {
        isExpert: true,
        isCompany: false,
        isSummary: false,
        expertDetailsOption: this.expertFormModel
      }
    ).subscribe(() => {
      this.completeCreateExpertProfile();
    }, (err) => this.handleResponseError(err, 'Can not create expert profile'));
  }

  private completeCreateExpertProfile = (): void => {
    this.editProfileModalComponentService.completeCreateExpertProfile()
      .subscribe(() => {
          this.navbarComponentService.getExpertSessionStatus$().next(true);
          this.onModalClose();
        },
        (err) => this.handleResponseError(err, 'Can not complete create expert profile'));
  }
}
