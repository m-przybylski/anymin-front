import * as angular from 'angular';
import { NavbarHelpComponent } from './navbar-help.component';
import helpdeskModule from '../../../services/helpdesk/helpdesk';
import noResultsInformationModule from '../../dashboard/no-results-information/no-results-information';

export interface INavbarHelpComponentBindings extends ng.IController {
  onClick: () => void;
}

const navbarHelpModule = angular.module('profitelo.components.navbar.navbar-help', [
  'pascalprecht.translate',
  'profitelo.components.interface.preloader-container',
  helpdeskModule,
  noResultsInformationModule
])
.component('navbarHelp', new NavbarHelpComponent)
  .name;

export default navbarHelpModule;
