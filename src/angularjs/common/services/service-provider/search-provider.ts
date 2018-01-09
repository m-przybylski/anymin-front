import * as angular from 'angular'
import {ServiceProviderService} from './service-provider.service'
import uiRouter from '@uirouter/angularjs'

const serviceProviderModule = angular.module('profitelo.services.service-provider', [
  uiRouter
])
  .service('serviceProviderService', ServiceProviderService)
  .name

export default serviceProviderModule;
