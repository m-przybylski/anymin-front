// tslint:disable:no-import-side-effect
import * as angular from 'angular';
import '../../../../../../directives/interface/pro-tags-dropdown/pro-tags-dropdown.ts';
import { ExpertInviteEmployeesController } from './invite-employees.controller';
import ValidationAlertModule from '../../../../../interface/alert/validation-alert/validation-alert';
import inputConsultationEmployeeModule
  from '../../../../../interface/input-consultation-employee/input-consultation-employee';
import apiModule from 'profitelo-api-ng/api.module';
import errorHandlerModule from '../../../../../../services/error-handler/error-handler';
import inviteEmployeeConsultationListItemModule
    from './invite-employee-consultation-list-item/invite-employee-consultation-list-item';

const expertInviteEmployeesModule = angular.module(
  'profitelo.components.dashboard.expert.activities.modals.invite-employees', [
    'ui.bootstrap',
    'profitelo.components.interface.preloader',
    inputConsultationEmployeeModule,
    ValidationAlertModule,
    errorHandlerModule,
    apiModule,
    inviteEmployeeConsultationListItemModule
  ])
  .controller('expertInviteEmployees', ExpertInviteEmployeesController)
  .name;

export default expertInviteEmployeesModule;
