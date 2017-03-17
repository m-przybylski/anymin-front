import * as angular from 'angular'
import './seconds-to-datetime'
import './object-size-filter'
import './normalize-translation-key-filter'
import './search-bold-filter/search-bold'
import './rank-search/rank-search'
import './ms-to-date/msToDate'
import './money/money-filter'
import './message/message-filter'
import './input-filter/semicolon-to-comma-input-filter'

const filtersModule  = angular.module('profitelo.filters', [
  'profitelo.filters.seconds-to-datetime',
  'profitelo.filters.object-size-filter',
  'profitelo.filters.normalize-translation-key-filter',
  'profitelo.filters.search-bold-filter',
  'profitelo.filters.rankSearch',
  'profitelo.filters.milliseconds-to-datetime',
  'profitelo.filters.money',
  'profitelo.filters.message-filter',
  'profitelo.filters.input-filter.semicolon-to-comma-input-filter'
])
.name

export default filtersModule;
