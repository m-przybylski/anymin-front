// tslint:disable:no-shadowed-variable
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import sessionModule from '../../common/services/session/session';
import { ExpertProfileResolver } from './expert-profile.resolver';
import { ExpertProfileController } from './expert-profile.controller';
import 'angularjs/common/directives/pro-footer/pro-footer';
import navbarModule from '../../common/components/navbar/navbar';

import profileHeaderModule from '../../common/components/profile/profile-header/profile-header';
import similarConsultationModule from '../../common/components/profile/similar-consultations/similar-consultations';
import profileSingleConsultationModule
  from '../../common/components/profile/profile-expert-single-consultation/profile-single-consultation';

import { ExpertProfileView } from 'profitelo-api-ng/model/models';
import { StateProvider, StateParams } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

export interface IExpertProfileStateParams extends StateParams {
  primaryConsultationId: string;
  profileId: string;
}

const expertProfilePageModule = angular.module('profitelo.controller.expert-profile', [
  apiModule,
  uiRouter,
  sessionModule,
  profileSingleConsultationModule,
  navbarModule,
  profileHeaderModule,
  similarConsultationModule,
  'profitelo.directives.pro-footer',
])
  .config(['$stateProvider', '$qProvider',
    ($stateProvider: StateProvider, $qProvider: ng.IQProvider): void => {
      $qProvider.errorOnUnhandledRejections(false);
      $stateProvider.state('app.expert-profile', {
        controllerAs: 'vm',
        url: '/expert-profile/{profileId}?primaryConsultationId',
        template: require('./expert-profile.html'),
        controller: 'ExpertProfileController',
        resolve: {
          expertProfile: ['ExpertProfileResolver', '$stateParams',
            (ExpertProfileResolver: ExpertProfileResolver, $stateParams: IExpertProfileStateParams
            ): ng.IPromise<ExpertProfileView> =>
              ExpertProfileResolver.resolve($stateParams)]
        }
      });
    }])
  .service('ExpertProfileResolver', ExpertProfileResolver)
  .controller('ExpertProfileController', ExpertProfileController)
  .name;

export default expertProfilePageModule;
