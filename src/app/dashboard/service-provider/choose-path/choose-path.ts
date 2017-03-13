import * as angular from "angular"
import "angular-ui-router"
import {IServiceProviderChoosePathService} from "../../../../common/resolvers/service-provider-choose-path/service-provider-choose-path.service"
import "common/resolvers/service-provider-choose-path/service-provider-choose-path.service"

function ChoosePathController() {

  return this
}

angular.module('profitelo.controller.dashboard.service-provider.choose-path', [
  'ui.router',
  'profitelo.resolvers.service-provider-choose-path'
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.service-provider.choose-path', {
      url: '/choose-path',
      template: require('./choose-path.jade')(),
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
