
(function() {

  /* @ngInject */
  function proFinanceControllers($scope, $element) {
    return this
  }

  let proFinance = {
    templateUrl: 'components/dashboard/pro-finance/pro-finance.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      invitation: '<',
      employment: '<'
    },
    controller: proFinanceControllers,
    controllerAs: 'vm'
  }


  angular.module('profitelo.components.dashboard.pro-finance', [
    
  ])
    .component('proFinance', proFinance)

}())
