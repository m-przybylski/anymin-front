// tslint:disable:new-parens
import * as angular from 'angular';
import { LoaderComponent } from './loader.component';

export interface ILoaderComponentBindings  extends ng.IController {
  fileUploadInfo: any;
  fileUploadError: boolean;
}

const loaderModule = angular.module('profitelo.components.interface.loader', [
])
.component('loader', new LoaderComponent)
  .name;

export default loaderModule;
