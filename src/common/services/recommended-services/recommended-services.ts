import * as angular from 'angular'
import {RecommendedServicesService} from './recommended-services.service'
import apiModule from 'profitelo-api-ng/api.module'
import sessionModule from '../session/session'

const recommendedServicesModule = angular.module('profitelo.services.recommended-services', [
  apiModule,
  'ngLodash',
  sessionModule
])
  .service('recommendedServices', RecommendedServicesService)
  .name

export default recommendedServicesModule;
