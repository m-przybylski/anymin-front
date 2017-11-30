import * as angular from 'angular'
import {NavbarAvailbilityComponent} from './navbar-availbility.component'
import './navbar-availbility.sass'
import {NavbarAvailbilityService} from './navbar-availbility.service'
import apiModule from 'profitelo-api-ng/api.module'
import profiteloWebsocketModule from '../../../services/profitelo-websocket/profitelo-websocket'
import {NavbarAvailbilityAnimation} from './navbar-availbility.animation'
import errorHandlerModule from '../../../services/error-handler/error-handler'

const navbarAvailbilityModule = angular.module('profitelo.components.navbar.navbar-availbility', [
  'pascalprecht.translate',
  apiModule,
  profiteloWebsocketModule,
  errorHandlerModule,
  'profitelo.components.interface.preloader'
])
.component('navbarAvailbility', new NavbarAvailbilityComponent)
.service('navbarAvailbilityService', NavbarAvailbilityService)
.animation('.collapse-height', NavbarAvailbilityAnimation.getInstance())
  .name

export default navbarAvailbilityModule
