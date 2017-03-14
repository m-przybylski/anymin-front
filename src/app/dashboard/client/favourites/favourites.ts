import * as angular from "angular"
import apiModule from "profitelo-api-ng/api.module"
import sessionModule from "../../../../common/services/session/session"
import {ClientFavouritesResolver} from "./favourites.resolver"
import {DashboardClientFavouritesController} from "./favourites.controller"
import recommendedServicesModule from "../../../../common/services/recommended-services/recommended-services"
import filtersModule from "../../../../common/filters/filters"
import "common/components/dashboard/client/favourites/no-favourite-experts/no-favourite-experts"
import "common/components/dashboard/client/favourites/favourite-experts/favourite-experts"
import "common/components/expert-profile/similar-experts-slider/similar-experts-slider"
import "common/components/dashboard/client/favourites/favourite-experts/last-consultation-slider/last-consultation-slider"

angular.module('profitelo.controller.dashboard.client.favourites', [
  'ui.router',
  'ngLodash',
  apiModule,
  sessionModule,
  filtersModule,
  recommendedServicesModule,
  'profitelo.components.dashboard.client.favourites.no-favourite-experts',
  'profitelo.components.dashboard.client.favourites.favourite-experts',
  'profitelo.components.expert-profile.similar-experts-slider',
  'profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider'
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.client.favourites', {
      url: '/favourites',
      template: require('./favourites.jade')(),
      controller: 'DashboardClientFavouritesController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        clientFavouritesConsultations: (ClientFavouritesResolver: ClientFavouritesResolver) =>
          ClientFavouritesResolver.resolve()
      }
    })
  })
  .service('ClientFavouritesResolver', ClientFavouritesResolver)
  .controller('DashboardClientFavouritesController', DashboardClientFavouritesController)

