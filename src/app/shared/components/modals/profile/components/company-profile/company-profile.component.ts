import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Config } from 'config';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { GetProfileWithDocuments, ProfileDocument } from '@anymind-ng/api';

@Component({
  selector: 'plat-company-profile',
  templateUrl: 'company-profile.component.html',
  styleUrls: ['company-profile.component.sass'],
})
export class CompanyProfileComponent {
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;
  public readonly descriptionFormControl = 'descriptionFormControl';

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
  public isInputDisabled: boolean;
  @Input()
  public isProfileHasConsultations: boolean;

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
