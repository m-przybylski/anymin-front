(function() {
  function AppCompanyProfileResolver($q, ViewsApi) {

    const _resolve = (stateParams) => {
      
      const _handleCompanyResponseError = (error) =>
        $q.reject(error)
      
      const _sortServices = (servicesWithTagsAndEmployees) => {
        const primaryConsultation = _.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees) =>
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
          profileId: stateParams.contactId
        }).$promise.then(_handleCompanyResponse, _handleCompanyResponseError)

      return _resolveCompanyProfile()
    }

    return {
      resolve: _resolve
    }
  }

  angular.module('profitelo.services.resolvers.app-company-profile-resolver', [
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
    .service('AppCompanyProfileResolver', AppCompanyProfileResolver)


}())
