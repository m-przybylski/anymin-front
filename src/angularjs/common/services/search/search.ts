import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import { SearchService } from './search.service';
import errorHandlerModule from '../error-handler/error-handler';

const searchModule = angular.module('profitelo.services.search', [
  apiModule,
  errorHandlerModule
])
  .service('searchService', SearchService)
  .name;

export default searchModule;
