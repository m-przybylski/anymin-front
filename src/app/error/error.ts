(function() {

  function ErrorController() {

    return this
  }


  angular.module('profitelo.controller.error', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.error', {
        templateUrl: 'error/error.tpl.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        data          : {
          access : UserRolesProvider.getAccessLevel('public')
        },
        resolve: {
          errorObj: [function() {
            return this.self.error
          }]
        }
      })
    })
    .controller('ErrorController', ErrorController)

}())
