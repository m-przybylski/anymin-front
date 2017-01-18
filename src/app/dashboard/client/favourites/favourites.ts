(function() {

  function DashboardClientFavouritesController($log, lodash, clientFavouritesConsultations, recommendedServices) {
    this.balance = clientFavouritesConsultations.balance
    this.lastConsultations = lodash.sortBy(clientFavouritesConsultations.lastConsultations, 'createdAt')
    this.favouriteProfiles = clientFavouritesConsultations.favouriteProfiles

    const onGetRecommendedExperts = (recommendedExperts) =>
      this.similarExperts = recommendedExperts

    const onGetRecommendedExpertsError = (err) =>
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
    'profitelo.services.resolvers.app-client-favourites-resolver'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.client.favourites', {
      url: '/favourites',
      templateUrl: 'dashboard/client/favourites/favourites.tpl.html',
      controller: 'DashboardClientFavouritesController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        clientFavouritesConsultations:  (AppClientFavouritesResolver) =>
          AppClientFavouritesResolver.resolve()
      },
      data          : {
        access : UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('DashboardClientFavouritesController', DashboardClientFavouritesController)

}())
