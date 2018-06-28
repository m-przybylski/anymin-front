// tslint:disable:new-parens
import * as angular from 'angular';
import { SearchDropdownComponent } from './search-dropdown.component';
import searchModule from '../../services/search/search';
import filtersModule from '../../filters/filters';
import uiRouter from '@uirouter/angularjs';

const searchDropdownModule = angular.module('profitelo.components.search-dropdown', [
  uiRouter,
  searchModule,
    'profitelo.components.interface.preloader',
  filtersModule
])
.component('searchDropdown', new SearchDropdownComponent)
  .name;

export default searchDropdownModule;
