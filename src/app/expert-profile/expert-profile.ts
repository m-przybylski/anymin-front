import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import sessionModule from '../../common/services/session/session'
import {ExpertProfileResolver} from './expert-profile.resolver'
import {ExpertProfileController} from './expert-profile.controller'
import 'common/directives/pro-footer/pro-footer'
import navbarModule from '../../common/components/navbar/navbar'
import './expert-profile.sass'
import profileHeaderModule from '../../common/components/profile/profile-header/profile-header'
import similarConsultationModule from '../../common/components/profile/similar-consultations/similar-consultations'
import profileSingleConsultationModule from '../../common/components/profile/profile-expert-single-consultation/profile-single-consultation'

export interface IExpertProfileStateParams extends ng.ui.IStateParamsService {
  primaryConsultationId: string
  profileId: string
}

const expertProfilePageModule = angular.module('profitelo.controller.expert-profile', [
  'ui.router',
  apiModule,
  sessionModule,
  profileSingleConsultationModule,
  navbarModule,
  profileHeaderModule,
  similarConsultationModule,
  'profitelo.resolvers.service-provider-image',
  'profitelo.directives.pro-footer',
])
  .config(($stateProvider: ng.ui.IStateProvider, $qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
    $stateProvider.state('app.expert-profile', {
      controllerAs: 'vm',
      url: '/expert-profile/{profileId}?primaryConsultationId',
      template: require('./expert-profile.pug')(),
      controller: 'ExpertProfileController',
      resolve: {
        /* istanbul ignore next */
        expertProfile: (ExpertProfileResolver: ExpertProfileResolver, $stateParams: IExpertProfileStateParams) =>
          ExpertProfileResolver.resolve($stateParams)
      }
    })
  })
  .service('ExpertProfileResolver', ExpertProfileResolver)
  .controller('ExpertProfileController', ExpertProfileController)
  .name

export default expertProfilePageModule
