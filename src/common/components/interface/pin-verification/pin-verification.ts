namespace profitelo.components.interface.pinVerification {

  export class PinVerificationController implements ng.IController {

    /* @ngInject */
    constructor() {

    }
  }

  class PinVerificationComponent implements ng.IComponentOptions {

    controller: ng.Injectable<ng.IControllerConstructor> = PinVerificationController
    templateUrl: string = 'components/interface/pin-verification/pin-verification.tpl.html'
  }

  angular.module('profitelo.components.interface.pin-verification', [
    'pascalprecht.translate',
    'profitelo.directives.interface.pro-input'
  ])
  .component('pinVerification', new PinVerificationComponent())
}
