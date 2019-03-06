// tslint:disable:no-shadowed-variable
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { FilesService } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { GetFileInfo } from '@anymind-ng/api/model/getFileInfo';
import { FileCategoryEnum, FileTypeChecker } from '../../../../../services/uploader/file-type-checker';

export enum FileStatus {
  VALID,
  UPLOAD_FAILURE,
  INVALID_COUNT,
  INVALID_SIZE,
  INVALID_MIN_SIZE,
  INVALID_TYPE,
}

export interface IFileValidationValues {
  maxFilesCount: number;
  maxFileSize: number;
  minFileSize: number;
  fileCategory: FileCategoryEnum;
}

@Injectable()
export class FileUploaderComponentService {
  constructor(private FilesService: FilesService) {}

  public getFileInformation(token: string): Observable<GetFileInfo> {
    return this.FilesService.fileInfoRoute(token);
  }

  public getFileErrorStatus(
    file: File,
    currentUserFilesCount: number,
    validationValues: IFileValidationValues,
  ): FileStatus {
    if (!this.isFilesCountValid(currentUserFilesCount, validationValues.maxFilesCount)) {
      return FileStatus.INVALID_COUNT;
    }
    if (!FileTypeChecker.isFileFormatValid(file, validationValues.fileCategory)) {
      return FileStatus.INVALID_TYPE;
    }
    if (!this.isFileMaxSizeValid(file.size, validationValues.maxFileSize)) {
      return FileStatus.INVALID_SIZE;
    }
    if (!this.isFileMinSizeValid(file.size, validationValues.minFileSize)) {
      return FileStatus.INVALID_MIN_SIZE;
    }
    return FileStatus.VALID;
  }

  private isFilesCountValid(currentUserFilesCount: number, maxFilesCount: number): boolean {
    return currentUserFilesCount < maxFilesCount;
  }

  private isFileMaxSizeValid(fileSize: number, maxFileSize: number): boolean {
    return fileSize <= maxFileSize;
  }

  private isFileMinSizeValid(fileSize: number, minFileSize: number): boolean {
    return fileSize >= minFileSize;
  }
}
