import * as angular from 'angular'
import {SearchDropdownComponent} from './search-dropdown.component'
import searchModule from '../../services/search/search'
import filtersModule from '../../filters/filters'

const searchDropdownModule = angular.module('profitelo.components.search-dropdown', [
  'commonConfig',
  searchModule,
  'ui.router',
  'profitelo.components.interface.preloader',
  filtersModule
])
.component('searchDropdown', new SearchDropdownComponent)
  .name

export default searchDropdownModule
