import * as angular from "angular"
import "angular-permission"
import "angular-ui-router"
const ngInfiniteScroll = require('ng-infinite-scroll')
import {SearchService} from "../../common/services/search/search.service"
import {SearchUrlService} from "../../common/services/search-url/search-url.service"
import searchModule from "../../common/services/search/search"
import searchUrlModule from "../../common/services/search-url/search-url"
import "common/components/interface/go-to-top/go-to-top"
import "common/components/search/single-consultation/single-consultation"
import "common/components/search/no-consultations/no-consultations"
import "common/components/search/search-filters/search-filters"
import "common/directives/pro-footer/pro-footer"
import "common/components/interface/preloader/preloader"
import "common/components/interface/preloader-container/preloader-container"
import communicatorModule from "../../common/components/communicator/communicator"

/* @ngInject */
function SearchResultController($scope: ng.IScope, $location: ng.ILocationService,
                                searchService: SearchService, $state: ng.ui.IStateService,
                                searchUrlService: SearchUrlService) {

  this.searchParams = $location.search()
  this.searchResults = {
    offset: 0,
    count: 0,
    results: []
  }

  this.isSearchLoading = true
  this.isSearchError = false
  this.isLoadMoreLoading = false
  this.isLoadMoreError = false

  searchService.onSearchResults($scope, (err, searchResults, prevResults) => {
    if (prevResults) {
      if (!err) {
        searchResults.results = this.searchResults.results.concat(searchResults.results)
        this.searchResults = searchResults
      } else {
        this.isLoadMoreError = true
      }
      this.isLoadMoreLoading = false
    } else {
      if (!err) {
        this.searchResults = searchResults
      } else {
        this.isSearchError = true
      }

      this.isSearchLoading = false
    }
  })

  searchService.setSearchQueryParams(this.searchParams)

  const _loadMore = () => {
    if (this.searchResults && angular.isDefined(this.searchResults.results) && !this.isLoadMoreLoading) {
      const countMax = this.searchResults.count
      const count = this.searchResults.results.length
      if (count < countMax) {
        this.isLoadMoreLoading = true
        this.isLoadMoreError = false
        searchService.setSearchQueryParams(angular.extend($location.search(), {offset: count}))
      }
    }
  }

  this.loadMoreOnScroll = () => {
    if (!this.isLoadMoreError) {
      _loadMore()
    }
  }

  this.loadMoreOnClick = () => {
    this.isLoadMoreError = false
    _loadMore()
  }

  this.setSearchParams = (params: any) => {
    this.isSearchLoading = true
    searchService.setSearchQueryParams(angular.extend($location.search(), params[0]))
  }

  searchService.onQueryParamsChange($scope, (queryParams) => {
    const params = searchUrlService.parseParamsForUrl(queryParams)
    if ($state.current.name === 'app.search-result') {
      $state.transitionTo('app.search-result', queryParams, {
        location: true,
        inherit: true,
        relative: $state.$current,
        notify: false
      })

    }
  })


  return this
}

const searchResultPageModule = angular.module('profitelo.controller.search-result', [
  'ui.router',
  'permission',
  'permission.ui',
  ngInfiniteScroll,
  communicatorModule,
  'profitelo.components.interface.go-to-top',
  'profitelo.components.search.single-consultation',
  'profitelo.components.search.no-consultations',
  'profitelo.components.search.searchFilters',
  'profitelo.directives.pro-footer',
  'profitelo.components.interface.preloader',
  'profitelo.components.interface.preloader-container',
  searchModule,
  searchUrlModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.search-result', {
      url: '/search-result?q&tagId&category&categorySlug&profileType&onlyAvailable&sortBy&language',
      template: require('./search-result.jade')(),
      controller: 'SearchResultController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'PAGE_TITLE.SEARCH_RESULT'
      }
    })
  })
  .controller('SearchResultController', SearchResultController)
  .name

export default searchResultPageModule
