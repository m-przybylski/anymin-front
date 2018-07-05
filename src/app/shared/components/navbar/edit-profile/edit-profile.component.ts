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
import { Account } from '@anymind-ng/api/model/account';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';

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
      this.sendExpertForm();
      this.putWizardProfileRoute();
    } else {
      this.formUtils.validateAllFormFields(expetFormGroup);
    }
  }

  public onExpertFormSubmit = (expetFormGroup: FormGroup): void => {
    if (expetFormGroup.valid) {
      this.sendExpertForm();
      this.putExpertProfileRoute();
    } else {
      this.formUtils.validateAllFormFields(expetFormGroup);
    }
  }

  public onClientFormSubmit = (clientNameForm: FormGroup): void => {
    if (clientNameForm.valid) {
      this.clientFormModel = {
        isAnonymous: false,
        nickname: clientNameForm.controls[this.clientFormControlName].value,
        avatar: clientNameForm.controls[this.clientFormControlAvatar].value
      };
      this.setClientProfileDetails();
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

  public onUploadFile = (token: string[]): void => {
    this.fileUploadTokensList = token;
  }

  public getProfileDetails = (): void => {
    if (this.isOpenAsExpert) {
      this.getExpertProfileDetails();
    } else {
      this.getClientProfileDetils();
    }
  }

  private setClientProfileDetails = (): void => {
    this.editProfileModalComponentService.putClientGeneralSettings(this.clientFormModel)
      .subscribe(() => {
        this.onModalClose();
      }, (err) => this.handleClientProfileError(err));
  }

  private handleClientProfileError = (error: HttpErrorResponse): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.error('Can not set client profile', error);
  }

  private getClientProfileDetils = (): void => {
    this.editProfileModalComponentService.getListAccountRoute()
      .subscribe((response) => {
        const accountDetails: Account[] = response;
        this.isPending = false;
        this.clientNameForm.controls[this.clientFormControlName].setValue(accountDetails[0].settings.nickname);
        this.clientNameForm.controls[this.clientFormControlAvatar].setValue(accountDetails[0].settings.avatar);
        this.editProfileModalComponentService.getPreviousAvatarSrc()
          .next(accountDetails[0].settings.avatar);
      }, (err) => this.handleGetClientListAccountRouteError(err));
  }

  private handleGetClientListAccountRouteError = (error: HttpErrorResponse): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.error('Can not get account list route', error);
  }

  private getExpertProfileDetails = (): void => {
    this.editProfileModalComponentService.getUserProfile()
      .subscribe((profileDetails) => {
        this.setExpertFormValues(profileDetails);
        this.isPending = false;
      }, (err) => this.handleGetFileProfileError(err));
  }

  private setExpertFormValues = (profileDetails: GetProfileWithDocuments): void => {
    if (profileDetails.profile.expertDetails !== undefined) {
      this.expertNameForm.controls[this.expertFormControlName].setValue(profileDetails.profile.expertDetails.name);
      this.expertNameForm.controls[this.expertFormControlAvatar].setValue(profileDetails.profile.expertDetails.avatar);
      this.expertNameForm.controls[this.expertFormControlDescription]
        .setValue(profileDetails.profile.expertDetails.description);
      this.profileLinksList = profileDetails.profile.expertDetails.links;
      this.profileDocumentsList = profileDetails.expertDocuments;
      this.editProfileModalComponentService.getPreviousAvatarSrc()
        .next(profileDetails.profile.expertDetails.avatar);
    }
  }

  private handleGetFileProfileError = (error: HttpErrorResponse): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.error('Can not get expert file profile', error);
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
    this.editProfileModalComponentService.putProfileRoute(this.expertFormModel)
      .subscribe(() => this.onModalClose(), (err) => this.handlePutProfileRouteError(err));
  }

  private handlePutProfileRouteError = (error: HttpErrorResponse): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.error('Can not put profile route', error);
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
    }, (err) => this.handleCreateExpertProfileError(err));
  }

  private handleCreateExpertProfileError = (error: HttpErrorResponse): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.error('Can not create expert profile', error);
  }

  private completeCreateExpertProfile = (): void => {
    this.editProfileModalComponentService.completeCreateExpertProfile()
      .subscribe(() => this.onModalClose(), (err) => this.handlecompleteCreateExpertProfileError(err));
  }

  private handlecompleteCreateExpertProfileError = (error: HttpErrorResponse): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.error('Can not complete create expert profile', error);
  }
}
