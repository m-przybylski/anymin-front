module profitelo.services.serviceProvider {

  export interface IServiceProviderDefaultModel {
    name: string
    tags: Array<Tag>
    cost: number
  }

  export interface IServiceProviderDefaultQueue {
    amountOfSteps: number,
    currentStep: number,
    completedSteps: any,
    skippedSteps: any
  }

  export interface IServiceProviderService {
    createDefaultModel(cost: number): IServiceProviderDefaultModel
    createDefaultQueue(amountOfSteps, currentStep, completedSteps): IServiceProviderDefaultQueue
    backToFirstStep(expertDetails: any, organizationDetails: any): void
  }

  //TODO add types or remove this provider
  class ServiceProviderService implements IServiceProviderService {

    constructor(private $state: ng.ui.IStateService) {}

    public createDefaultModel = (cost) => {
      return {
        name: '',
        tags: [],
        cost: cost
      }
    }

    public createDefaultQueue = (amountOfSteps, currentStep, completedSteps) => {
      return {
        amountOfSteps: amountOfSteps,
        currentStep: currentStep,
        completedSteps: completedSteps,
        skippedSteps: {}
      }
    }

    public backToFirstStep = (expertDetails, organizationDetails) => {
      if (expertDetails && !organizationDetails) {
        this.$state.go('app.dashboard.service-provider.individual-path')
      } else {
        this.$state.go('app.dashboard.service-provider.company-path')
      }
    }
  }

  angular.module('profitelo.services.service-provider', [
    'ui.router'
  ])
  .service('serviceProviderService', ServiceProviderService)
}