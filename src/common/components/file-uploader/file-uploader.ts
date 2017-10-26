import * as angular from 'angular'
import {FileUploaderComponent} from './file-uploader.component'
import './file-uploader.sass'
import uploaderModule from '../../services/uploader/uploader'
import loaderModule from '../interface/loader/loader'
import translatorModule from '../../services/translator/translator'

export interface IFileUploaderModuleComponentBindings extends ng.IController {
  tokenList: string[]
  isValidCallback: (status: boolean) => {}
}

const fileUploaderModule = angular.module('profitelo.components.file-uploader', [
  uploaderModule,
  loaderModule,
  translatorModule,
  'pascalprecht.translate'
])
.component('fileUploader', new FileUploaderComponent)
  .name

export default fileUploaderModule
