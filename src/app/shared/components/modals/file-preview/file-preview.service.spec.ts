import { combineReducers, StoreModule } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers/index';
import { Deceiver } from 'deceiver-core';
import { ProfileDocument } from '@anymind-ng/api';
import * as fromRoot from '@platform/reducers/index';
import { TestBed } from '@angular/core/testing';
import { FilePreviewService, IFileType } from '@platform/shared/components/modals/file-preview/file-preview.service';
import { LoggerFactory, LoggerService, WindowRef } from '@anymind-ng/core';
import { FileUrlResolveService } from '@platform/shared/services/file-url-resolve/file-url-resolve.service';

describe('FilePreviewService', () => {
  let filePreviewService: FilePreviewService;

  const windowRef: WindowRef = Deceiver(WindowRef);
  const loggerFactory: LoggerFactory = Deceiver(LoggerFactory, {
    createLoggerService: jest.fn().mockReturnValue(Deceiver(LoggerService)),
  });

  const fileUrlResolveService: FileUrlResolveService = Deceiver(FileUrlResolveService, {
    getFilePreviewDownloadUrl: jest.fn(a => `preview/${a}`),
    getFileDownloadUrl: jest.fn(a => `${a}`),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          core: combineReducers(fromCore.reducers),
        }),
      ],
    });
    filePreviewService = new FilePreviewService(windowRef, fileUrlResolveService, loggerFactory);
  });

  it('should be created', () => {
    expect(filePreviewService).toBeTruthy();
  });

  it('should check pdf file type', () => {
    const file: ProfileDocument = {
      name: 'name',
      token: '1234567890',
      previews: ['www.anymind.com/files//12345/download/0', 'www.anymind.com/files//123456/download/1'],
      contentType: 'application/pdf',
    };

    const result = {
      contentType: IFileType.PDF,
      fileUrl: `1234567890`,
      name: 'name',
      previews: ['www.anymind.com/files/12345/download/0', 'www.anymind.com/files/123456/download/1'],
      token: '1234567890',
    };

    expect(filePreviewService.checkTypeOfFile(file)).toEqual(result);
  });

  it('should check image file type', () => {
    const file: ProfileDocument = {
      name: 'name',
      token: '123',
      previews: ['www.anymind.com/files/12345/download/0', 'www.anymind.com/files/123456/download/1'],
      contentType: 'image/jpeg',
    };

    const result = {
      contentType: IFileType.IMAGE_JPG,
      fileUrl: `123`,
      name: 'name',
      previews: [`preview/123`],
      token: '123',
    };

    expect(filePreviewService.checkTypeOfFile(file)).toEqual(result);
  });

  it('should check unknown file type', () => {
    const file: ProfileDocument = {
      name: 'name',
      token: 'token',
      previews: [''],
      contentType: 'application/doc',
    };

    const result = {
      name: 'name',
      token: 'token',
      previews: [''],
      contentType: IFileType.OTHER,
      fileUrl: `token`,
    };

    expect(filePreviewService.checkTypeOfFile(file)).toEqual(result);
  });

  it('should check unknown file type without name string', () => {
    const file: ProfileDocument = {
      token: 'token',
      previews: [''],
      contentType: 'application/doc',
    };

    const result = {
      name: 'DASHBOARD.PROFILE.FILES.PREVIEW.NAME',
      token: 'token',
      previews: [''],
      contentType: IFileType.OTHER,
      fileUrl: `token`,
    };

    expect(filePreviewService.checkTypeOfFile(file)).toEqual(result);
  });
});
