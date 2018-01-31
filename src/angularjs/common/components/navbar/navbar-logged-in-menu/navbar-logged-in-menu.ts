import * as angular from 'angular';
import { NavbarLoggedInMenuComponent } from './navbar-logged-in-menu.component';
import navbarNotificationsModule from '../navbar-notifications/navbar-notifications';
import navbarHelpModule from '../navbar-help/navbar-help';
import translatorModule from '../../../services/translator/translator';
import navbarExperetVisibilityModule from '../navbar-expert-visibility/navbar-expert-visibility';
import uiRouter from '@uirouter/angularjs';

export interface INavbarLoggedInMenuComponentBindings extends ng.IController {}

const navbarLoggedInMenuModule = angular.module('profitelo.components.navbar-logged-in-menu.component', [
  'pascalprecht.translate',
    translatorModule,
  uiRouter,
  navbarNotificationsModule,
  navbarHelpModule,
  navbarExperetVisibilityModule
])
.component('navbarLoggedInMenu', new NavbarLoggedInMenuComponent)
  .name;

export default navbarLoggedInMenuModule;
