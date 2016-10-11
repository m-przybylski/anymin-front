(function() {

  function SearchResultController($scope, $state, $location, $timeout, searchService, searchUrlService) {

    this.searchParams = $location.search()
    this.searchResults = {
      offset: 0,
      count: 0,
      results: []
    }

    $timeout(() => {
      this.isSearchLoading = true
    })
    this.isSearchError = false
    this.isLoadMoreLoading = false
    this.isLoadMoreError = false
    this.isPending = false

    searchService.setSearchQueryParams(this.searchParams)

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

    this.tagsClick = (tag) => {
      $state.go('app.search-result', {tagId: tag.id, q: tag.name})
    }

    const _loadMore = () => {
      const countMax = this.searchResults.count
      if (angular.isDefined(this.searchResults.results) && !this.isLoadMoreLoading) {
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


    searchService.onQueryParamsChange($scope, (queryParams) => {
      const params = searchUrlService.parseParamsForUrl(queryParams)

      $location.search({})
      if ($state.current.name === 'app.search-result') {
        angular.forEach(params, (value, key) => {
          $location.search(key, value)
        })
      }
    })

    return this
  }


  angular.module('profitelo.controller.search-result', [
    'ui.router',
    'infinite-scroll',
    'c7s.ng.userAuth',
    'profitelo.components.search.single-consultation',
    'profitelo.components.search.no-consultations',
    'profitelo.directives.search.search-filters',
    'profitelo.directives.pro-footer',
    'profitelo.components.interface.preloader',
    'profitelo.components.interface.preloader-container',
    'profitelo.services.search',
    'profitelo.services.search-url'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.search-result', {
        url: '/search-result?q&tagId&category&categorySlug&profileType&onlyAvailable&sortBy&language',
        reloadOnSearch: true,
        reload: true,
        templateUrl: 'search/search-result.tpl.html',
        controller: 'SearchResultController',
        controllerAs: 'vm',
        data: {
          access: UserRolesProvider.getAccessLevel('public'),
          pageTitle: 'PAGE_TITLE.SEARCH_RESULT'
        }
      })
    })
    .controller('SearchResultController', SearchResultController)

}())
