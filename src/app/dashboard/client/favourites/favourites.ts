namespace profitelo.dashboard.client.favourites {

  import IClientFavouritesResolverService = profitelo.resolvers.clientFavourites.IClientFavouritesResolverService
  import IClientFavourites = profitelo.resolvers.clientFavourites.IClientFavourites
  import IRecommendedServicesService = profitelo.services.recommendedServices.IRecommendedServicesService
  import Service = profitelo.models.Service

  function DashboardClientFavouritesController($log: ng.ILogService, lodash: _.LoDashStatic,
                                               clientFavouritesConsultations: IClientFavourites,
                                               recommendedServices: IRecommendedServicesService) {
    this.balance = clientFavouritesConsultations.balance
    this.lastConsultations = lodash.sortBy(clientFavouritesConsultations.lastConsultations, 'createdAt')
    this.favouriteProfiles = clientFavouritesConsultations.favouriteProfiles

    const onGetRecommendedExperts = (recommendedExperts: Array<Service>) =>
      this.similarExperts = recommendedExperts

    const onGetRecommendedExpertsError = (err: any) =>
      $log.error(err)

    recommendedServices.getRecommendedExperts(this.lastConsultations || this.favouriteProfiles)
      .then(onGetRecommendedExperts, onGetRecommendedExpertsError)

    return this
  }


  angular.module('profitelo.controller.dashboard.client.favourites', [
    'ui.router',
    'ngLodash',
    'c7s.ng.userAuth',
    'profitelo.filters.money',
    'profitelo.services.recommended-services',
    'profitelo.components.dashboard.client.favourites.no-favourite-experts',
    'profitelo.components.dashboard.client.favourites.favourite-experts',
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider',
    'profitelo.resolvers.client-favourites'
  ])
    .config( function($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
      $stateProvider.state('app.dashboard.client.favourites', {
        url: '/favourites',
        templateUrl: 'dashboard/client/favourites/favourites.tpl.html',
        controller: 'DashboardClientFavouritesController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          clientFavouritesConsultations:  (ClientFavouritesResolver: IClientFavouritesResolverService) =>
            ClientFavouritesResolver.resolve()
        },
        data          : {
          access : UserRolesProvider.getAccessLevel('user')
        }
      })
    })
    .controller('DashboardClientFavouritesController', DashboardClientFavouritesController)
}

