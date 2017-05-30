import * as angular from 'angular'
import {ExpertEmployeeComponent} from './employee.component'
import 'angular-translate'
import './employee.sass'
import userAvatarModule from '../../../../interface/user-avatar/user-avatar';
import modalsModule from '../../../../../services/modals/modals';
import checkboxModule from '../../../../interface/checkbox/checkbox'

export interface IExpertEmployeeComponentBindings extends ng.IController {
}

const expertEmployeeModule = angular.module('profitelo.components.dashboard.expert.employees.employee', [
  'pascalprecht.translate',
  userAvatarModule,
  modalsModule,
  checkboxModule
])
.component('expertEmployee', new ExpertEmployeeComponent())
  .name

export default expertEmployeeModule
