import * as angular from 'angular'
import {ExpertEmployeesFiltersComponent} from './filters.component'
import 'angular-translate'
import './filters.sass'
import checkboxModule from '../../../../interface/checkbox/checkbox'
import modalsModule from '../../../../../services/modals/modals'

export interface IExpertEmployeesFiltersComponentBindings extends ng.IController {
}

const expertEmployeesFiltersModule = angular.module('profitelo.components.dashboard.expert.employees.filters', [
  'pascalprecht.translate',
  checkboxModule,
  modalsModule
])
  .component('expertEmployeesFilters', new ExpertEmployeesFiltersComponent())
  .name

export default expertEmployeesFiltersModule
