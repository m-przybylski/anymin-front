(function() {
  function AppCompanyProfileResolver($q, ViewsApi, lodash: _.LoDashStatic) {

    const _resolve = (stateParams) => {
      
      const _handleCompanyResponseError = (error) =>
        $q.reject(error)
      
      const _sortServices = (servicesWithTagsAndEmployees: any) => {
        const primaryConsultation = lodash.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees: {service: Service}) =>
          serviceWithTagsAndEmployees.service.id === stateParams.primaryConsultationId )

        if (angular.isDefined(stateParams.primaryConsultationId) && !!primaryConsultation
          && servicesWithTagsAndEmployees.length > 1) {
          const currentElement = servicesWithTagsAndEmployees.splice(servicesWithTagsAndEmployees.indexOf(primaryConsultation), 1)
          servicesWithTagsAndEmployees.unshift(currentElement[0])
        }
        return servicesWithTagsAndEmployees
      }

      const _handleCompanyResponse = (response) => {
        if (!response.profile.organizationDetails) {
          return $q.reject('Profile is not organization')
        }

        return {
          profile: response.profile,
          services: _sortServices(response.services),
          isFavourite: response.isFavourite
        }
      }

      const _resolveCompanyProfile = () =>
        ViewsApi.getOrganizationProfile({
          profileId: stateParams.profileId
        }).$promise
          .then(_handleCompanyResponse)
          .catch(_handleCompanyResponseError)

      return _resolveCompanyProfile()
    }

    return {
      resolve: _resolve
    }
  }

  angular.module('profitelo.services.resolvers.app-company-profile-resolver', [
    'profitelo.swaggerResources',
    'ngLodash',
    'c7s.ng.userAuth'
  ])
    .config(($qProvider) => {
        $qProvider.errorOnUnhandledRejections(false)
    })
    .service('AppCompanyProfileResolver', AppCompanyProfileResolver)


}())
