import * as angular from 'angular'
import {ExpertInviteEmployeesController} from './invite-employees.controller'
import './invite-employees.sass'

const expertInviteEmployeesModule = angular.module('profitelo.components.dashboard.expert.activities.modals.invite-employees', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  'profitelo.directives.interface.pro-tags-dropdown',
  'profitelo.directives.interface.pro-checkbox'
])
.controller('expertInviteEmployees', ExpertInviteEmployeesController)
  .name

export default expertInviteEmployeesModule
