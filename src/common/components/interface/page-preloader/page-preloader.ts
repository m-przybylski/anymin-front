import * as angular from 'angular'
import {PagePreloaderComponent} from './page-preloader.component'
import './page-preloader.sass'
import promiseModule from '../../../services/promise/promise'

const pagePreloaderModule = angular.module('profitelo.components.interface.page-preloader', [
  'pascalprecht.translate',
  promiseModule,
  'ui.router'
])
.component('pagePreloader', new PagePreloaderComponent())
  .name

export default pagePreloaderModule
