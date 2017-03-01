(function() {

  function ErrorController() {

    return this
  }


  angular.module('profitelo.controller.error', [
    'ui.router',
    'profitelo.services.session'
  ])
    .config( function($stateProvider: ng.ui.IStateProvider) {
      $stateProvider.state('app.error', {
        templateUrl: 'error/error.tpl.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        data: {
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
