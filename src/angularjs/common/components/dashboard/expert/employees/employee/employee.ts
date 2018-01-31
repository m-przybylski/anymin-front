import * as angular from 'angular';
import { ExpertEmployeeComponent } from './employee.component';
import 'angular-translate';
import userAvatarModule from '../../../../interface/user-avatar/user-avatar';
import { GetProfileDetailsWithEmployments } from 'profitelo-api-ng/model/models';
import apiModule from 'profitelo-api-ng/api.module';
import errorHandlerModule from '../../../../../services/error-handler/error-handler';
import topAlertModule from '../../../../../services/top-alert/top-alert';
import translatorModule from '../../../../../services/translator/translator';

export interface IExpertEmployeeComponentBindings extends ng.IController {
  profileWithEmployments: GetProfileDetailsWithEmployments;
  onDeleteCallback: () => void;
}

const expertEmployeeModule = angular.module('profitelo.components.dashboard.expert.employees.employee', [
  'pascalprecht.translate',
  userAvatarModule,
  apiModule,
  errorHandlerModule,
  topAlertModule,
  translatorModule
])
.component('expertEmployee', new ExpertEmployeeComponent())
  .name;

export default expertEmployeeModule;
