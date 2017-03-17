import * as angular from 'angular'
import {ICompanyProfileStateParams} from './company-profile'
import {ViewsApi} from 'profitelo-api-ng/api/api'
import {
  GetProfileWithDocuments,
  GetOrganizationServiceDetails,
  GetOrganizationProfile
} from 'profitelo-api-ng/model/models'

export interface ICompanyProfile {
  profile: GetProfileWithDocuments
  services: Array<GetOrganizationServiceDetails>
  isFavourite: boolean
}

export class CompanyProfileResolver {

  /* @ngInject */
  constructor(private $q: ng.IQService, private ViewsApi: ViewsApi, private lodash: _.LoDashStatic) {
  }

  public resolve = (stateParams: ICompanyProfileStateParams): ng.IPromise<ICompanyProfile> => {

    const handleCompanyResponseError = (error: any) =>
      this.$q.reject(error)

    const sortServices = (servicesWithTagsAndEmployees: Array<GetOrganizationServiceDetails>) => {
      const primaryConsultation = this.lodash.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees) =>
      serviceWithTagsAndEmployees.service.id === stateParams.primaryConsultationId)

      if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
        && servicesWithTagsAndEmployees.length > 1) {
        const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees.indexOf(primaryConsultation), 1)
        servicesWithTagsAndEmployees.unshift(currentElement[0])
      }
      return servicesWithTagsAndEmployees
    }

    const handleCompanyResponse = (response: GetOrganizationProfile) => {
      if (!response.profile.organizationDetails) {
        return this.$q.reject('Profile is not organization')
      }

      return {
        profile: response.profile,
        services: sortServices(response.services),
        isFavourite: response.isFavourite
      }
    }

    const resolveCompanyProfile = () =>
      this.ViewsApi.getOrganizationProfileRoute(stateParams.profileId)
        .then((res) => handleCompanyResponse(res))
        .catch(handleCompanyResponseError)

    return resolveCompanyProfile()
  }
}
