import * as angular from 'angular'
import {SessionDeletedService} from './session-deleted.service'

const sessionDeletedModule = angular.module('profitelo.services.session-deleted', [
])
.service('sessionDeletedService', SessionDeletedService)
  .name;

export default sessionDeletedModule;
