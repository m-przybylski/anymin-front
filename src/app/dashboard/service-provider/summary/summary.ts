(function() {
  function SummaryController() {

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary', [
    'ui.router',
    'profitelo.directives.service-provider.pro-service-provider-summary-step',
    'profitelo.services.session',
    'profitelo.api.ServiceApi',
    'profitelo.directives.interface.pro-alert'
  ])
  .config(($stateProvider: ng.ui.IStateProvider) => {
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
