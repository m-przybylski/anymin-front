namespace profitelo.search {

  import ISearchUrlService = profitelo.services.searchUrl.ISearchUrlService
  import ISearchService = profitelo.services.search.ISearchService

  function SearchResultController($scope: ng.IScope, $state: ng.ui.IStateService, $location: ng.ILocationService,
                                  searchService: ISearchService, searchUrlService: ISearchUrlService) {

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
        $location.search(params)
      }
    })


    return this
  }


  angular.module('profitelo.controller.search-result', [
    'ui.router',
    'infinite-scroll',
    'profitelo.services.session',
    'profitelo.components.interface.go-to-top',
    'profitelo.components.search.single-consultation',
    'profitelo.components.search.no-consultations',
    'profitelo.components.search.searchFilters',
    'profitelo.directives.pro-footer',
    'profitelo.components.interface.preloader',
    'profitelo.components.interface.preloader-container',
    'profitelo.services.search',
    'profitelo.services.search-url'
  ])
    .config(($stateProvider: ng.ui.IStateProvider) => {
      $stateProvider.state('app.search-result', {
        url: '/search-result?q&tagId&category&categorySlug&profileType&onlyAvailable&sortBy&language',
        templateUrl: 'search/search-result.tpl.html',
        controller: 'SearchResultController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'PAGE_TITLE.SEARCH_RESULT'
        }
      })
    })
    .controller('SearchResultController', SearchResultController)

}
