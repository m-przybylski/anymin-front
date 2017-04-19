import * as angular from 'angular'
import {ExpertEmployeeComponent} from './employee.component'
import 'angular-translate'
import './employee.sass'
import 'common/directives/interface/pro-checkbox/pro-checkbox'
import userAvatarModule from '../../../../interface/user-avatar/user-avatar';

export interface IExpertEmployeeComponentBindings extends ng.IController {
}

const expertEmployeeModule = angular.module('profitelo.components.dashboard.expert.employees.employee', [
  'pascalprecht.translate',
  'profitelo.directives.interface.pro-checkbox',
  userAvatarModule
])
  .component('expertEmployee', new ExpertEmployeeComponent())
  .name

export default expertEmployeeModule
