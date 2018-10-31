import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromCore from 'app/core/reducers/index';
import { Deceiver } from 'deceiver-core';
import { GetProfileWithDocuments, ProfileDocument, ProfileService } from '@anymind-ng/api';
import * as fromRoot from 'app/reducers/index';
import { TestBed } from '@angular/core/testing';
import { FilePreviewService } from '@platform/shared/components/modals/file-preview/file-preview.service';
import { AlertService, LoggerFactory, LoggerService, WindowRef } from '@anymind-ng/core';
import { cold } from 'jasmine-marbles';
import { IFileType } from '@platform/shared/components/modals/file-preview/file-preview.component';

describe('FilePreviewService', () => {
  let filePreviewService: FilePreviewService;
  let store: Store<fromCore.IState>;

  const profileService: ProfileService = Deceiver(ProfileService);
  const windowRef: WindowRef = Deceiver(WindowRef);
  const alertService: AlertService = Deceiver(AlertService);
  const loggerFactory: LoggerFactory = Deceiver(LoggerFactory, {
    createLoggerService: jasmine.createSpy('createLoggerService').and.returnValue(Deceiver(LoggerService)),
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
    store = TestBed.get(Store);
    filePreviewService = new FilePreviewService(profileService, alertService, windowRef, loggerFactory);
  });

  it('should be created', () => {
    expect(filePreviewService).toBeTruthy();
  });

  it('should get expert profile files', () => {
    const serviceId = '123444';
    const isExpertProfile = true;
    const profileDocument: ProfileDocument = {
      name: 'string',
      token: 'string',
      previews: ['preview'],
      contentType: 'string',
    };

    const getProfileWithDocuments: GetProfileWithDocuments = {
      expertDocuments: [profileDocument],
      profile: {
        id: 'qwerr',
        isActive: true,
        expertDetails: {
          avatar: '123444',
          description: 'jujuju',
          links: [],
          name: 'asdfff',
        },
      },
      organizationDocuments: [profileDocument],
    };

    const result = profileDocument;

    const expected$ = cold('-(a|)', { a: [result] });
    profileService.getProfileRoute = jasmine
      .createSpy('getProfileRoute')
      .and.returnValue(cold('-(a|)', { a: getProfileWithDocuments }));
    expect(filePreviewService.getProfileDetails(serviceId, isExpertProfile)).toBeObservable(expected$);
  });

  it('should get company profile files', () => {
    const serviceId = '123444';
    const isExpertProfile = false;
    const profileDocument: ProfileDocument = {
      name: 'string',
      token: 'string',
      previews: ['preview'],
      contentType: 'string',
    };

    const getProfileWithDocuments: GetProfileWithDocuments = {
      expertDocuments: [profileDocument],
      profile: {
        id: 'qwerr',
        isActive: true,
        expertDetails: {
          avatar: '123444',
          description: 'jujuju',
          links: [],
          name: 'asdfff',
        },
      },
      organizationDocuments: [profileDocument],
    };

    const result = profileDocument;

    const expected$ = cold('-(a|)', { a: [result] });
    profileService.getProfileRoute = jasmine
      .createSpy('getProfileRoute')
      .and.returnValue(cold('-(a|)', { a: getProfileWithDocuments }));
    expect(filePreviewService.getProfileDetails(serviceId, isExpertProfile)).toBeObservable(expected$);
  });

  it('should check pdf file type', () => {
    const file: ProfileDocument = {
      name: 'name',
      token: '1234567890',
      previews: ['www.anymind.com/files//12345/download/0', 'www.anymind.com/files//123456/download/1'],
      contentType: 'application/pdf',
    };

    const result = {
      name: 'name',
      token: file.token,
      previews: ['www.anymind.com/files/12345/download/0', 'www.anymind.com/files/123456/download/1'],
      contentType: IFileType.PDF,
      fileUrl: `${window.location.origin}/files/1234567890/download`,
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
      name: 'name',
      token: file.token,
      previews: [`${window.location.origin}/files/123/download`],
      contentType: IFileType.IMAGE_JPG,
      fileUrl: `${window.location.origin}/files/123/download`,
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
      token: file.token,
      previews: [''],
      contentType: IFileType.OTHER,
      fileUrl: `${window.location.origin}/files/token/download`,
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
      token: file.token,
      previews: [''],
      contentType: IFileType.OTHER,
      fileUrl: `${window.location.origin}/files/token/download`,
    };

    expect(filePreviewService.checkTypeOfFile(file)).toEqual(result);
  });
});
