// tslint:disable:no-require-imports
import { ImageCropComponentController } from './image-crop.controller';

// tslint:disable:member-ordering
export class ImageCropComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ImageCropComponentController;
  public template = require('./image-crop.html');
  public bindings: {[boundProperty: string]: string} = {
    imageSrc: '<',
    saveCropAvatar: '<'
  };
}
