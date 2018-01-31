import * as angular from 'angular';
import { ImageCropComponent } from './image-crop.component';

export interface IImageCropComponentBindings extends ng.IController {
  imageSrc?: string;
  saveCropAvatar: (element: any) => void;
}

const imageCropModule: string = angular.module('profitelo.components.interface.image-crop', [
  'pascalprecht.translate'
])
  .component('imageCropComponent', new ImageCropComponent())
  .name;

export default imageCropModule;
