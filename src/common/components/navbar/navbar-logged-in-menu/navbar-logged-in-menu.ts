import * as angular from 'angular'
import 'angular-ui-router'
import {NavbarLoggedInMenuComponent} from './navbar-logged-in-menu.component'
import navbarNotificationsModule from '../navbar-notifications/navbar-notifications'
import navbarHelpModule from '../navbar-help/navbar-help'
import translatorModule from '../../../services/translator/translator'
import navbarAvailbilityModule from '../navbar-availbility/navbar-availbility'

export interface INavbarLoggedInMenuComponentBindings extends ng.IController {}

const navbarLoggedInMenuModule = angular.module('profitelo.components.navbar-logged-in-menu.component', [
  'pascalprecht.translate',
  'ui.router',
  translatorModule,
  navbarNotificationsModule,
  navbarHelpModule,
  navbarAvailbilityModule
])
.component('navbarLoggedInMenu', new NavbarLoggedInMenuComponent)
  .name

export default navbarLoggedInMenuModule
