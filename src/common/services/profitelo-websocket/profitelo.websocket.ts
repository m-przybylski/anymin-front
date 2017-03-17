import * as angular from 'angular'
import callbacksModule from '../callbacks/callbacks'
import {ProfiteloWebsocketService} from './profitelo-websocket.service'

const profiteloWebsocketModule = angular.module('profitelo.services.profitelo-websocket', [
  callbacksModule,
  'commonConfig'
])
  .service('profiteloWebsocket', ProfiteloWebsocketService)
  .name

export default profiteloWebsocketModule;
