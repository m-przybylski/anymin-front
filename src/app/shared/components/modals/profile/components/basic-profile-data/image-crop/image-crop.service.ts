import { Injectable } from '@angular/core';
import { PostFileDetails } from '@anymind-ng/api';
import { CropDetails } from '@anymind-ng/api/model/cropDetails';
import { IImageCropData } from '@platform/shared/components/modals/profile/components/basic-profile-data/image-crop/image-crop.component';
import { UploaderService, IUploadFileInfo } from '@anymind-ng/core';
import * as Croppie from 'croppie';

@Injectable()
export class ImageCropService {
  constructor(private uploaderService: UploaderService) {}

  public uploadFile(cropModalData: IImageCropData, croppieElement: Croppie): Promise<IUploadFileInfo> {
    const reportProgress = (_data: IUploadFileInfo): void => undefined;

    return this.uploaderService.uploadFile(
      cropModalData.file,
      { fileType: PostFileDetails.FileTypeEnum.PROFILE, croppingDetails: this.assignCroppieCords(croppieElement) },
      reportProgress,
    );
  }

  private assignCroppieCords = (croppieElement: Croppie): CropDetails => {
    const points = croppieElement.get().points;
    const indexOfPointCordX = 0;
    const indexOfPointCordY = 1;
    const indexOfPointWidth = 2;
    const indexOfPointHeight = 3;

    if (points !== undefined) {
      return {
        x: Number(points[indexOfPointCordX]),
        y: Number(points[indexOfPointCordY]),
        width: Number(points[indexOfPointWidth]) - Number(points[indexOfPointCordX]),
        height: Number(points[indexOfPointHeight]) - Number(points[indexOfPointCordY]),
      };
    } else {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
  };
}
