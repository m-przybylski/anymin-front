// tslint:disable:newline-before-return
import * as angular from 'angular';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { IExpertProfileStateParams } from './expert-profile';
import { ViewsApi } from 'profitelo-api-ng/api/api';
import { ExpertProfileView } from 'profitelo-api-ng/model/models';
import { EmploymentWithService } from '@anymind-ng/api';

// tslint:disable:member-ordering
export class ExpertProfileResolver {

  public static $inject = ['$q', 'ViewsApi'];

    constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
  }

  public resolve = (stateParams: IExpertProfileStateParams): ng.IPromise<ExpertProfileView> => {

    const sortServices = (servicesWithTagsAndEmployees: EmploymentWithService[]): EmploymentWithService[] => {
      const primaryConsultation = _.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees) =>
      serviceWithTagsAndEmployees.id === stateParams.primaryConsultationId);

      if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
        && servicesWithTagsAndEmployees.length > 1) {
        const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees
          .indexOf(primaryConsultation), 1);
        servicesWithTagsAndEmployees.unshift(currentElement[0]);
      }
      return servicesWithTagsAndEmployees;
    };

    const handleExpertResponse = (response: ExpertProfileView): ng.IPromise<ExpertProfileView> => {
      if (!response.expertProfile) {
        return this.$q.reject('Profile is not expert');
      }

      return this.$q.resolve({
        expertProfile: response.expertProfile,
        employments: sortServices(response.employments),
        isFavourite: response.isFavourite
      });
    };

    const resolveExpertProfile = (): ng.IPromise<ExpertProfileView> =>
      this.ViewsApi.getWebExpertProfileRoute(stateParams.profileId)
        .then(handleExpertResponse, (err) => this.$q.reject(err));

    return resolveExpertProfile();
  }

}
