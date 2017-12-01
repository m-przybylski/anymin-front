import * as angular from 'angular'
import {ProfiteloWebsocketService} from './profitelo-websocket.service'
import userModule from '../user/user'
import eventsModule from '../events/events'

const profiteloWebsocketModule = angular.module('profitelo.services.profitelo-websocket', [
  userModule,
  eventsModule,
  'commonConfig'
])
  .service('profiteloWebsocket', ProfiteloWebsocketService)
  .name

export default profiteloWebsocketModule;
