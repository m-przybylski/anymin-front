(function() {
  function AppClientFavouritesResolver($q, ViewsApi) {

    const _resolve = () => {

      const _handleAppClientFavouritesResolverResponseError = (error) =>
        $q.reject(error)

      const _handleAppClientFavouritesResolverResponse = (response) => {
        return {
          balance: response.balance,
          favouriteProfiles: response.favouriteProfiles,
          lastConsultations: response.lastConsultations
       }
      }

      const _resolveAppClientFavouritesResolver= () =>
        ViewsApi.getDashboardClientExperts().$promise
          .then(_handleAppClientFavouritesResolverResponse, _handleAppClientFavouritesResolverResponseError)

      return _resolveAppClientFavouritesResolver()
    }

    return {
      resolve: _resolve
    }
  }

  angular.module('profitelo.services.resolvers.app-client-favourites-resolver', [
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
    .service('AppClientFavouritesResolver', AppClientFavouritesResolver)


}())
