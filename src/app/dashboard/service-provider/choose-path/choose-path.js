(function() {
  function ChoosePathController() {
    let vm = this


    return vm
  }

  angular.module('profitelo.controller.dashboard.service-provider.choose-path', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.service-provider.choose-path', {
      url:          '/choose-path',
      templateUrl:  'dashboard/service-provider/choose-path/choose-path.tpl.html',
      controller:   'ChoosePathController',
      controllerAs: 'vm',
      data          : {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CHOOSE_PATH'
      }
    })
  })
  .controller('ChoosePathController', ChoosePathController)

}())