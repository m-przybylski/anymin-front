import * as angular from 'angular';
import { ICompanyProfileStateParams } from './company-profile';
import { ViewsApi } from 'profitelo-api-ng/api/api';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import {
  ServiceWithEmployments,
  OrganizationProfileView
} from 'profitelo-api-ng/model/models';
import { OrganizationProfileWithDocuments } from '@anymind-ng/api/model/organizationProfileWithDocuments';

export interface ICompanyProfile {
  profileWithDocuments: OrganizationProfileWithDocuments;
  services: ServiceWithEmployments[];
  isFavourite: boolean;
}

// tslint:disable:member-ordering
export class CompanyProfileResolver {

  public static $inject = ['$q', 'ViewsApi'];

    constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
  }

  public resolve = (stateParams: ICompanyProfileStateParams): ng.IPromise<ICompanyProfile> => {

    const handleCompanyResponseError = (error: any): ng.IPromise<void> =>
      this.$q.reject(error);

    const sortServices = (servicesWithTagsAndEmployees: ServiceWithEmployments[]):
      ServiceWithEmployments[] => {
      const primaryConsultation = _.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees) =>
        serviceWithTagsAndEmployees.service.id === stateParams.primaryConsultationId);

      if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
        && servicesWithTagsAndEmployees.length > 1) {
        const currentElement = servicesWithTagsAndEmployees.splice(
          servicesWithTagsAndEmployees.indexOf(primaryConsultation
          ), 1);
        servicesWithTagsAndEmployees.unshift(currentElement[0]);
      }
      return servicesWithTagsAndEmployees;
    };

    const handleCompanyResponse = (response: OrganizationProfileView): ng.IPromise<ICompanyProfile> => {
      if (!response.organizationProfile) {
        return this.$q.reject('Profile is not organization');
      }

      return this.$q.resolve({
        profileWithDocuments: response.organizationProfile,
        services: sortServices(response.services),
        isFavourite: response.isFavourite
      });
    };

    const resolveCompanyProfile = (): ng.IPromise<ICompanyProfile> => {
      const promise = this.ViewsApi.getWebOrganizationProfileRoute(stateParams.profileId)
        .then(handleCompanyResponse);

      promise.catch(handleCompanyResponseError);

      return promise;
    };

    return resolveCompanyProfile();
  }
}
