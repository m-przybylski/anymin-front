// tslint:disable:no-import-side-effect
// tslint:disable:deprecation
import * as angular from 'angular';
import '../../../../../../components/braintree-form/braintree-form';
import '../../../../../../components/interface/preloader/preloader';
import '../../../../../../directives/interface/scrollable/scrollable';

export interface IAddPaymentMethodControllerScope extends ng.IScope {
  callback: () => void;
}

// tslint:disable:member-ordering
export class AddPaymentMethodController implements ng.IController {

  public isNavbar = true;
  public isFullscreen = true;
  public onBraintreeFormLoad = false;

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  public onLoad = (): void => {
    this.onBraintreeFormLoad = true;
  }

  public onFormSucceed = (): void => {
    this.$scope.callback();
    this.$uibModalInstance.dismiss('cancel');
  }
  public static $inject = ['$uibModalInstance', '$scope'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $scope: IAddPaymentMethodControllerScope) {

  }
}

angular.module('profitelo.components.dashboard.settings.modals.payments.add-payment-method', [
  'ui.bootstrap',
  'profitelo.components.braintree-form',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable'
])
  .controller('addPaymentMethodController', AddPaymentMethodController);
