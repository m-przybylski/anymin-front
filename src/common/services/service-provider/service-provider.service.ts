import {Tag, ExpertDetails, OrganizationDetails} from "profitelo-api-ng/model/models"

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

//TODO add types or remove this provider
export class ServiceProviderService {

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService) {
  }

  public createDefaultModel = (cost: number): IServiceProviderDefaultModel => {
    return {
      name: '',
      tags: [],
      cost: cost
    }
  }

  public createDefaultQueue = (amountOfSteps: number, currentStep: any, completedSteps: any): IServiceProviderDefaultQueue => {
    return {
      amountOfSteps: amountOfSteps,
      currentStep: currentStep,
      completedSteps: completedSteps,
      skippedSteps: {}
    }
  }

  public backToFirstStep = (expertDetails?: ExpertDetails, organizationDetails?: OrganizationDetails) => {
    if (expertDetails && !organizationDetails) {
      this.$state.go('app.dashboard.service-provider.individual-path')
    } else {
      this.$state.go('app.dashboard.service-provider.company-path')
    }
  }
}
