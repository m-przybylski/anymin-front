import * as angular from 'angular'
import 'angular-ui-router'
import {NavbarLoggedInMenuComponent} from './navbar-logged-in-menu.component'
import navbarNotificationsModule from '../navbar-notifications/navbar-notifications'
import navbarHelpModule from '../navbar-help/navbar-help'

export interface INavbarLoggedInMenuComponentBindings extends ng.IController {}

const navbarLoggedInMenuModule = angular.module('profitelo.components.navbar-logged-in-menu.component', [
  'pascalprecht.translate',
  'ui.router',
  navbarNotificationsModule,
  navbarHelpModule
])
.component('navbarLoggedInMenu', new NavbarLoggedInMenuComponent)
  .name

export default navbarLoggedInMenuModule
