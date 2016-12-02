(function() {
  function AppExpertProfileResolver($q, ViewsApi) {

    const _resolve = (stateParams) => {

      const _handleExpertResponseError = (error) =>
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

      const _handleExpertResponse = (response) => {
        if (!response.profile.expertDetails) {
          return $q.reject('Profile is not expert')
        }
        return {
          profile: response.profile,
          services: _sortServices(response.services),
          isFavourite: response.isFavourite
        }
      }

      const _resolveCompanyProfile = () =>
        ViewsApi.getExpertProfile({
          profileId: stateParams.contactId
        }).$promise.then(_handleExpertResponse, _handleExpertResponseError)

      return _resolveCompanyProfile()
    }

    return {
      resolve: _resolve
    }
  }

  angular.module('profitelo.services.resolvers.app-expert-profile-resolver', [
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
    .service('AppExpertProfileResolver', AppExpertProfileResolver)


}())
