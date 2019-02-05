import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Config } from 'src/config';
import { FileCategoryEnum } from '@platform/shared/services/uploader/file-type-checker';
import { ProfileDocument } from '@anymind-ng/api';

@Component({
  selector: 'plat-company-profile',
  templateUrl: 'company-profile.component.html',
  styleUrls: ['company-profile.component.sass'],
})
export class CompanyProfileComponent {
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;

  public maxValidFileSize = 30000000;
  public maxValidFilesCount = 20;
  public fileCategory = FileCategoryEnum.EXPERT_FILE;

  @Input()
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  @Input()
  public profileForm: FormGroup;
  @Input()
  public isInputDisabled: boolean;
  @Input()
  public hasProfileConsultationsAsExpert: boolean;
  @Input()
  public descriptionControlName: string;
  @Input()
  public linksControlName: string;
  @Input()
  public isValidated = false;
  @Input()
  public basicProfileDataControlName: string;

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
