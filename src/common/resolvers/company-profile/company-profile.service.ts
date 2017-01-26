namespace profitelo.resolvers.companyProfile {

  export interface ICompanyProfile {
    profile: Profile
    services: Array<Service>
    isFavourite: boolean
  }

  export interface ICompanyProfileServices {
    resolve(stateParams: ng.ui.IStateParamsService): ng.IPromise<ICompanyProfile>
  }

  class CompanyProfileResolver implements ICompanyProfileServices{

    constructor(private $q: ng.IQService, private ViewsApi, private lodash: _.LoDashStatic) {

    }

    public resolve = (stateParams: ng.ui.IStateParamsService) => {

      const handleCompanyResponseError = (error) =>
        this.$q.reject(error)

      const sortServices = (servicesWithTagsAndEmployees: any) => {
        const primaryConsultation = this.lodash.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees: {service: Service}) =>
        serviceWithTagsAndEmployees.service.id === stateParams['primaryConsultationId'])

        if (angular.isDefined(stateParams['primaryConsultationId']) && !!primaryConsultation
          && servicesWithTagsAndEmployees.length > 1) {
          const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees.indexOf(primaryConsultation), 1)
          servicesWithTagsAndEmployees.unshift(currentElement[0])
        }
        return servicesWithTagsAndEmployees
      }

      const handleCompanyResponse = (response) => {
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
        this.ViewsApi.getOrganizationProfile({
          profileId: stateParams['profileId']
        }).$promise
        .then(handleCompanyResponse)
        .catch(handleCompanyResponseError)

      return resolveCompanyProfile()
    }
  }

  angular.module('profitelo.resolvers.company-profile', [
    'profitelo.swaggerResources',
    'ngLodash',
    'c7s.ng.userAuth'
  ])
  .config(($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('CompanyProfileResolver', CompanyProfileResolver)

}
