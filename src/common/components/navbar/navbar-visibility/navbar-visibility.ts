import * as angular from 'angular'
import {NavbarVisibilityComponent} from './navbar-visibility.component'
import './navbar-visibility.sass'
import {NavbarVisibilityService} from './navbar-visibility.service'
import apiModule from 'profitelo-api-ng/api.module'
import profiteloWebsocketModule from '../../../services/profitelo-websocket/profitelo-websocket'
import {NavbarVisibilitAnimation} from './navbar-visibility.animation'
import errorHandlerModule from '../../../services/error-handler/error-handler'

const navbarVisibilityModule = angular.module('profitelo.components.navbar.navbar-visibility', [
  'pascalprecht.translate',
  apiModule,
  profiteloWebsocketModule,
  errorHandlerModule,
  'profitelo.components.interface.preloader'
])
.component('navbarVisibility', new NavbarVisibilityComponent)
.service('navbarVisibilityService', NavbarVisibilityService)
.animation('.collapse-height', NavbarVisibilitAnimation.getInstance())
  .name

export default navbarVisibilityModule
