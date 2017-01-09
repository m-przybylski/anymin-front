(function() {

  function serviceProviderService($state) {

    let _createDefaultModel = (cost)=> {
      return {
        name: '',
        tags: [],
        cost: cost
      }
    }

    let _createDefaultQueue = (amountOfSteps, currentStep, completedSteps)=> {
      return {
        amountOfSteps: amountOfSteps,
        currentStep: currentStep,
        completedSteps: completedSteps,
        skippedSteps: {}
      }
    }

    let _backToFirstStep = (expertDetails, organizationDetails)=> {
      if (expertDetails && !organizationDetails) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.company-path')
      }
    }

    return {
      createDefaultModel: _createDefaultModel,
      createDefaultQueue: _createDefaultQueue,
      backToFirstStep: _backToFirstStep

    }
  }

  angular.module('profitelo.services.service-provider-service', [
    'ui.router'
  ])
    .service('serviceProviderService', serviceProviderService)

}())