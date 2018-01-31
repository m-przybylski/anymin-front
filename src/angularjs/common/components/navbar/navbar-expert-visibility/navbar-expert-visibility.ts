import * as angular from 'angular';
import { NavbarExpertVisibilityComponent } from './navbar-expert-visibility.component';
import { NavbarExpertVisibilityService } from './navbar-expert-visibility.service';
import apiModule from 'profitelo-api-ng/api.module';
import profiteloWebsocketModule from '../../../services/profitelo-websocket/profitelo-websocket';
import { NavbarExpertVisibilitAnimation } from './navbar-expert-visibility.animation';
import errorHandlerModule from '../../../services/error-handler/error-handler';

const navbarExperetVisibilityModule = angular.module('profitelo.components.navbar.navbar-expert-visibility', [
  'pascalprecht.translate',
  apiModule,
  profiteloWebsocketModule,
  errorHandlerModule,
  'profitelo.components.interface.preloader'
])
.component('navbarExpertVisibility', new NavbarExpertVisibilityComponent)
.service('navbarExpertVisibilityService', NavbarExpertVisibilityService)
.animation('.collapse-height', NavbarExpertVisibilitAnimation.getInstance())
  .name;

export default navbarExperetVisibilityModule;
