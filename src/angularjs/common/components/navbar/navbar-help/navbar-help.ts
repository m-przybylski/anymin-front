import * as angular from 'angular'
import {NavbarHelpComponent} from './navbar-help.component'
import helpdeskModule from '../../../services/helpdesk/helpdesk'

export interface INavbarHelpComponentBindings extends ng.IController {
  onClick: () => void
}

const navbarHelpModule = angular.module('profitelo.components.navbar.navbar-help', [
  'pascalprecht.translate',
  helpdeskModule
])
.component('navbarHelp', new NavbarHelpComponent)
  .name

export default navbarHelpModule
