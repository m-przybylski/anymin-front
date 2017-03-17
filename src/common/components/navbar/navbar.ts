import * as angular from 'angular'
import {NavbarComponent} from './navbar.component'
import 'angular-ui-router'
import navbarLoggedInMenuModule from './navbar-logged-in-menu/navbar-logged-in-menu'
import navbarLoggedOutMenuModule from './navbar-logged-out-menu/navbar-logged-out-menu'
import './navbar.sass'

export interface INavbarComponentBindings extends ng.IController {
  searchModel: string
}

const navbarModule = angular.module('profitelo.components.navbar', [
  'pascalprecht.translate',
  'ui.router',
  navbarLoggedInMenuModule,
  navbarLoggedOutMenuModule
])
.component('navbar', new NavbarComponent)
  .name

export default navbarModule
