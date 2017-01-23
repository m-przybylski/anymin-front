(function() {
  function ChoosePathController() {

    return this
  }

  angular.module('profitelo.controller.dashboard.service-provider.choose-path', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.services.resolvers.app.service-provider-choose-path'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.service-provider.choose-path', {
      url:          '/choose-path',
      templateUrl:  'dashboard/service-provider/choose-path/choose-path.tpl.html',
      controller:   'ChoosePathController',
      controllerAs: 'vm',
      resolve: {
        profileStatus: (AppServiceProviderChoosePathResolver) => {
          return AppServiceProviderChoosePathResolver.resolve()
        }
      },
      data : {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CHOOSE_PATH',
        showMenu: false
      }
    })
  })
  .controller('ChoosePathController', ChoosePathController)

}())
