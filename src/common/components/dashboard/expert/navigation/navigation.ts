import * as angular from 'angular'
import 'angular-translate'
import {ExpertNavigationComponent} from './navigation.component'
import './navigation.sass'
import apiModule from 'profitelo-api-ng/api.module'
import filtersModule from '../../../../filters/filters'

export interface IExpertNavigationComponentBindings extends ng.IController {
}

const expertNavigationModule = angular.module('profitelo.components.dashboard.expert.navigation', [
  'pascalprecht.translate',
  filtersModule,
  apiModule
])
  .component('expertNavigation', new ExpertNavigationComponent())
  .name

export default expertNavigationModule
