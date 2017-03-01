namespace profitelo.resolvers.companyProfile {

  import ICompanyProfileStateParams = profitelo.companyProfile.ICompanyProfileStateParams
  import IViewsApi = profitelo.api.IViewsApi
  import GetOrganizationProfile = profitelo.api.GetOrganizationProfile
  import GetOrganizationServiceDetails = profitelo.api.GetOrganizationServiceDetails
  import GetProfileWithDocuments = profitelo.api.GetProfileWithDocuments

  export interface ICompanyProfile {
    profile: GetProfileWithDocuments
    services: Array<GetOrganizationServiceDetails>
    isFavourite: boolean
  }

  export interface ICompanyProfileService {
    resolve(stateParams: ICompanyProfileStateParams): ng.IPromise<ICompanyProfile>
  }

  class CompanyProfileResolver implements ICompanyProfileService {

    constructor(private $q: ng.IQService, private ViewsApi: IViewsApi, private lodash: _.LoDashStatic) {

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

  angular.module('profitelo.resolvers.company-profile', [
    'profitelo.api.ViewsApi',
    'ngLodash',
    'profitelo.services.session'
  ])
  .config(($qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('CompanyProfileResolver', CompanyProfileResolver)

}
