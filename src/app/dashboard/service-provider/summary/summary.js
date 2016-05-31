(function() {
  function SummaryController() {
    let vm = this
    vm.consultation = {
      name: ['Rozliczanie i optymalizacja podatków.', 'Naprawa komputerów i laptopów'],
      cost: ['9', '19'],
      tags: [['New Pedro', 'West Ceasar', 'East Douglas'], ['Philippines', 'Dickinsonmoth', 'West Ceasar']]
    }
    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-summary-head',
    'profitelo.directives.service-provider.pro-service-provider-summary-step'
  ])
  .config(function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.summary', {
      url:          '/summary',
      templateUrl:  'dashboard/service-provider/summary/summary.tpl.html',
      controller:   'SummaryController',
      controllerAs: 'vm'
    })
  })
  .controller('SummaryController', SummaryController)

}())
