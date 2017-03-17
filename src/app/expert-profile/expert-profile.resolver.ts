import * as angular from 'angular'
import {IExpertProfileStateParams} from './expert-profile'
import {ViewsApi} from 'profitelo-api-ng/api/api'
import {GetExpertProfile, GetExpertServiceDetails} from 'profitelo-api-ng/model/models'

export class ExpertProfileResolver {

  /* @ngInject */
  constructor(private $q: ng.IQService, private ViewsApi: ViewsApi, private lodash: _.LoDashStatic) {
  }

  public resolve = (stateParams: IExpertProfileStateParams): ng.IPromise<GetExpertProfile> => {

    const handleExpertResponseError = (error: any) =>
      this.$q.reject(error)

    const sortServices = (servicesWithTagsAndEmployees: Array<GetExpertServiceDetails>) => {
      const primaryConsultation = this.lodash.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees) =>
      serviceWithTagsAndEmployees.service.id === stateParams.primaryConsultationId)

      if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
        && servicesWithTagsAndEmployees.length > 1) {
        const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees.indexOf(primaryConsultation), 1)
        servicesWithTagsAndEmployees.unshift(currentElement[0])
      }
      return servicesWithTagsAndEmployees
    }

    const handleExpertResponse = (response: GetExpertProfile) => {
      if (!response.profile.expertDetails) {
        return this.$q.reject('Profile is not expert')
      }

      return {
        profile: response.profile,
        services: sortServices(response.services),
        isFavourite: response.isFavourite,
        employers: response.employers
      }
    }

    const resolveCompanyProfile = () =>
      this.ViewsApi.getExpertProfileRoute(stateParams.profileId)
        .then((res) => handleExpertResponse(res))
        .catch(handleExpertResponseError)

    return resolveCompanyProfile()
  }

}

