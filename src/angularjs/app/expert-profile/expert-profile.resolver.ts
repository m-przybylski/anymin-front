import * as angular from 'angular';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { IExpertProfileStateParams } from './expert-profile';
import { ViewsApi } from 'profitelo-api-ng/api/api';
import { GetExpertProfile, GetExpertServiceDetails } from 'profitelo-api-ng/model/models';

// tslint:disable:member-ordering
export class ExpertProfileResolver {

  public static $inject = ['$q', 'ViewsApi'];

    constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
  }

  public resolve = (stateParams: IExpertProfileStateParams): ng.IPromise<GetExpertProfile> => {

    const sortServices = (servicesWithTagsAndEmployees: GetExpertServiceDetails[]): GetExpertServiceDetails[] => {
      const primaryConsultation = _.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees) =>
      serviceWithTagsAndEmployees.service.id === stateParams.primaryConsultationId);

      if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
        && servicesWithTagsAndEmployees.length > 1) {
        const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees
          .indexOf(primaryConsultation), 1);
        servicesWithTagsAndEmployees.unshift(currentElement[0]);
      }
      return servicesWithTagsAndEmployees;
    };

    const handleExpertResponse = (response: GetExpertProfile): ng.IPromise<GetExpertProfile> => {
      if (!response.profile.expertDetails) {
        return this.$q.reject('Profile is not expert');
      }

      return this.$q.resolve({
        profile: response.profile,
        services: sortServices(response.services),
        isFavourite: response.isFavourite
      });
    };

    const resolveExpertProfile = (): ng.IPromise<GetExpertProfile> =>
      this.ViewsApi.getWebExpertProfileRoute(stateParams.profileId)
        .then(handleExpertResponse, (err) => this.$q.reject(err));

    return resolveExpertProfile();
  }

}
