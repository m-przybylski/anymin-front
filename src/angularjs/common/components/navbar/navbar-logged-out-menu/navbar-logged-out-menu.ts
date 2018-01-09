import * as angular from 'angular'
import {NavbarLoggedOutMenuComponent} from './navbar-logged-out-menu.component'
import navbarHelpModule from '../navbar-help/navbar-help'
import uiRouter from '@uirouter/angularjs';

export interface INavbarLoggedOutMenuComponentBindings extends ng.IController {
}

const navbarLoggedOutMenuModule = angular.module('profitelo.components.navbar-logged-out-menu.component', [
  'pascalprecht.translate',
    uiRouter,
    navbarHelpModule
])
.component('navbarLoggedOutMenu', new NavbarLoggedOutMenuComponent)
  .name

export default navbarLoggedOutMenuModule
