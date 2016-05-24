(function() {
  function ServiceProviderStepController($scope, $timeout, $rootScope, smoothScrolling) {

    let vm = this

    let shadowModel = null

    function saveShadowModel() {
      shadowModel = angular.copy($scope.model)
    }

    function restoreShadowModel() {
      $scope.model = angular.copy(shadowModel)
      shadowModel = null
    }

    let _manualOrderChangeRequestHandle = (targetStep) => {
      restoreShadowModel()
      $rootScope.$broadcast('manualOrderChangeRequestGrant', targetStep)
    }

    $scope.proceed = () => {
      if ($scope.queue.completedSteps < $scope.order) {
        $scope.queue.completedSteps = $scope.order

      }
      $scope.queue.currentStep = $scope.order + 1
      if ($scope.queue.currentStep <= $scope.queue.amountOfSteps) {
        $timeout(()=>{
          smoothScrolling.scrollTo($scope.queue.currentStep)
        })
      }

    }

    $scope.skip = () => {
      if (shadowModel !== null) {
        restoreShadowModel()
      }

      $scope.queue.skippedSteps[$scope.order] = true
      $scope.proceed()
    }

    $scope.saveStep = () => {
      $scope.queue.skippedSteps[$scope.order] = false
      $scope.saveSection()
      $scope.proceed()
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
    'profitelo.directives.services.smooth-scrolling'
  ])
  .controller('ServiceProviderStepController', ServiceProviderStepController)

}())
