import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import {SearchService} from './search.service'

const searchModule = angular.module('profitelo.services.search', [
  apiModule
])
  .service('searchService', SearchService)
  .name

export default searchModule;
