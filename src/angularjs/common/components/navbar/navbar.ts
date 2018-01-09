import * as angular from 'angular'
import {NavbarComponent} from './navbar.component'
import navbarLoggedInMenuModule from './navbar-logged-in-menu/navbar-logged-in-menu'
import navbarLoggedOutMenuModule from './navbar-logged-out-menu/navbar-logged-out-menu'
import userModule from '../../services/user/user'
import searchDropdownModule from '../search-dropdown/search-dropdown'
import uiRouter from '@uirouter/angularjs';

export interface INavbarComponentBindings extends ng.IController {
  searchInputQueryValue: string
}

const navbarModule = angular.module('profitelo.components.navbar', [
  'pascalprecht.translate',
    userModule,
  uiRouter,
  searchDropdownModule,
  navbarLoggedInMenuModule,
  navbarLoggedOutMenuModule
])
.component('navbar', new NavbarComponent)
  .name

export default navbarModule
