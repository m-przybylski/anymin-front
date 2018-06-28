// tslint:disable:no-any
import { GetTag } from 'profitelo-api-ng/model/models';
import { StateService } from '@uirouter/angularjs';
import { IExpertDetails } from '../../models/ExpertDetails';
import { IOrganizationDetails } from '../../models/OrganizationDetails';

export interface IServiceProviderDefaultModel {
  name: string;
  tags: GetTag[];
  cost: number;
}

export interface IServiceProviderDefaultQueue {
  amountOfSteps: number;
  currentStep: number;
  completedSteps: any;
  skippedSteps: any;
}

// TODO add types or remove this provider
// tslint:disable:member-ordering
export class ServiceProviderService {

  public static $inject = ['$state'];

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

  public backToFirstStep = (expertDetails?: IExpertDetails, organizationDetails?: IOrganizationDetails): void => {
    if (expertDetails && !organizationDetails) {
      this.$state.go('app.dashboard.service-provider.individual-path');
    } else {
      this.$state.go('app.dashboard.service-provider.company-path');
    }
  }
}
