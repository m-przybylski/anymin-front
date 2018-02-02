import * as angular from 'angular';
import { NavigationComponent } from './navigation.component';
import modalsModule from '../../../services/modals/modals';

const navigationModule = angular.module('profitelo.components.communicator.navigation', [
  'pascalprecht.translate',
  modalsModule
])
  .component('communicatorNav', new NavigationComponent)
  .name;

export default navigationModule;
