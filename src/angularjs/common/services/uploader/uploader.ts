import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import { UploaderFactory } from './uploader.factory';
import 'ng-file-upload';

const uploaderModule = angular.module('profitelo.services.uploader', [
  apiModule,
  'ngFileUpload'
])
  .config(['$qProvider', ($qProvider: ng.IQProvider): any => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .service('uploaderFactory', UploaderFactory)
  .name;

export default uploaderModule;
