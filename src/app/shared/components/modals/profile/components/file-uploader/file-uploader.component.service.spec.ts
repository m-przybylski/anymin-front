import { TestBed } from '@angular/core/testing';
import { FileStatus, FileUploaderComponentService, IFileValidationValues } from './file-uploader.component.service';
import { FilesService } from '@anymind-ng/api';
import { FileCategoryEnum } from '../../../../../services/uploader/file-type-checker';
import { Deceiver } from 'deceiver-core';

class File {
  constructor(public size: number, public type: string) {}
}

describe('Service: FileUploaderComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FileUploaderComponentService,
        { provide: FilesService, useValue: Deceiver(FilesService, { fileInfoRoute: jest.fn() }) },
      ],
    });
  });

  it('should return INVALID_COUNT status on file validation', () => {
    const currentFilesCount = 20;
    const validFileSize = 1000000;
    const fileUploaderComponentService = TestBed.get(FileUploaderComponentService);
    const file: File = new File(validFileSize, 'application/pdf');
    const validationValues: IFileValidationValues = {
      maxFileSize: 10000000,
      minFileSize: 10,
      maxFilesCount: 15,
      fileCategory: FileCategoryEnum.EXPERT_FILE,
    };
    expect(fileUploaderComponentService.getFileErrorStatus(file, currentFilesCount, validationValues)).toEqual(
      FileStatus.INVALID_COUNT,
    );
  });

  it('should return INVALID_TYPE status on file validation', () => {
    const currentFilesCount = 5;
    const fileUploaderComponentService = TestBed.get(FileUploaderComponentService);
    const file: File = new File(1, 'exe');
    const validationValues: IFileValidationValues = {
      maxFileSize: 10000000,
      minFileSize: 10,
      maxFilesCount: 15,
      fileCategory: FileCategoryEnum.EXPERT_FILE,
    };
    expect(fileUploaderComponentService.getFileErrorStatus(file, currentFilesCount, validationValues)).toEqual(
      FileStatus.INVALID_TYPE,
    );
  });

  it('should return INVALID_SIZE status on file validation', () => {
    const currentFilesCount = 5;
    const invalidFileSize = 500000000;
    const fileUploaderComponentService = TestBed.get(FileUploaderComponentService);
    const file: File = new File(invalidFileSize, 'application/pdf');
    const validationValues: IFileValidationValues = {
      maxFileSize: 10000000,
      maxFilesCount: 15,
      minFileSize: 0,
      fileCategory: FileCategoryEnum.EXPERT_FILE,
    };
    expect(fileUploaderComponentService.getFileErrorStatus(file, currentFilesCount, validationValues)).toEqual(
      FileStatus.INVALID_SIZE,
    );
  });

  it('should return VALID status on file validation', () => {
    const currentFilesCount = 5;
    const validFileSize = 1000000;
    const fileUploaderComponentService = TestBed.get(FileUploaderComponentService);
    const file: File = new File(validFileSize, 'application/pdf');
    const validationValues: IFileValidationValues = {
      maxFileSize: 10000000,
      minFileSize: 10,
      maxFilesCount: 15,
      fileCategory: FileCategoryEnum.EXPERT_FILE,
    };
    expect(fileUploaderComponentService.getFileErrorStatus(file, currentFilesCount, validationValues)).toEqual(
      FileStatus.VALID,
    );
  });

  it('should call get file information', () => {
    const fileUploaderComponentService = TestBed.get(FileUploaderComponentService);
    const filesService = TestBed.get(FilesService);
    fileUploaderComponentService.getFileInformation();
    expect(filesService.fileInfoRoute).toHaveBeenCalled();
  });
});
