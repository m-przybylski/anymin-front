(function() {
  function IndividualPathController() {
    let vm = this


    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.individual-path', [
    'ui.router',
    'profitelo.services.service-provider-state'
  ])
  .config( function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.individual-path', {
      abstract:     true,
      url:          '/individual-path',
      templateUrl:  'dashboard/service-provider/individual-path/individual-path.tpl.html',
      controller:   'IndividualPathController',
      controllerAs: 'vm'
    })
  })
  .controller('IndividualPathController', IndividualPathController)

}())