import * as angular from 'angular';
import { IImageCropComponentBindings } from './image-crop';

export class ImageCropComponentController implements IImageCropComponentBindings {

  public imageSrc: string;
  public saveCropAvatar: (element: any) => void;

  private element: any;

  static $inject = [];

  constructor() {
    this.element = $('.cropper-container');
  }

  $onChanges = (): void => {
    if (angular.isDefined(this.imageSrc) && this.imageSrc) {
      this.element.croppie({
        url: this.imageSrc,
        viewport: {
          width: 200,
          height: 200,
          type: 'circle'
        }
      });
    }
  }

  public cropImage = (): void => {
    this.saveCropAvatar(this.element.croppie('get'));
    this.element.croppie('destroy');
  }

}
