(function() {
  function ServiceProviderStepController($scope, $rootScope) {
    
    let vm = this

    let shadowModel

    function saveShadowModel() {
      shadowModel = angular.copy($scope.model)
    }

    function restoreShadowModel() {
      $scope.model = angular.copy(shadowModel)
    }
    
    let _manualOrderChangeRequestHandle = (targetStep) => {
      restoreShadowModel()
      $rootScope.$broadcast('manualOrderChangeRequestGrant', targetStep)
    }
    
    $scope.onClick = () => {
      $rootScope.$broadcast('manualOrderChangeRequest', $scope.order)
    }

    $scope.$on('manualOrderChangeRequestGrant', (event, targetStep) => {
      if ($scope.order === targetStep) {
        saveShadowModel()
        $scope.queue.currentStep = $scope.order
      }
    })

    $scope.$on('manualOrderChangeRequest', (event, targetStep) => {
      if ($scope.order === $scope.queue.currentStep && targetStep !== $scope.order) {
        _manualOrderChangeRequestHandle(targetStep)
      }
    })

    return vm
  }


  angular.module('profitelo.common.controller.service-provider.service-provider-step-controller', [
  ])
  .controller('ServiceProviderStepController', ServiceProviderStepController)

}())