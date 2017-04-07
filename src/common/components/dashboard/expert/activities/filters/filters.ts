import * as angular from 'angular'
import 'angular-translate'
import {ExpertFiltersComponent} from './filters.component'

export interface IExpertFiltersComponentBindings extends ng.IController {
}

const expertFiltersModule = angular.module('profitelo.components.dashboard.expert.activities.filters', [
  'pascalprecht.translate'
])
  .component('expertFilters', new ExpertFiltersComponent())
  .name

export default expertFiltersModule
