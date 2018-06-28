// tslint:disable:readonly-array
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
import * as angular from 'angular';
import 'angularjs-slider';
import filtersModule from '../../../filters/filters';
import searchModule from '../../../services/search/search';
import 'angularjs/common/directives/interface/pro-range-slider/pro-range-slider';
import 'angularjs/common/directives/pro-tags-slider/pro-tags-slider';
import 'angularjs/common/directives/interface/pro-switcher/pro-switcher';
import { SearchFiltersComponent } from './search-filter.component';
import translatorModule from '../../../services/translator/translator';
import uiRouter from '@uirouter/angularjs';

export interface ISearchFiltersComponentBindings {
  tags: string[];
}

angular.module('profitelo.components.search.searchFilters', [
  'rzModule',
  uiRouter,
  'pascalprecht.translate',
  'profitelo.directives.interface.pro-range-slider',
  'profitelo.directives.pro-tags-slider',
  'profitelo.directives.interface.pro-switcher',
  searchModule,
  translatorModule,
  filtersModule
])
  .component('searchFilters', new SearchFiltersComponent());
