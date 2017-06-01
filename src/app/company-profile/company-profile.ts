import * as angular from 'angular'
import topAlertModule from '../../common/services/top-alert/top-alert'
import apiModule from 'profitelo-api-ng/api.module'
import sessionModule from '../../common/services/session/session'
import smoothScrollingModule from '../../common/services/smooth-scrolling/smooth-scrolling'
import {CompanyProfileController} from './company-profile.controller'
import {CompanyProfileResolver} from './company-profile.resolver'
import 'common/directives/expert-profile/pro-expert-header/pro-expert-header'
import 'common/directives/pro-footer/pro-footer'
import 'common/directives/expert-profile/pro-expert-slider/pro-expert-slider'
import 'common/components/interface/collapse-tab/collapse-tab'
import 'common/components/expert-profile/company-single-consultation/company-single-consultation'
import 'common/components/expert-profile/similar-experts-slider/similar-experts-slider'
import 'common/components/expert-profile/social-links/social-links'
import navbarModule from '../../common/components/navbar/navbar'
import profileHeaderModule from '../../common/components/profile/profile-header/profile-header'
import similarConsultationModule from '../../common/components/profile/similar-consultations/similar-consultations'
import './company-profile.sass'
import profileCompanyConsultationModule from '../../common/components/profile/profile-company-single-consultation/profile-company-single-consultation'

export interface ICompanyProfileStateParams extends ng.ui.IStateParamsService {
  primaryConsultationId: string
  profileId: string
}

const companyProfilePageModule = angular.module('profitelo.controller.company-profile', [
  'ui.router',
  apiModule,
  sessionModule,
  smoothScrollingModule,
  topAlertModule,
  navbarModule,
  profileCompanyConsultationModule,
  profileHeaderModule,
  similarConsultationModule,
  'profitelo.directives.expert-profile.pro-expert-header',
  'profitelo.directives.pro-footer',
  'profitelo.directives.expert-profile.pro-expert-slider',
  'profitelo.components.interface.collapse-tab',
  'profitelo.components.expert-profile.company-single-consultation',
  'profitelo.components.expert-profile.similar-experts-slider',
  'profitelo.components.expert-profile.social-links',
  'commonConfig'

])
.config(($stateProvider: ng.ui.IStateProvider, $qProvider: ng.IQProvider) => {
  $qProvider.errorOnUnhandledRejections(false)
  $stateProvider.state('app.company-profile', {
    controllerAs: 'vm',
    url: '/company-profile/{profileId}?primaryConsultationId',
    template: require('./company-profile.pug')(),
    controller: 'CompanyProfileController',
    resolve: {
      /* istanbul ignore next */
      companyProfile: (CompanyProfileResolver: CompanyProfileResolver, $stateParams: ICompanyProfileStateParams) =>
        CompanyProfileResolver.resolve($stateParams)
    }
  })
})
.service('CompanyProfileResolver', CompanyProfileResolver)
.controller('CompanyProfileController', CompanyProfileController)
  .name

export default companyProfilePageModule
