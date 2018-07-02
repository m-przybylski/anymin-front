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
import { ProfileService } from '@anymind-ng/api';
import { ExpertDetailsUpdate } from '@anymind-ng/api/model/expertDetailsUpdate';
import { EditProfileModalComponentService } from './edit-profile.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';

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
  public isPending = true;
  public commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;
  public readonly testFiles = ['2f31b4fce75d425da39a131dd7a79913', '8f45bc8e636b44cabe2bb454f0996b43'];
  public readonly consultationMinlength = Config.inputsLength.consultationMinDescription;
  public readonly consultationMaxlength = Config.inputsLength.consultationMaxDescription;

  @Input()
  public isOpenAsExpert: boolean;

  private expertFormModel: ExpertDetailsUpdate;
  private logger: LoggerService;

  constructor(private activeModal: NgbActiveModal,
              private alertService: AlertService,
              private formUtils: FormUtilsService,
              private profileService: ProfileService,
              private editProfileModalComponentService: EditProfileModalComponentService,
              private contentHeightService: ContentHeightAnimationService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('EditProfileModalComponent');
  }

  public ngOnInit(): void {
    this.setProfileDetails();
    this.isExpertForm = this.isOpenAsExpert;
    this.maxValidFileSize = this.commonConfig.validation.profile['document-size'];
    this.maxValidFilesCount = this.commonConfig.validation.profile['documents-count'];
  }

  public ngOnDestroy(): void {
    this.contentHeightService.getPreviousHeight$().next('inherit');
  }

  public onExpertFormSubmit = (expetFormGroup: FormGroup): void => {
    if (expetFormGroup.valid) {
      this.sendExpertForm();
    } else {
      this.formUtils.validateAllFormFields(expetFormGroup);
    }
  }

  public onClientFormSubmit = (clientNameForm: FormGroup): void => {
    if (clientNameForm.valid) {
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

  public setProfileDetails = (): void => {
    if (this.isOpenAsExpert) {
      this.setExpertProfileDetails();
    } else {
      this.setClientProfileDetails();
    }
  }

  private setClientProfileDetails = (): void => {
    this.isPending = false;
  }

  private setExpertProfileDetails = (): void => {
    this.editProfileModalComponentService.getUserProfile().subscribe((profileDetails) => {
      if (this.isExpertForm && profileDetails && profileDetails.profile.expertDetails) {
        this.expertNameForm.controls[this.expertFormControlName].setValue(profileDetails.profile.expertDetails.name);
        this.expertNameForm.controls[this.expertFormControlAvatar]
          .setValue(profileDetails.profile.expertDetails.avatar);
        this.expertNameForm.controls[this.expertFormControlDescription]
          .setValue(profileDetails.profile.expertDetails.description);
        this.profileLinksList = profileDetails.profile.expertDetails.links;
        this.editProfileModalComponentService.getPreviousAvatarSrc().next(profileDetails.profile.expertDetails.avatar);
      } else {
        this.clientNameForm.controls[this.clientFormControlName].setValue(profileDetails.profile.id);
        this.clientNameForm.controls[this.clientFormControlAvatar].setValue(profileDetails.profile.id);
      }
      this.isPending = false;
    },  (err) => this.handleGetFileProfileError(err));
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

    this.putProfileRoute();
  }

  private putProfileRoute = (): void => {
    this.profileService.putProfileRoute({expertDetails: this.expertFormModel})
      .subscribe(() => this.setExpertProfileDetails());
  }
}
