import * as angular from 'angular'
import {UrlService} from './url.service'
import commonSettingsModule from '../common-settings/common-settings'

const urlModule = angular.module('profitelo.services.url', [
  commonSettingsModule,
  'commonConfig'
])
  .service('urlService', UrlService)
  .name

export default urlModule;
