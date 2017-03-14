import * as angular from "angular"
import apiModule from "../../common/api/api.module"
import sessionModule from "../../common/services/session/session"
import {ExpertProfileResolver} from "./expert-profile.resolver"
import {ExpertProfileController} from "./expert-profile.controller"
import topAlertModule from "../../common/services/top-alert/top-alert"
import recommendedServicesModule from "../../common/services/recommended-services/recommended-services"
import smoothScrollingModule from "../../common/services/smooth-scrolling/smooth-scrolling"
import "common/resolvers/service-provider-image/service-provider-image.service"
import "common/directives/expert-profile/pro-expert-header/pro-expert-header"
import "common/directives/expert-profile/pro-expert-slider/pro-expert-slider"
import "common/directives/expert-profile/pro-expert-single-consultation/pro-expert-single-consultation"
import "common/directives/expert-profile/pro-expert-social-icons/pro-expert-social-icons"
import "common/directives/pro-footer/pro-footer"
import "common/components/expert-profile/similar-experts-slider/similar-experts-slider"
import "common/components/expert-profile/social-links/social-links"
import "common/components/interface/collapse-tab/collapse-tab"

export interface IExpertProfileStateParams extends ng.ui.IStateParamsService {
  primaryConsultationId: string
  profileId: string
}

const expertProfilePageModule = angular.module('profitelo.controller.expert-profile', [
  'ui.router',
  apiModule,
  'ngLodash',
  sessionModule,
  smoothScrollingModule,
  topAlertModule,
  recommendedServicesModule,
  'profitelo.resolvers.service-provider-image',
  'profitelo.directives.expert-profile.pro-expert-header',
  'profitelo.directives.pro-footer',
  'profitelo.directives.expert-profile.pro-expert-slider',
  'profitelo.directives.expert-profile.pro-expert-single-consultation',
  'profitelo.directives.expert-profile.pro-expert-social-icons',
  'profitelo.components.expert-profile.similar-experts-slider',
  'profitelo.components.expert-profile.social-links',
  'profitelo.components.interface.collapse-tab'
])
  .config(($stateProvider: ng.ui.IStateProvider, $qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
    $stateProvider.state('app.expert-profile', {
      controllerAs: 'vm',
      url: '/expert-profile/{profileId}?primaryConsultationId',
      template: require('./expert-profile.jade')(),
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
