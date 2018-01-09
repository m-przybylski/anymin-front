import {Tag, ExpertDetails, OrganizationDetails} from 'profitelo-api-ng/model/models'
import {StateService} from '@uirouter/angularjs'

export interface IServiceProviderDefaultModel {
  name: string
  tags: Tag[]
  cost: number
}

export interface IServiceProviderDefaultQueue {
  amountOfSteps: number,
  currentStep: number,
  completedSteps: any,
  skippedSteps: any
}

// TODO add types or remove this provider
export class ServiceProviderService {

  /* @ngInject */
  constructor(private $state: StateService) {
  }

  public createDefaultModel = (cost: number): IServiceProviderDefaultModel =>
    ({
      name: '',
      tags: [],
      cost
    })

  public createDefaultQueue =
    (amountOfSteps: number, currentStep: any, completedSteps: any): IServiceProviderDefaultQueue =>
    ({
      amountOfSteps,
      currentStep,
      completedSteps,
      skippedSteps: {}
    })

  public backToFirstStep = (expertDetails?: ExpertDetails, organizationDetails?: OrganizationDetails): void => {
    if (expertDetails && !organizationDetails) {
      this.$state.go('app.dashboard.service-provider.individual-path')
    } else {
      this.$state.go('app.dashboard.service-provider.company-path')
    }
  }
}
