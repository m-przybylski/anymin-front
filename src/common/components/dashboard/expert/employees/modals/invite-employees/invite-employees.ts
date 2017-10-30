import * as angular from 'angular'
import '../../../../../../directives/interface/pro-tags-dropdown/pro-tags-dropdown.ts'
import {ExpertInviteEmployeesController} from './invite-employees.controller'
import './invite-employees.sass'
import consultationListItemModule from '../../../../../invitations/consultation-list-item/consultation-list-item'
import ValidationAlertModule from '../../../../../interface/alert/validation-alert/validation-alert'
import inputConsultationEmployeeModule
  from '../../../../../interface/input-consultation-employee/input-consultation-employee'
import apiModule from 'profitelo-api-ng/api.module'
import errorHandlerModule from '../../../../../../services/error-handler/error-handler'

const expertInviteEmployeesModule = angular.module(
  'profitelo.components.dashboard.expert.activities.modals.invite-employees', [
    'ui.bootstrap',
    'profitelo.components.interface.preloader',
    inputConsultationEmployeeModule,
    consultationListItemModule,
    ValidationAlertModule,
    errorHandlerModule,
    apiModule
  ])
  .controller('expertInviteEmployees', ExpertInviteEmployeesController)
  .name

export default expertInviteEmployeesModule
