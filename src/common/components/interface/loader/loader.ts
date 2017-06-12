import * as angular from 'angular'
import {LoaderComponent} from './loader.component'
import './loader.sass'

export interface ILoaderComponentBindings  extends ng.IController {
  fileUploadInfo: any
}

const loaderModule = angular.module('profitelo.components.interface.loader', [
])
.component('loader', new LoaderComponent)
  .name

export default loaderModule
