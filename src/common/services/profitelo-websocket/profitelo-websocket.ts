import * as angular from 'angular'
import callbacksModule from '../callbacks/callbacks'
import {ProfiteloWebsocketService} from './profitelo-websocket.service'
import userModule from '../user/user'
import eventsModule from '../events/events'

const profiteloWebsocketModule = angular.module('profitelo.services.profitelo-websocket', [
  callbacksModule,
  userModule,
  eventsModule,
  'commonConfig'
])
  .service('profiteloWebsocket', ProfiteloWebsocketService)
  .name

export default profiteloWebsocketModule;
