import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import userModule from '../../../../../../services/user/user'
import commonSettingsModule from '../../../../../../services/common-settings/common-settings'
import '../../../../../../components/interface/dropdown-primary/dropdown-primary'
import '../../../../../../components/interface/pin-verification/pin-verification'
import {GeneralPhoneSettingsController} from './phone-settings.controller';

const phoneSettingsModule: string = angular.module(
  'profitelo.components.dashboard.settings.modals.general.phone-settings', [
  'ui.bootstrap',
  'profitelo.directives.interface.pro-input',
  apiModule,
  'profitelo.directives.interface.scrollable',
  commonSettingsModule,
  userModule,
  'profitelo.components.interface.dropdown-primary',
  'profitelo.components.interface.pin-verification'
])
  .controller('generalPhoneSettingsController', GeneralPhoneSettingsController)
  .name

export default phoneSettingsModule
