import * as angular from 'angular'
import '../../../../../../directives/interface/pro-tags-dropdown/pro-tags-dropdown.ts'
import {ExpertInviteEmployeesController} from './invite-employees.controller'
import './invite-employees.sass'
import checkboxModule from '../../../../../interface/checkbox/checkbox'
import consultationEmployeeInputModule
  from '../../../../../wizard/consultation-employee-input/consultation-employee-input'
import consultationListItemModule from '../../../../../invitations/consultation-list-item/consultation-list-item'

const expertInviteEmployeesModule = angular.module(
  'profitelo.components.dashboard.expert.activities.modals.invite-employees', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  'profitelo.directives.interface.pro-tags-dropdown',
  checkboxModule,
  consultationEmployeeInputModule,
  consultationListItemModule
])
.controller('expertInviteEmployees', ExpertInviteEmployeesController)
  .name

export default expertInviteEmployeesModule
