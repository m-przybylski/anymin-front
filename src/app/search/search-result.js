(function() {

  function SearchResultController() {


    return this
  }


  angular.module('profitelo.controller.search-result', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.directives.search.search-filters'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.search-result', {
        url:          '/search-result',
        templateUrl:  'search/search-result.tpl.html',
        controller:   'SearchResultController',
        controllerAs: 'SearchResultController',
        data : {
          access : UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.SEARCH_RESULT'
        }
      })
    })
    .controller('SearchResultController', SearchResultController)

}())