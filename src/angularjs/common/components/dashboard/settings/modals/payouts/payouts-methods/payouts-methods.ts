import * as angular from 'angular';
import inputModule from '../../../../../interface/input/input';
import commonSettingsModule from '../../../../../../services/common-settings/common-settings';
import apiModule from 'profitelo-api-ng/api.module';
import { PayoutsMethodsModalController } from './payouts-methods.controller';
import { PayoutsMethodsModalService } from './payouts-methods.service';
import errorHandlerModule from '../../../../../../services/error-handler/error-handler';

const payoutsMethodsModalModule = angular.module('profitelo.components.dashboard.settings.modals.payouts.payouts', [
  'ui.bootstrap',
  apiModule,
  commonSettingsModule,
  'profitelo.components.interface.preloader',
  inputModule,
  errorHandlerModule
])
  .controller('payoutsMethodsModalController', PayoutsMethodsModalController)
  .service('payoutsMethodsModalService', PayoutsMethodsModalService)
  .name;

export default payoutsMethodsModalModule;
