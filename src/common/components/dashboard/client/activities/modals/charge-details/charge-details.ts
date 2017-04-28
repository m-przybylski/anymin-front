import * as angular from 'angular'
import {GetActivity,  MoneyDto} from 'profitelo-api-ng/model/models'

export interface ClientChargeDetailsParentControllerScope extends ng.IScope {
  financeActivityDetails: GetActivity
}


export interface ClientChargeDetailsControllerScope extends ng.IScope {
  isNavbar: boolean
  isFullscreen: boolean
  operation: MoneyDto
  financialOperationId: string
  createdAt: Date
  $parent: ClientChargeDetailsParentControllerScope
}

function controller($scope: ClientChargeDetailsControllerScope, $state: ng.ui.IStateService,
                    $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
  $scope.isNavbar = true
  $scope.isFullscreen = true

  if ($scope.$parent.financeActivityDetails.financialOperation) {
    $scope.operation = $scope.$parent.financeActivityDetails.financialOperation.operation
    $scope.createdAt = $scope.$parent.financeActivityDetails.createdAt
    $scope.financialOperationId = $scope.$parent.financeActivityDetails.financialOperation.id
  }
  else {
    throw Error('Wrong financeActivityDetails, financialOperation is missing.')
  }

  $scope.goToSettings = () => {
    $state.go('app.dashboard.settings.payments')
    $scope.onModalClose()
  }

  $scope.onModalClose = () =>
    $uibModalInstance.dismiss('cancel')
  return this
}

angular.module('profitelo.components.dashboard.client.activities.modals.charge-details', [
  'ui.bootstrap',
  'profitelo.directives.interface.scrollable'
])
  .controller('clientChargeDetailsController', controller)
