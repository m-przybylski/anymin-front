namespace profitelo.resolvers.expertProfileResolver {

  import IExpertProfileStateParams = profitelo.expertProfile.IExpertProfileStateParams
  import IViewsApi = profitelo.api.IViewsApi
  import GetExpertProfile = profitelo.api.GetExpertProfile
  import GetExpertServiceDetails = profitelo.api.GetExpertServiceDetails

  export interface IExpertProfileServices {
    resolve(stateParams: IExpertProfileStateParams): ng.IPromise<GetExpertProfile>
  }

  class ExpertProfileResolver implements IExpertProfileServices {

    constructor(private $q: ng.IQService, private ViewsApi: IViewsApi, private lodash: _.LoDashStatic) {}

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

  angular.module('profitelo.resolvers.expert-profile', [
    'profitelo.api.ViewsApi',
    'ngLodash',
    'c7s.ng.userAuth'
  ])
  .config(($qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('ExpertProfileResolver', ExpertProfileResolver)

}
