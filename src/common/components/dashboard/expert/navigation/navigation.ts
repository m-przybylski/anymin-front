import * as angular from 'angular'
import 'angular-translate'
import {ExpertNavigationComponent} from './navigation.component'
import './navigation.sass'

export interface IExpertNavigationComponentBindings extends ng.IController {
}

const expertNavigationModule = angular.module('profitelo.components.dashboard.expert.navigation', [
  'pascalprecht.translate'
])
  .component('expertNavigation', new ExpertNavigationComponent())
  .name

export default expertNavigationModule
