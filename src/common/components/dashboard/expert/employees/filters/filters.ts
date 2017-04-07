import * as angular from 'angular'
import {ExpertEmployeesFiltersComponent} from './filters.component'
import 'angular-translate'
import './filters.sass'
import 'common/directives/interface/pro-checkbox/pro-checkbox';

export interface IExpertEmployeesFiltersComponentBindings extends ng.IController {
}

const expertEmployeesFiltersModule = angular.module('profitelo.components.dashboard.expert.employees.filters', [
  'pascalprecht.translate',
  'profitelo.directives.interface.pro-checkbox'
])
  .component('expertEmployeesFilters', new ExpertEmployeesFiltersComponent())
  .name

export default expertEmployeesFiltersModule
