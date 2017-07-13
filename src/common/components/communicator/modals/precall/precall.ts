import * as angular from 'angular'
import './precall.sass'
import {PreallcallModalController} from './precall.controller'
import apiModule from 'profitelo-api-ng/api.module'
import inputModule from '../../../interface/input/input'
import outputTimerModule from '../../../interface/output/output'
import commonSettingsModule from '../../../../services/common-settings/common-settings'
import filtersModule from '../../../../filters/filters'

const preallcallModalModule = angular.module('profitelo.components.communicator.modals.precall.precall', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.components.interface.dropdown-primary',
  apiModule,
  inputModule,
  outputTimerModule,
  commonSettingsModule,
  filtersModule
])
.controller('precallPostpaidController', PreallcallModalController)
  .name

export default preallcallModalModule
