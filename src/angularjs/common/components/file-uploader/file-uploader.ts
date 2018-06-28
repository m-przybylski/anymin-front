// tslint:disable:no-mixed-interface
// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:new-parens
import * as angular from 'angular';
import { FileUploaderComponent } from './file-uploader.component';
import uploaderModule from '../../services/uploader/uploader';
import loaderModule from '../interface/loader/loader';
import translatorModule from '../../services/translator/translator';
import commonSettingsModule from '../../services/common-settings/common-settings';

export interface IFileUploaderModuleComponentBindings extends ng.IController {
  tokenList: string[];
  isValidCallback: (status: boolean) => void;
}

const fileUploaderModule = angular.module('profitelo.components.file-uploader', [
  uploaderModule,
  loaderModule,
  translatorModule,
  'pascalprecht.translate',
  commonSettingsModule
])
.component('fileUploader', new FileUploaderComponent)
  .name;

export default fileUploaderModule;
