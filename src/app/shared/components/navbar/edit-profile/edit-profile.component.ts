// tslint:disable:readonly-array
// tslint:disable:no-empty
import {
  Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import {
  ContentHeightAnimationService
}
  from '../../../services/animation/content-height/content-height.animation.service';
import { Config } from '../../../../../config';
import { FileCategoryEnum } from '../../../services/uploader/file-type-checker';
import { CommonConfig } from '../../../../../common-config';
import { ConfigDEFAULT } from '../../../../../../generated_modules/common-config/common-config.default';
import { Alerts, AlertService, FormUtilsService } from '@anymind-ng/components';
import { ExpertDetailsUpdate } from '@anymind-ng/api/model/expertDetailsUpdate';
import { EditProfileModalComponentService } from './edit-profile.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { PutGeneralSettings } from '@anymind-ng/api/model/putGeneralSettings';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { GetSession } from '@anymind-ng/api';
import { NavbarComponentService } from '../navbar.component.service';

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
  public readonly consultationMinlength = Config.inputsLength.consultationMinDescription;
  public readonly consultationMaxlength = Config.inputsLength.consultationMaxDescription;

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
              private contentHeightService: ContentHeightAnimationService,
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
    this.contentHeightService.getPreviousHeight$().next('inherit');
  }

  public onCreateExpertFormSubmit = (expetFormGroup: FormGroup): void => {
    if (expetFormGroup.valid) {
      this.isPending = true;
      this.sendExpertForm();
      this.putWizardProfileRoute();
    } else {
      this.formUtils.validateAllFormFields(expetFormGroup);
    }
  }

  public onExpertFormSubmit = (expetFormGroup: FormGroup): void => {
    if (expetFormGroup.valid) {
      this.isPending = true;
      this.sendExpertForm();
      this.putExpertProfileRoute();
    } else {
      this.formUtils.validateAllFormFields(expetFormGroup);
    }
  }

  public onClientFormSubmit = (clientNameForm: FormGroup): void => {
    if (clientNameForm.valid)
      this.isPending = true;{
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
  }

  public onCreateExpertAccount = (): void => {
    this.isExpertForm = !this.isExpertForm;
  }

  public onModalClose = (): void =>
    this.activeModal.close()

  public onUploadingFile = (isUploading: boolean): void => {
    this.isFileUploading = isUploading;
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
