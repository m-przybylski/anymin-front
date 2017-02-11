namespace profitelo.resolvers.companyProfile {

  import ICompanyProfileStateParams = profitelo.companyProfile.ICompanyProfileStateParams
  import Profile = profitelo.models.Profile
  import Service = profitelo.models.Service

  export interface ICompanyProfile {
    profile: Profile
    services: Array<Service>
    isFavourite: boolean
  }

  export interface ICompanyProfileService {
    resolve(stateParams: ICompanyProfileStateParams): ng.IPromise<ICompanyProfile>
  }

  class CompanyProfileResolver implements ICompanyProfileService {

    constructor(private $q: ng.IQService, private ViewsApi: any, private lodash: _.LoDashStatic) {

    }

    public resolve = (stateParams: ICompanyProfileStateParams) => {

      const handleCompanyResponseError = (error: any) =>
        this.$q.reject(error)

      const sortServices = (servicesWithTagsAndEmployees: any) => {
        const primaryConsultation = this.lodash.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees: {service: Service}) =>
        serviceWithTagsAndEmployees.service.id === stateParams.primaryConsultationId)

        if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
          && servicesWithTagsAndEmployees.length > 1) {
          const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees.indexOf(primaryConsultation), 1)
          servicesWithTagsAndEmployees.unshift(currentElement[0])
        }
        return servicesWithTagsAndEmployees
      }

      const handleCompanyResponse = (response: ICompanyProfile) => {
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
  .config(($qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('CompanyProfileResolver', CompanyProfileResolver)

}
