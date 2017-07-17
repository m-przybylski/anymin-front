import * as angular from 'angular'
import {NavigationComponent} from './navigation.component';

const navigationModule = angular.module('profitelo.components.communicator.navigation', [
  'pascalprecht.translate'
])
  .component('communicatorNav', new NavigationComponent)
  .name

export default navigationModule
