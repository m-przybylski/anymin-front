import * as angular from 'angular'
import {HelpdeskService} from './helpdesk.service'

const helpdeskModule = angular.module('profitelo.services.helpdesk', [

])
.service('helpdeskService', HelpdeskService)
  .name

export default helpdeskModule
