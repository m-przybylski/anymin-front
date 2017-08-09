import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import sessionModule from '../../../../common/services/session/session'
import {ClientFavouritesResolver} from './favourites.resolver'
import {DashboardClientFavouritesController} from './favourites.controller'
import filtersModule from '../../../../common/filters/filters'
import 'common/components/dashboard/client/favourites/favourite-experts/favourite-experts'
import 'common/components/expert-profile/similar-experts-slider/similar-experts-slider'
import
  'common/components/dashboard/client/favourites/favourite-experts/last-consultation-slider/last-consultation-slider'
import noResultsInformationModule
  from '../../../../common/components/dashboard/no-results-information/no-results-information'

import {GetDashboardClientExperts} from 'profitelo-api-ng/model/models'

angular.module('profitelo.controller.dashboard.client.favourites', [
  'ui.router',

  apiModule,
  sessionModule,
  filtersModule,
  'profitelo.components.dashboard.client.favourites.favourite-experts',
  'profitelo.components.expert-profile.similar-experts-slider',
  'profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider',
  noResultsInformationModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.client.favourites', {
      url: '/favourites',
      template: require('./favourites.pug')(),
      controller: 'DashboardClientFavouritesController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        clientFavouritesConsultations:
          (ClientFavouritesResolver: ClientFavouritesResolver): ng.IPromise<GetDashboardClientExperts> =>
            ClientFavouritesResolver.resolve()
      }
    })
  })
  .service('ClientFavouritesResolver', ClientFavouritesResolver)
  .controller('DashboardClientFavouritesController', DashboardClientFavouritesController)
