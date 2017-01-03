(function() {
  function ProServiceProviderSummaryController() {

    this.deleteConsultation = (id, index)=> {
      this.deleteAction(id, index)
    }

    this.editConsultation = (id, name, price, tags)=> {
      this.editAction(id, name, price, tags)
    }

  }

  angular.module('profitelo.common.controller.service-provider.pro-service-provider-summary-controller', [])
    .controller('ProServiceProviderSummaryController', ProServiceProviderSummaryController)

}())