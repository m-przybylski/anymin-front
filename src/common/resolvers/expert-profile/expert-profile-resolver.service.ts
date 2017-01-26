module profitelo.resolvers.expertProfileResolver {

  interface IExpertProfile {
    profile: Profile
    services: Array<Service>
    isFavourite: boolean,
    employers: Array<Profile>
  }

  export interface IExpertProfileServices {
    resolve(stateParams: ng.ui.IStateParamsService): ng.IPromise<IExpertProfile>
  }

  class ExpertProfileResolver implements IExpertProfileServices {
    constructor(private $q: ng.IQService, private ViewsApi, private lodash: _.LoDashStatic) {

    }

    public resolve = (stateParams: ng.ui.IStateParamsService) => {

      const handleExpertResponseError = (error) =>
        this.$q.reject(error)

      const sortServices = (servicesWithTagsAndEmployees) => {
        const primaryConsultation = this.lodash.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees: {service: Service}) =>
        serviceWithTagsAndEmployees.service.id === stateParams['primaryConsultationId'])

        if (angular.isDefined(stateParams['primaryConsultationId']) && !!primaryConsultation
          && servicesWithTagsAndEmployees.length > 1) {
          const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees.indexOf(primaryConsultation), 1)
          servicesWithTagsAndEmployees.unshift(currentElement[0])
        }
        return servicesWithTagsAndEmployees
      }

      const handleExpertResponse = (response) => {
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
          profileId: stateParams['profileId']
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
  .config(($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('ExpertProfileResolver', ExpertProfileResolver)

}
