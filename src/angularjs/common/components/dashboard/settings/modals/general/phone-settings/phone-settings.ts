// tslint:disable:no-import-side-effect
import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import userModule from '../../../../../../services/user/user';
import commonSettingsModule from '../../../../../../services/common-settings/common-settings';
import '../../../../../../components/interface/dropdown-primary/dropdown-primary';
import '../../../../../../components/interface/pin-verification/pin-verification';
import { PhoneSettingsController } from './phone-settings.controller';
import ValidationAlertModule from '../../../../../interface/alert/validation-alert/validation-alert';
import inputModule from '../../../../../interface/input/input';
import { PhoneSettingsService } from './phone-settings.service';
import errorHandlerModule from '../../../../../../services/error-handler/error-handler';

const phoneSettingsModule = angular.module(
  'profitelo.components.dashboard.settings.modals.general.phone-settings', [
  'ui.bootstrap',
  apiModule,
  commonSettingsModule,
  userModule,
  errorHandlerModule,
  'profitelo.components.interface.dropdown-primary',
  'profitelo.components.interface.pin-verification',
  ValidationAlertModule,
  inputModule,
  'profitelo.components.interface.preloader-container'
])
  .controller('phoneSettingsController', PhoneSettingsController)
  .service('phoneSettingsService', PhoneSettingsService)
  .name;

export default phoneSettingsModule;
