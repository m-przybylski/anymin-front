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
import { EditProfileModalComponentService } from './edit-profile.component.service';
import { FileCategoryEnum } from '../../../services/uploader/file-type-checker';
import { CommonConfig } from '../../../../../common-config';
import { ConfigDEFAULT } from '../../../../../../generated_modules/common-config/common-config.default';

@Component({
  styleUrls: ['./edit-profile.component.sass'],
  templateUrl: './edit-profile.component.html'
})

export class EditProfileModalComponent implements OnInit, OnDestroy {
  public expertFormControlName = 'expertNameProfileControl';
  public expertFormControlDescription = 'expertDescriptionControl';
  public expertFormControlLink = 'expertLinkControl';
  public clientFormControlName = 'clientNameProfileControl';
  public clientNameForm = new FormGroup({});
  public expertNameForm = new FormGroup({});
  public isExpertForm = true;
  public isFileUploading: boolean;
  public maxValidFileSize: number;
  public maxValidFilesCount: number;
  public commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;
  public readonly consultationMinlength = Config.inputsLength.consultationMinDescription;
  public readonly consultationMaxlength = Config.inputsLength.consultationMaxDescription;

  @Input()
  public isOpenAsExpert: boolean;

  constructor(private activeModal: NgbActiveModal,
              private editProfileModalComponentService: EditProfileModalComponentService,
              private contentHeightService: ContentHeightAnimationService) {
  }

  public ngOnInit(): void {
    this.isExpertForm = this.isOpenAsExpert;
    this.maxValidFileSize = this.commonConfig.validation.profile['document-size'];
    this.maxValidFilesCount = this.commonConfig.validation.profile['documents-count'];
  }

  public ngOnDestroy(): void {
    this.contentHeightService.getPreviousHeight$().next('inherit');
    this.editProfileModalComponentService.getPreviousValue$().next('');
    this.editProfileModalComponentService.getPreviousAvatarSrc().next('');
  }

  public onExpertFormSubmit = (expetFormGroup: FormGroup): void => {
    if (expetFormGroup.valid) {
    } else {
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

}
