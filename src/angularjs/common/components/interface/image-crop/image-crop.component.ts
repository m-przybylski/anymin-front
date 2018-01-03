import {ImageCropComponentController} from './image-crop.controller';

export class ImageCropComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ImageCropComponentController
  template = require('./image-crop.pug')
  bindings: {[boundProperty: string]: string} = {
    imageSrc: '<',
    saveCropAvatar: '<'
  }
}
