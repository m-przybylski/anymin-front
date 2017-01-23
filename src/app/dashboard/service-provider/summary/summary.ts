(function() {
  function SummaryController() {

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary', [
    'ui.router',
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
      controllerAs: 'vm',
      data: {
        showMenu: false
      }
    })
  })
  .controller('SummaryController', SummaryController)

}())
