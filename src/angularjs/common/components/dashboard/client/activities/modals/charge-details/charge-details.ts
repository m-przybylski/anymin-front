// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-method-signature
// tslint:disable:no-invalid-this
// tslint:disable:newline-before-return
// tslint:disable:deprecation
import * as angular from 'angular';
import { GetClientActivity, MoneyDto } from 'profitelo-api-ng/model/models';
import { StateService } from '@uirouter/angularjs';

export interface IClientChargeDetailsParentControllerScope extends ng.IScope {
  financeActivityDetails: GetClientActivity;
}

export interface IClientChargeDetailsControllerScope extends ng.IScope {
  isNavbar: boolean;
  isFullscreen: boolean;
  operation: MoneyDto;
  financialOperationId: string;
  paymentSystemName?: string;
  createdAt: Date;
  $parent: IClientChargeDetailsParentControllerScope;
  goToSettings: () => void;
  onModalClose: () => void;
}

function controller($scope: IClientChargeDetailsControllerScope, $state: StateService,
                    $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance): void {
  $scope.isNavbar = true;
  $scope.isFullscreen = true;

  if ($scope.$parent.financeActivityDetails.financialOperation) {
    $scope.operation = $scope.$parent.financeActivityDetails.financialOperation.operation;
    $scope.createdAt = $scope.$parent.financeActivityDetails.initializedAt;
    $scope.financialOperationId = $scope.$parent.financeActivityDetails.financialOperation.id;
    // TODO Wait for backend: https://git.contactis.pl/itelo/profitelo/issues/993
    // $scope.paymentSystemName = $scope.$parent.financeActivityDetails.financialOperation.paymentSystemName
  }
  else {
    throw Error('Wrong financeActivityDetails, financialOperation is missing.');
  }

  $scope.goToSettings = (): void => {
    $state.go('app.dashboard.settings.payments');
    $scope.onModalClose();
  };

  $scope.onModalClose = (): void =>
    $uibModalInstance.dismiss('cancel');
  return this;
}

angular.module('profitelo.components.dashboard.client.activities.modals.charge-details', [
  'ui.bootstrap',
  'profitelo.directives.interface.scrollable'
])
  .controller('clientChargeDetailsController', [
    '$scope', '$state', '$uibModalInstance', controller]);
