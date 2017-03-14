import * as angular from "angular"
import {NavbarComponent} from "./navbar.component"
import {SessionService} from "../../services/session/session.service"
import "angular-ui-router"

export interface INavbarComponentBindings extends ng.IController {
  logoutAction: any
}

const navbarModule = angular.module('profitelo.components.navbar', [
  'pascalprecht.translate',
  'ui.router'
])
.component('navbar', new NavbarComponent)
  .service('sessionService', SessionService)
  .name

export default navbarModule
