(function() {

  function SearchResultController($scope, $location, $timeout, $stateParams, $rootScope, searchService) {

    this.searchResults = {
      offset: 0,
      count: 0,
      results: []
    }

    this.searchParams = {}

    searchService.setSearchQueryParams(angular.extend({}, $stateParams, $location.search()))

    $scope.$on(
      '$destroy',
      $rootScope.$on('$locationChangeSuccess', () => {
        searchService.setSearchQueryParams($location.search())
      })
    )

    $scope.$on(
      '$destroy',
      $rootScope.$on('$stateChangeStart', (event, newState) => {
        if (newState.name !== 'app.search-result') {
          $timeout(() => $location.search({}))
        }
      })
    )

    searchService.onSearchResults($scope, (results) => {
      this.searchResults = results
    })

    this.tagsClick = (tag) => {
      $location.search('tagId', tag.id)
      $location.search('q', tag.name)
    }

    this.loadMore = () => {
      const countMax = this.searchResults.count
      const offset = this.searchResults.offset
      if (angular.isDefined(this.searchResults.results)) {
        const count = this.searchResults.results.length
        if (count < countMax) {
          $location.search('offset', count)
        }
      }
    }

    searchService.onQueryParamsChange($scope, (params) => {
      this.searchParams = params
      const currentParams = $location.search()
      angular.forEach(currentParams, (value, key) => {
        if (!params.hasOwnProperty(key)) {
          $location.search(key, null)
        }
      })
      angular.forEach(params, (value, key) => {
        if (angular.isDefined(value) && value !== null) {
          $location.search(key, value.toString())
        }
      })
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
    'profitelo.services.search'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.search-result', {
        url:          '/search-result',
        templateUrl:  'search/search-result.tpl.html',
        params: {
          q: undefined,
          tagId: undefined,
          category: undefined,
          categorySlug: undefined,
          profileType: undefined,
          onlyAvailable: false,
          sortBy: undefined,
          language: undefined,
          offset: undefined,
          limit: undefined
        },
        controller:   'SearchResultController',
        controllerAs: 'vm',
        data : {
          access : UserRolesProvider.getAccessLevel('public'),
          pageTitle: 'PAGE_TITLE.SEARCH_RESULT'
        }
      })
    })
    .controller('SearchResultController', SearchResultController)

}())
