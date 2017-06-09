import * as angular from 'angular'
import {NavbarHelpComponent} from './navbar-help.component'
import './navbar-help.sass'

export interface INavbarHelpComponentBindings extends ng.IController {
  onClick: () => void
}

const navbarHelpModule = angular.module('profitelo.components.navbar.navbar-help', [
  'pascalprecht.translate'
])
.component('navbarHelp', new NavbarHelpComponent)
  .name

export default navbarHelpModule
