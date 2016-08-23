(function() {

  function SearchResultController($scope, $location, $stateParams, $rootScope, searchService) {

    this.searchResults = {}

    searchService.setSearchQueryParams(angular.extend({}, $stateParams, $location.search()))

    $scope.$on(
      '$destroy',
      $rootScope.$on('$locationChangeSuccess', () => {
        searchService.setSearchQueryParams($location.search())
      })
    )

    searchService.onSearchResults($scope, (results) => {
      this.searchResults = results
    })

    searchService.onQueryParamsChange($scope, (params) => {
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
    'c7s.ng.userAuth',
    'profitelo.components.search.single-consultation',
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
