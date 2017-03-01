namespace profitelo.components.dashboard.chargeAccount.summaryChargeAccount {

  import MoneyDto = profitelo.api.MoneyDto
  export interface ISummaryChargeAccountComponentBindings {
    amount: MoneyDto
  }

  export class SummaryChargeAccountComponentController implements ng.IController, ISummaryChargeAccountComponentBindings {

    public amount: MoneyDto

    /* @ngInject */
    constructor() {
    }
  }

  class SummaryChargeAccountComponent implements ng.IComponentOptions {
    templateUrl: string =  'components/dashboard/charge-account/summary-charge-account/summary-charge-account.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = SummaryChargeAccountComponentController
    replace: true
    controllerAs: '$ctrl'
    bindings: {[boundProperty: string]: string} = {
      amount: '<'
    }
  }

  angular.module('profitelo.components.dashboard.charge-account.summary-charge-account', [
    'pascalprecht.translate',
    'profitelo.filters.money'
  ])
  .component('summaryChargeAccount', new SummaryChargeAccountComponent())

}
