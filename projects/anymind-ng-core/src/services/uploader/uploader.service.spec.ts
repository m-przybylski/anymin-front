// tslint:disable:no-magic-numbers
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FilesService, PostFileDetails } from '@anymind-ng/api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IUploadFileInfo, UploaderService } from './uploader.service';
import FileTypeEnum = PostFileDetails.FileTypeEnum;
import { of, Observable, Observer } from 'rxjs';
import { Deceiver } from 'deceiver-core';
import { CORE_CONFIG } from '../../shared/injection-tokens/injection-tokens';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('Service: UploaderService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let uploaderService: UploaderService;
  let filesService: FilesService;
  const progress1 = {
    type: HttpEventType.UploadProgress,
    loaded: 500,
    total: 2000,
  };
  const progress2 = {
    type: HttpEventType.UploadProgress,
    loaded: 1000,
    total: 2000,
  };

  /**
   * It may happen that browser does not know what is the file size
   */
  const progress3 = {
    type: HttpEventType.UploadProgress,
    loaded: 1500,
  };
  const complete = {
    type: HttpEventType.Response,
    body: 1234,
  };

  let http$: Observable<any>;
  const mockFile: File = new File([], 'mockFile');
  const mockFileDetails: PostFileDetails = {
    croppingDetails: undefined,
    fileType: FileTypeEnum.PROFILE,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UploaderService,
        { provide: FilesService, useValue: Deceiver(FilesService, { createFileTokenRoute: jest.fn(() => of('123')) }) },
        { provide: CORE_CONFIG, useValue: { urls: { files: 'files', fileUpload: '' } } },
      ],
    });
  });

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    uploaderService = TestBed.get(UploaderService);
    filesService = TestBed.get(FilesService);
    http$ = Observable.create((observer: Observer<any>) => {
      setTimeout(() => observer.next(progress1), 20);
      setTimeout(() => observer.next(progress2), 40);
      setTimeout(() => observer.next(progress3), 60);
      setTimeout(() => {
        observer.next(complete);
        observer.complete();
      }, 80);
    });
  });

  it('should upload file', () => {
    const fileDetails: PostFileDetails = {
      croppingDetails: undefined,
      fileType: FileTypeEnum.PROFILE,
    };
    const uploadedFileResponse: IUploadFileInfo = {
      token: 'token',
      createdAt: new Date(),
      uploadedAt: new Date(),
      contentType: 'type',
      size: 123,
      previews: ['preview'],
      name: 'name',
    };
    const file: File = new File([], 'fileName');
    uploaderService.uploadFile(file, fileDetails, undefined).then((response: IUploadFileInfo) => {
      expect(response).toEqual(uploadedFileResponse);
    });
    const request = httpTestingController.match({ method: 'POST' });
    expect(request.length).toEqual(1);
    request[0].flush(uploadedFileResponse);
  });

  it('should reject upload because of there is no file', () => {
    const fileDetails: PostFileDetails = {
      croppingDetails: undefined,
      fileType: FileTypeEnum.PROFILE,
    };
    const file: File = new File([], 'fileName');
    uploaderService.uploadFile(file, fileDetails, undefined).catch((error: string) => {
      expect(error).toEqual('Expected File, got object');
    });
    const request = httpTestingController.match({ method: 'POST' });
    expect(request.length).toEqual(1);
    const httpError = {
      colno: 123,
      error: '',
      filename: 'some file',
      lineno: 23,
      message: 'oups',
    };
    request[0].error(httpError as ErrorEvent);
  });

  it('should cancel downloading file', fakeAsync(() => {
    httpClient.post = jest.fn(() => http$);
    const uploadResult = uploaderService.uploadFile(mockFile, mockFileDetails, undefined);
    expect(uploadResult).rejects.toBeTruthy();
    setTimeout(() => {
      uploaderService.removeFileFromUpload(mockFile);
    }, 50);
    getTestScheduler().flush();
    tick(300);
  }));

  it('should call progress when provided', fakeAsync(() => {
    const mockOnProgress = jest.fn();
    httpClient.post = jest.fn(() => http$);
    const uploadResult = uploaderService.uploadFile(mockFile, mockFileDetails, mockOnProgress);
    expect(uploadResult).resolves.toBeTruthy();
    tick(50);
    expect(mockOnProgress).toHaveBeenCalledTimes(2);
    tick(20);
    expect(mockOnProgress).toHaveBeenCalledTimes(3);
    tick(10);
  }));

  it('should report inProgress when file is uploading', fakeAsync(() => {
    httpClient.post = jest.fn(() => http$);
    const uploadResult = uploaderService.uploadFile(mockFile, mockFileDetails, undefined);
    expect(uploadResult).resolves.toBeTruthy();
    tick(50);
    expect(uploaderService.isAnyFileUploading).toBeTruthy();
    tick(50);
    expect(uploaderService.isAnyFileUploading).toBeFalsy();
  }));

  it('should reject sending file when token request fails', fakeAsync(() => {
    const token = cold('--#', {}, 'error');
    filesService.createFileTokenRoute = jest.fn(() => token);
    const uploadResult = uploaderService.uploadFile(mockFile, mockFileDetails, undefined);
    getTestScheduler().flush();
    expect(uploadResult).rejects.toEqual('error');
    expect(uploaderService.isAnyFileUploading).toBeFalsy();
  }));
  it('should not start to uploading when canceled before token received', fakeAsync(() => {
    const token = Observable.create(observer => {
      setTimeout(() => {
        observer.next('1234567890');
        observer.complete();
      }, 30);
    });
    filesService.createFileTokenRoute = jest.fn(() => token);
    httpClient.post = jest.fn();
    const uploadResult = uploaderService.uploadFile(mockFile, mockFileDetails, undefined);
    setTimeout(() => {
      uploaderService.removeFileFromUpload(mockFile);
    }, 20);
    expect(uploadResult).rejects.toBeTruthy();
    tick(300);
    expect(httpClient.post).not.toHaveBeenCalled();
  }));
  it('should reject when no file is provided', () => {
    const uploadResult = uploaderService.uploadFile(undefined as File, mockFileDetails, undefined);
    expect(uploadResult).rejects.toEqual('Expected File, got undefined');
  });
});
