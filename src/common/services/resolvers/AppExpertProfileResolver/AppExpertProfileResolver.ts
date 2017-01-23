(function() {
  function AppExpertProfileResolver($q: ng.IQService, ViewsApi, lodash: _.LoDashStatic) {

    const _resolve = (stateParams) => {

      const _handleExpertResponseError = (error) =>
        $q.reject(error)

      const _sortServices = (servicesWithTagsAndEmployees) => {
        const primaryConsultation = lodash.find(servicesWithTagsAndEmployees, (serviceWithTagsAndEmployees: {service: Service}) =>
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

        return <Object> {
          profile: response.profile,
          services: _sortServices(response.services),
          isFavourite: response.isFavourite,
          employers: response.employers
        }
      }

      const _resolveCompanyProfile = () =>
        ViewsApi.getExpertProfile({
          profileId: stateParams.profileId
        }).$promise
          .then(_handleExpertResponse)
          .catch(_handleExpertResponseError)

      return _resolveCompanyProfile()
    }

    return {
      resolve: _resolve
    }
  }

  angular.module('profitelo.services.resolvers.app-expert-profile-resolver', [
    'profitelo.swaggerResources',
    'ngLodash',
    'c7s.ng.userAuth'
  ])
    .config(($qProvider) => {
      $qProvider.errorOnUnhandledRejections(false)
    })
    .service('AppExpertProfileResolver', AppExpertProfileResolver)


}())
