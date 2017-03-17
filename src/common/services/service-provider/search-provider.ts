import * as angular from 'angular'
import {ServiceProviderService} from './service-provider.service'

const serviceProviderModule = angular.module('profitelo.services.service-provider', [
  'ui.router'
])
  .service('serviceProviderService', ServiceProviderService)
  .name

export default serviceProviderModule;
