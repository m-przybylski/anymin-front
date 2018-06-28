// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { FilesService } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { GetFileInfo } from '@anymind-ng/api/model/getFileInfo';
import { FileCategoryEnum, FileTypeChecker } from '../../services/uploader/file-type-checker';

export enum FileStatus {
  VALID,
  UPLOAD_FAILURE,
  INVALID_COUNT,
  INVALID_SIZE,
  INVALID_TYPE
}

export interface IFileValidationValues {
  maxFilesCount: number;
  maxFileSize: number;
  fileCategory: FileCategoryEnum;
}

@Injectable()
export class FileUploaderComponentService {

  constructor(private FilesService: FilesService) {}

  public getFileInformation = (token: string): Observable<GetFileInfo> =>
    this.FilesService.fileInfoRoute(token)

  public getFileErrorStatus = (file: File,
                               currentUserFilesCount: number,
                               validationValues: IFileValidationValues): FileStatus => {
    if (!this.isFilesCountValid(currentUserFilesCount, validationValues.maxFilesCount)) {
      return FileStatus.INVALID_COUNT;
    }
    if (!FileTypeChecker.isFileFormatValid(file, validationValues.fileCategory)) {
      return FileStatus.INVALID_TYPE;
    }
    if (!this.isFileSizeValid(file.size, validationValues.maxFileSize)) {
      return FileStatus.INVALID_SIZE;
    }
    return FileStatus.VALID;
  }

  private isFilesCountValid = (currentUserFilesCount: number, maxFilesCount: number): boolean =>
    currentUserFilesCount < maxFilesCount

  private isFileSizeValid = (fileSize: number, maxFileSize: number): boolean =>
    fileSize <= maxFileSize

}
