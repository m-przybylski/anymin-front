import * as angular from 'angular'
import 'angular-translate'
import {ExpertNavigationComponent} from './navigation.component'
import apiModule from 'profitelo-api-ng/api.module'
import filtersModule from '../../../../filters/filters'
import promiseModule from '../../../../services/promise/promise'
import errorHandlerModule from '../../../../services/error-handler/error-handler';
import profiteloWebsocketModule from '../../../../services/profitelo-websocket/profitelo-websocket'

export interface IExpertNavigationComponentBindings extends ng.IController {
}

const expertNavigationModule = angular.module('profitelo.components.dashboard.expert.navigation', [
  'pascalprecht.translate',
  filtersModule,
  errorHandlerModule,
  apiModule,
  promiseModule,
  profiteloWebsocketModule
])
  .component('expertNavigation', new ExpertNavigationComponent())
  .name

export default expertNavigationModule
