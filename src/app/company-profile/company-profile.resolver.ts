import * as angular from 'angular'
import {ICompanyProfileStateParams} from './company-profile'
import {ViewsApi} from 'profitelo-api-ng/api/api'
import * as _ from 'lodash'
import {
  GetProfileWithDocuments,
  GetOrganizationServiceDetails,
  GetOrganizationProfile
} from 'profitelo-api-ng/model/models'

export interface ICompanyProfile {
  profile: GetProfileWithDocuments
  services: GetOrganizationServiceDetails[]
  isFavourite: boolean
}

interface ICompanyResponse {
  profile: GetProfileWithDocuments,
  services: GetOrganizationServiceDetails[],
  isFavourite: boolean
}

export class CompanyProfileResolver {

  /* @ngInject */
  constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
  }

  public resolve = (stateParams: ICompanyProfileStateParams): ng.IPromise<ICompanyProfile> => {

    const handleCompanyResponseError = (error: any): ng.IPromise<void> =>
      this.$q.reject(error)

    const sortServices = (servicesWithTagsAndEmployees: Array<GetOrganizationServiceDetails>): GetOrganizationServiceDetails[] => {
      const primaryConsultation = _.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees) =>
      serviceWithTagsAndEmployees.service.id === stateParams.primaryConsultationId)

      if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
        && servicesWithTagsAndEmployees.length > 1) {
        const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees.indexOf(primaryConsultation), 1)
        servicesWithTagsAndEmployees.unshift(currentElement[0])
      }
      return servicesWithTagsAndEmployees
    }

    const handleCompanyResponse = (response: GetOrganizationProfile): ng.IPromise<void> | ICompanyResponse => {
      if (!response.profile.organizationDetails) {
        return this.$q.reject('Profile is not organization')
      }

      return {
        profile: response.profile,
        services: sortServices(response.services),
        isFavourite: response.isFavourite
      }
    }

    const resolveCompanyProfile = (): ng.IPromise<GetOrganizationProfile>  =>
      this.ViewsApi.getWebOrganizationProfileRoute(stateParams.profileId)
        .then((res) => handleCompanyResponse(res))
        .catch(handleCompanyResponseError)

    return resolveCompanyProfile()
  }
}
