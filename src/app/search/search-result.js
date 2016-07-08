(function() {

  function SearchResultController() {


    this.model = {
      sortModel: '',
      languagesModel: '',
      categoryModel: '',
      switcherModel: false,
      tagsModel: [{name: 'asasas', id: 1}],
      minRange: 0,
      maxRange: 100
    }

    this.tagsClick = (id)=> {

    }

    return this
  }


  angular.module('profitelo.controller.search-result', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.directives.search.single-consultation',
    'profitelo.directives.search.search-filter',
    'profitelo.directives.pro-footer'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.search-result', {
        url:          '/search-result',
        templateUrl:  'search/search-result.tpl.html',
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
