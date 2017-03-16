import * as angular from "angular"
import "./choose-path/choose-path"
import "./individual-path/individual-path"
import "./company-path/company-path"
import "./consultation-range/consultation-range"
import "./summary/summary"

function ServiceProviderController() {

  this.onClose = () => {

  }

  return this
}

angular.module('profitelo.controller.dashboard.service-provider', [
  'ui.router',
  'profitelo.controller.dashboard.service-provider.choose-path',
  'profitelo.controller.dashboard.service-provider.individual-path',
  'profitelo.controller.dashboard.service-provider.company-path',
  'profitelo.controller.dashboard.service-provider.consultation-range',
  'profitelo.controller.dashboard.service-provider.summary'
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.service-provider', {
      abstract: true,
      url: '/service-provider',
      template: require('./service-provider.pug')(),
      controller: 'ServiceProviderController',
      controllerAs: 'serviceProviderController',
      data: {}
    })
  })
  .controller('ServiceProviderController', ServiceProviderController)
