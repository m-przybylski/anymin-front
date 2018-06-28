import { TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { FilesService, PostFileDetails } from '@anymind-ng/api';
import { IUploadFileInfo, UploaderService } from './uploader.service';
import FileTypeEnum = PostFileDetails.FileTypeEnum;
import { of } from 'rxjs/observable/of';

describe('Service: UploaderService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploaderService,
        {provide: FilesService, useValue: createSpyObj('FilesService', ['createFileTokenRoute'])},
      ]
    });
  });

  it('should upload file', () => {
    const uploaderService = TestBed.get(UploaderService);
    const filesService = TestBed.get(FilesService);
    const fileDetails: PostFileDetails = {
      croppingDetails: undefined,
      fileType: FileTypeEnum.PROFILE
    };
    const uploadedFileResponse: IUploadFileInfo = {
      token: 'token',
      createdAt: new Date(),
      uploadedAt: new Date(),
      contentType: 'type',
      size: 123,
      previews: ['preview'],
      name: 'name'
    };
    const file: File = new File([], 'fileName');
    filesService.createFileTokenRoute.and.returnValue(of());
    uploaderService.uploadFile(file, fileDetails).then((response: IUploadFileInfo) => {
      expect(response).toEqual(uploadedFileResponse);
    });
  });

  it('should reject upload because of there is no file', () => {
    const uploaderService = TestBed.get(UploaderService);
    const fileDetails: PostFileDetails = {
      croppingDetails: undefined,
      fileType: FileTypeEnum.PROFILE
    };
    const file = {};
    uploaderService.uploadFile(file, fileDetails).catch((error: string) => {
      expect(error).toEqual('Expected File, got object');
    });
  });

});
