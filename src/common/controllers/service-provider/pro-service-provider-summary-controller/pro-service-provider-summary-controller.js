(function() {
  function ProServiceProviderSummaryController($scope) {
    let vm = this

    vm.deleteConsultation = (id, index)=> {
      vm.deleteAction(id, index)
    }
    vm.editConsultation = (id, name, price, tags)=> {
      vm.editAction(id, name, price, tags)
    }

    return vm
  }


  angular.module('profitelo.common.controller.service-provider.pro-service-provider-summary-controller', [])
    .controller('ProServiceProviderSummaryController', ProServiceProviderSummaryController)

}())