import * as angular from 'angular'
import 'angularjs-slider'
import filtersModule from '../../../filters/filters'
import searchModule from '../../../services/search/search'
import 'common/directives/interface/pro-range-slider/pro-range-slider'
import 'common/directives/pro-tags-slider/pro-tags-slider'
import 'common/directives/interface/pro-switcher/pro-switcher'
import {default as commonConfigModule} from '../../../../../generated_modules/common-config/common-config'
import {SearchFiltersComponent} from './search-filter.component'

export interface ISearchFiltersComponentBindings {
  tags: string[]
}

angular.module('profitelo.components.search.searchFilters', [
  'rzModule',
  'ui.router',
  'pascalprecht.translate',
  'profitelo.directives.interface.pro-range-slider',
  'profitelo.directives.pro-tags-slider',
  'profitelo.directives.interface.pro-switcher',
  searchModule,
  commonConfigModule,
  filtersModule
])
.component('searchFilters', new SearchFiltersComponent())
