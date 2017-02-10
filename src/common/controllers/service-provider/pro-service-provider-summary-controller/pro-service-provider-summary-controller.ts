(function () {
  function ProServiceProviderSummaryController() {

    this.deleteConsultation = (id: string, index: number) => {
      this.deleteAction(id, index)
    }

    this.editConsultation = (id: string, name: string, price: number, tags: Array<any>) => {
      this.editAction(id, name, price, tags)
    }

  }

  angular.module('profitelo.common.controller.service-provider.pro-service-provider-summary-controller', [])
    .controller('ProServiceProviderSummaryController', ProServiceProviderSummaryController)

}())
