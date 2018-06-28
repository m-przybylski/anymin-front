// tslint:disable:no-shadowed-variable
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import sessionModule from '../../../../common/services/session/session';
import { ClientFavouritesResolver } from './favourites.resolver';
import { DashboardClientFavouritesController } from './favourites.controller';
import filtersModule from '../../../../common/filters/filters';
import 'angularjs/common/components/dashboard/client/favourites/favourite-experts/favourite-experts';
import 'angularjs/common/components/expert-profile/similar-experts-slider/similar-experts-slider';
import { StateProvider } from '@uirouter/angularjs';
// tslint:disable-next-line: max-line-length
import 'angularjs/common/components/dashboard/client/favourites/favourite-experts/last-consultation-slider/last-consultation-slider';
import noResultsInformationModule
  from '../../../../common/components/dashboard/no-results-information/no-results-information';
import uiRouter from '@uirouter/angularjs';
import { GetDashboardClientExperts } from 'profitelo-api-ng/model/models';

angular.module('profitelo.controller.dashboard.client.favourites', [
  uiRouter,
  apiModule,
  sessionModule,
  filtersModule,
  'profitelo.components.dashboard.client.favourites.favourite-experts',
  'profitelo.components.expert-profile.similar-experts-slider',
  'profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider',
  noResultsInformationModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.client.favourites', {
      url: '/favourites',
      template: require('./favourites.html'),
      controller: 'DashboardClientFavouritesController',
      controllerAs: 'vm',
      resolve: {
                clientFavouritesConsultations:
          ['ClientFavouritesResolver',
            (ClientFavouritesResolver: ClientFavouritesResolver): ng.IPromise<GetDashboardClientExperts> =>
              ClientFavouritesResolver.resolve()]
      }
    });
  }])
  .service('ClientFavouritesResolver', ClientFavouritesResolver)
  .controller('DashboardClientFavouritesController',
    ['clientFavouritesConsultations', '$state', DashboardClientFavouritesController]);
