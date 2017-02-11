namespace profitelo.resolvers.expertProfileResolver {

  import Tag = profitelo.models.Tag
  import Profile = profitelo.models.Profile
  import Service = profitelo.models.Service
  import IExpertProfileStateParams = profitelo.expertProfile.IExpertProfileStateParams

  export interface IExpertProfile {
    profile: Profile
    services: Array<Service>
    isFavourite: boolean,
    employers: Array<Profile>
  }

  export interface IExpertProfileServices {
    resolve(stateParams: IExpertProfileStateParams): ng.IPromise<IExpertProfile>
  }

  class ExpertProfileResolver implements IExpertProfileServices {

    constructor(private $q: ng.IQService, private ViewsApi: any, private lodash: _.LoDashStatic) {}

    public resolve = (stateParams: IExpertProfileStateParams) => {

      const handleExpertResponseError = (error: any) =>
        this.$q.reject(error)

      const sortServices = (servicesWithTagsAndEmployees: Array<{service: Service, tags: Array<Tag>}>) => {
        const primaryConsultation = this.lodash.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees) =>
        serviceWithTagsAndEmployees.service.id === stateParams.primaryConsultationId)

        if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
          && servicesWithTagsAndEmployees.length > 1) {
          const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees.indexOf(primaryConsultation), 1)
          servicesWithTagsAndEmployees.unshift(currentElement[0])
        }
        return servicesWithTagsAndEmployees
      }

      const handleExpertResponse = (response: any) => {
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
        this.ViewsApi.getExpertProfile({
          profileId: stateParams.profileId
        }).$promise
        .then(handleExpertResponse)
        .catch(handleExpertResponseError)

      return resolveCompanyProfile()
    }

  }

  angular.module('profitelo.resolvers.expert-profile', [
    'profitelo.swaggerResources',
    'ngLodash',
    'c7s.ng.userAuth'
  ])
  .config(($qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('ExpertProfileResolver', ExpertProfileResolver)

}
