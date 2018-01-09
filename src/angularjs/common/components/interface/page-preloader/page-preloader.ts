import * as angular from 'angular'
import {PagePreloaderComponent} from './page-preloader.component'
import promiseModule from '../../../services/promise/promise'
import uiRouter from '@uirouter/angularjs'

const pagePreloaderModule = angular.module('profitelo.components.interface.page-preloader', [
  'pascalprecht.translate',
  uiRouter,
  promiseModule,
  ])
.component('pagePreloader', new PagePreloaderComponent())
  .name

export default pagePreloaderModule
