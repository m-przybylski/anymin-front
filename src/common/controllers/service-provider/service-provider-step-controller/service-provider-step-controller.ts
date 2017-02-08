(function() {
  function ServiceProviderStepController($scope, $timeout: ng.ITimeoutService, $rootScope, smoothScrollingService) {

    let shadowModel = null

    $scope.error = {
      badLanguages: false,
      badUrl: false,
      noURL: false,
      noFile: false,
      noDescription: false,
      badFiles: false,
      badName: false,
      urlExist: false,
      noTags: false,
      noCost: false,
      badEmployee: false
    }

    $scope.saveShadowModel = () => {
      shadowModel = angular.copy($scope.model)
    }

    $scope.restoreShadowModel = () => {
      if (shadowModel !== null) {
        $scope.model = angular.copy(shadowModel)
      }
    }

    $scope.proceed = () => {
      if ($scope.queue.completedSteps < $scope.order) {
        $scope.queue.completedSteps = $scope.order
      }
      $scope.queue.currentStep = $scope.order + 1

      if ($scope.queue.currentStep <= $scope.queue.amountOfSteps) {
        $timeout(()=>{
          smoothScrollingService.scrollTo($scope.queue.currentStep)
        })
      }
    }

    let _clearErrors = () => {
      for (let property in $scope.error) {
        if ($scope.error.hasOwnProperty(property)) {
          $scope.error[property] = false
        }
      }
    }


    $scope.skip = () => {

      $scope.queue.skippedSteps[$scope.order] = true
      $scope.restoreShadowModel()
      $scope.proceed()

      _clearErrors()
    }

    $scope.outClick = () => {
      $scope.queue.skippedSteps[$scope.order] = false
      $scope.restoreShadowModel()
      _clearErrors()
    }

    $scope.saveStep = () => {
      $scope.queue.skippedSteps[$scope.order] = false
      $scope.saveSection()
    }

    $scope.onClick = (order) => {
      if (angular.isDefined(order)) {
        $rootScope.$broadcast('manualOrderChangeRequest', order)
      }
    }

    $scope.$on('manualOrderChangeRequestGrant', (_event, targetStep) => {
      if ($scope.order === targetStep) {
        $scope.saveShadowModel()
        $scope.queue.currentStep = $scope.order
      }
    })

    $scope.$on('manualOrderChangeRequest', (_event, targetStep) => {
      if ($scope.order === $scope.queue.currentStep && targetStep !== $scope.order) {
        $scope.outClick()
        $rootScope.$broadcast('manualOrderChangeRequestGrant', targetStep)
      }
    })
    return this
  }


  angular.module('profitelo.common.controller.service-provider.service-provider-step-controller', [
    'profitelo.services.smooth-scrolling'
  ])
  .controller('ServiceProviderStepController', ServiceProviderStepController)

}())
