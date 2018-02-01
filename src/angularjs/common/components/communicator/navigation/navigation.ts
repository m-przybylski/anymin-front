import * as angular from 'angular';
import { NavigationComponent } from './navigation.component';
import translatorModule from '../../../services/translator/translator';

const navigationModule = angular.module('profitelo.components.communicator.navigation', [
  'pascalprecht.translate',
  translatorModule
])
  .component('communicatorNav', new NavigationComponent)
  .name;

export default navigationModule;
