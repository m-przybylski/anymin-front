namespace profitelo.dashboard.serviceProvider.choosePath {

  import IServiceProviderChoosePathService = profitelo.resolvers.serviceProviderChoosePath.IServiceProviderChoosePathService

  function ChoosePathController() {

    return this
  }

  angular.module('profitelo.controller.dashboard.service-provider.choose-path', [
    'ui.router',
    'profitelo.services.session',
    'profitelo.resolvers.service-provider-choose-path'
  ])
    .config(function ($stateProvider: ng.ui.IStateProvider) {
      $stateProvider.state('app.dashboard.service-provider.choose-path', {
        url: '/choose-path',
        templateUrl: 'dashboard/service-provider/choose-path/choose-path.tpl.html',
        controller: 'ChoosePathController',
        controllerAs: 'vm',
        resolve: {
          profileStatus: (ServiceProviderChoosePathResolver: IServiceProviderChoosePathService) => {
            return ServiceProviderChoosePathResolver.resolve()
          }
        },
        data: {
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CHOOSE_PATH',
          showMenu: false
        }
      })
    })
    .controller('ChoosePathController', ChoosePathController)
}


