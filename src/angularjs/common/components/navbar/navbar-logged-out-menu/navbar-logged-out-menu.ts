import * as angular from 'angular'
import 'angular-ui-router'
import {NavbarLoggedOutMenuComponent} from './navbar-logged-out-menu.component'
import navbarHelpModule from '../navbar-help/navbar-help'

export interface INavbarLoggedOutMenuComponentBindings extends ng.IController {
}

const navbarLoggedOutMenuModule = angular.module('profitelo.components.navbar-logged-out-menu.component', [
  'pascalprecht.translate',
  'ui.router',
  navbarHelpModule
])
.component('navbarLoggedOutMenu', new NavbarLoggedOutMenuComponent)
  .name

export default navbarLoggedOutMenuModule
