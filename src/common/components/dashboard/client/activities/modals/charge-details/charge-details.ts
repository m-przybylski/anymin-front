import * as angular from 'angular'
import {GetActivity,  MoneyDto} from 'profitelo-api-ng/model/models'

export interface IClientChargeDetailsParentControllerScope extends ng.IScope {
  financeActivityDetails: GetActivity
}

export interface IClientChargeDetailsControllerScope extends ng.IScope {
  isNavbar: boolean
  isFullscreen: boolean
  operation: MoneyDto
  financialOperationId: string
  paymentSystemName?: string
  createdAt: Date
  $parent: IClientChargeDetailsParentControllerScope
}

function controller($scope: IClientChargeDetailsControllerScope, $state: ng.ui.IStateService,
                    $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance): void {
  $scope.isNavbar = true
  $scope.isFullscreen = true

  if ($scope.$parent.financeActivityDetails.financialOperation) {
    $scope.operation = $scope.$parent.financeActivityDetails.financialOperation.operation
    $scope.createdAt = $scope.$parent.financeActivityDetails.createdAt
    $scope.financialOperationId = $scope.$parent.financeActivityDetails.financialOperation.id
    $scope.paymentSystemName = $scope.$parent.financeActivityDetails.financialOperation.paymentSystemName
  }
  else {
    throw Error('Wrong financeActivityDetails, financialOperation is missing.')
  }

  $scope.goToSettings = (): void => {
    $state.go('app.dashboard.settings.payments')
    $scope.onModalClose()
  }

  $scope.onModalClose = (): void =>
    $uibModalInstance.dismiss('cancel')
  return this
}

angular.module('profitelo.components.dashboard.client.activities.modals.charge-details', [
  'ui.bootstrap',
  'profitelo.directives.interface.scrollable'
])
  .controller('clientChargeDetailsController', controller)
