import * as angular from 'angular';
import { ImageZoomService } from './image-zoom.service';

const imageZoomModule = angular.module('profitelo.services.image-zoom', [])
  .service('imageZoomService', ImageZoomService)
  .name;

export default imageZoomModule;
