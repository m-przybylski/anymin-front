(function() {
  function SummaryController() {

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-summary-head',
    'profitelo.directives.service-provider.pro-service-provider-summary-step',
    'c7s.ng.userAuth',
    'profitelo.swaggerResources',
    'profitelo.directives.interface.pro-alert'
  ])
  .config(function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.summary', {
      abstract:     true,
      url:          '/summary',
      template:     '<div data-ui-view=""></div>',
      controller:   'SummaryController',
      controllerAs: 'vm'
    })
  })
  .controller('SummaryController', SummaryController)

}())
