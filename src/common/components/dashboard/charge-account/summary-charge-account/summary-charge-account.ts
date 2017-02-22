namespace profitelo.components.dashboard.chargeAccount.summaryChargeAccount {

  export class SummaryChargeAccountComponentController implements ng.IController {

    /* @ngInject */
    constructor() {
    }
  }

  class SummaryChargeAccountComponent implements ng.IComponentOptions {
    templateUrl: string =  'components/dashboard/charge-account/summary-charge-account/summary-charge-account.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = SummaryChargeAccountComponentController
    replace: true
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.charge-account.summary-charge-account', [
    'pascalprecht.translate'
  ])
  .component('summaryChargeAccount', new SummaryChargeAccountComponent())

}
