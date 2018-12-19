import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Animations } from '@platform/shared/animations/animations';
import { Config } from 'config';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { GetProfileWithDocuments, ProfileDocument } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-client-profile',
  templateUrl: 'expert-client-profile.component.html',
  styleUrls: ['expert-client-profile.component.sass'],
  animations: Animations.collapse,
})
export class ExpertClientProfileComponent {
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;
  public readonly expertFormControlDescription = 'expertDescriptionControl';

  public isFileUploading: boolean;
  public linksList: ReadonlyArray<string> = [];

  public maxValidFileSize = 30000000;
  public maxValidFilesCount = 20;
  public fileCategory = FileCategoryEnum.EXPERT_FILE;
  public profileDetails: GetProfileWithDocuments;

  @Input()
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  @Input()
  public profileForm: FormGroup;
  @Input()
  public isExpertForm: boolean;
  @Input()
  public isInputDisabled: boolean;

  @Output()
  public fileUploadTokensList = new EventEmitter<ReadonlyArray<string>>();
  @Output()
  public fileUploadingStatusChange = new EventEmitter<boolean>();

  public onUploadingFile(isUploading: boolean): void {
    this.isFileUploading = isUploading;
    this.isInputDisabled = isUploading;
    this.fileUploadingStatusChange.emit(isUploading);
  }

  public onUploadFile(tokenList: ReadonlyArray<string>): void {
    this.fileUploadTokensList.emit(tokenList);
  }
}
