import * as angular from 'angular'
import {UrlService} from './url.service'
import commonSettingsModule from '../common-settings/common-settings'
import 'ng-lodash'

const urlModule = angular.module('profitelo.services.url', [
  commonSettingsModule,
  'ngLodash',
  'commonConfig'
])
  .service('urlService', UrlService)
  .name

export default urlModule;
