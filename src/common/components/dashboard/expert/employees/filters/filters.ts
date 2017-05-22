import * as angular from 'angular'
import {ExpertEmployeesFiltersComponent} from './filters.component'
import 'angular-translate'
import './filters.sass'
import 'common/directives/interface/pro-checkbox/pro-checkbox';
import checkboxModule from '../../../../interface/checkbox/checkbox'

export interface IExpertEmployeesFiltersComponentBindings extends ng.IController {
}

const expertEmployeesFiltersModule = angular.module('profitelo.components.dashboard.expert.employees.filters', [
  'pascalprecht.translate',
  checkboxModule
])
  .component('expertEmployeesFilters', new ExpertEmployeesFiltersComponent())
  .name

export default expertEmployeesFiltersModule
