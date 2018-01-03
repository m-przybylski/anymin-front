import * as angular from 'angular'
import 'angular-permission'
import 'angular-ui-router'
const ngInfiniteScroll = require('ng-infinite-scroll')
import searchModule from '../../common/services/search/search'
import 'angularjs/common/components/interface/go-to-top/go-to-top'
import 'angularjs/common/components/search/single-consultation/single-consultation'
import 'angularjs/common/components/search/no-consultations/no-consultations'
import 'angularjs/common/components/search/search-filters/search-filters'
import 'angularjs/common/directives/pro-footer/pro-footer'
import 'angularjs/common/components/interface/preloader/preloader'
import 'angularjs/common/components/interface/preloader-container/preloader-container'
import communicatorModule from '../../common/components/communicator/communicator'
import navbarModule from '../../common/components/navbar/navbar'
import {SearchResultController} from './search-result.controller'

const searchResultPageModule = angular.module('profitelo.controller.search-result', [
  'ui.router',
  'permission',
  'permission.ui',
  ngInfiniteScroll,
  communicatorModule,
  navbarModule,
  'profitelo.components.interface.go-to-top',
  'profitelo.components.search.single-consultation',
  'profitelo.components.search.no-consultations',
  'profitelo.components.search.searchFilters',
  'profitelo.directives.pro-footer',
  'profitelo.components.interface.preloader',
  'profitelo.components.interface.preloader-container',
  searchModule,
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.search-result', {
    url: '/search-result?q&tags&serviceType&onlyAvailable&sortBy&languages&minPrice&maxPrice',
    template: require('./search-result.pug'),
    controller: 'searchResultController',
    controllerAs: 'vm',
    params: {
      tags: {
        array: true
      },
      languages: {
        array: true
      }
    },
    data: {
      pageTitle: 'PAGE_TITLE.SEARCH_RESULT'
    }
  })
})
.controller('searchResultController', SearchResultController)
  .name

export default searchResultPageModule
