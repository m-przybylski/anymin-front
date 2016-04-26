(function() {
  function ChoosePathController() {
    let vm = this


    return vm
  }

  angular.module('profitelo.controller.dashboard.service-provider.choose-path', [
    'ui.router',
    'profitelo.services.service-provider-state'
  ])
  .config( function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.choose-path', {
      url:          '/choose-path',
      templateUrl:  'dashboard/service-provider/choose-path/choose-path.tpl.html',
      controller:   'ChoosePathController',
      controllerAs: 'vm'
    })
  })
  .controller('ChoosePathController', ChoosePathController)

}())