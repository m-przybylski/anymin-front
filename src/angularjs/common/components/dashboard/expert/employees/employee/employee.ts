// tslint:disable:no-mixed-interface
// tslint:disable:prefer-method-signature
// tslint:disable:no-import-side-effect
import * as angular from 'angular';
import { ExpertEmployeeComponent } from './employee.component';
import 'angular-translate';
import userAvatarModule from '../../../../interface/user-avatar/user-avatar';
import apiModule from 'profitelo-api-ng/api.module';
import errorHandlerModule from '../../../../../services/error-handler/error-handler';
import topAlertModule from '../../../../../services/top-alert/top-alert';
import translatorModule from '../../../../../services/translator/translator';
import modalsModule from '../../../../../services/modals/modals';
import { IEmployee } from '../../../../../../app/dashboard/expert/employees/employees.controller';

export interface IExpertEmployeeComponentBindings extends ng.IController {
  profileWithEmployments: IEmployee;
  onDeleteCallback: () => void;
}

const expertEmployeeModule = angular.module('profitelo.components.dashboard.expert.employees.employee', [
  'pascalprecht.translate',
  userAvatarModule,
  apiModule,
  modalsModule,
  errorHandlerModule,
  topAlertModule,
  translatorModule
])
.component('expertEmployee', new ExpertEmployeeComponent())
  .name;

export default expertEmployeeModule;
