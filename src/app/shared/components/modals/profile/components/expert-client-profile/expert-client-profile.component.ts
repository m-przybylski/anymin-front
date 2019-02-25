import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Animations } from '@platform/shared/animations/animations';
import { Config } from 'src/config';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { ProfileDocument } from '@anymind-ng/api';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip-injector.service';

@Component({
  selector: 'plat-expert-client-profile',
  templateUrl: 'expert-client-profile.component.html',
  styleUrls: ['expert-client-profile.component.sass'],
  animations: Animations.collapse,
})
export class ExpertClientProfileComponent {
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;

  public isFileUploading: boolean;
  public maxValidFileSize = 30000000;
  public maxValidFilesCount = 20;
  public fileCategory = FileCategoryEnum.EXPERT_FILE;
  public tooltipType = TooltipComponentDestinationEnum.MODAL;

  @Input()
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  @Input()
  public profileForm: FormGroup;
  @Input()
  public isExpertForm: boolean;
  @Input()
  public isInputDisabled: boolean;
  @Input()
  public descriptionControlName: string;
  @Input()
  public linksControlName: string;
  @Input()
  public basicProfileDataControlName: string;
  @Input()
  public isValidated = false;

  @Output()
  public fileUploadTokensList = new EventEmitter<ReadonlyArray<string>>();
  @Output()
  public fileUploadingStatusChange = new EventEmitter<boolean>();

  public onUploadingFile(isUploading: boolean): void {
    this.fileUploadingStatusChange.emit(isUploading);
  }

  public onUploadFile(tokenList: ReadonlyArray<string>): void {
    this.fileUploadTokensList.emit(tokenList);
  }
}
