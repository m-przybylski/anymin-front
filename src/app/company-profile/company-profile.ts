namespace profitelo.companyProfile {

  import ICompanyProfileService = profitelo.resolvers.companyProfile.ICompanyProfileService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import IRecommendedServicesService = profitelo.services.recommendedServices.IRecommendedServicesService
  import ICompanyProfile = profitelo.resolvers.companyProfile.ICompanyProfile
  import IProfileApi = profitelo.api.IProfileApi

  export interface ICompanyProfileStateParams extends ng.ui.IStateParamsService {
    primaryConsultationId: string
    profileId: string
  }

  function CompanyProfileController($stateParams: ICompanyProfileStateParams, $timeout: ng.ITimeoutService,
                                    $log: ng.ILogService, smoothScrollingService: ISmoothScrollingService,
                                    ProfileApi: IProfileApi, recommendedServices: IRecommendedServicesService,
                                    companyProfile: ICompanyProfile) {

    this.profile = {}

    this.profile = companyProfile.profile.organizationDetails
    this.consultations = companyProfile.services
    this.profile.type = 'company'
    this.profile.isFavourite = companyProfile.isFavourite

    if (!!$stateParams.primaryConsultationId) {
      $timeout(() => {
        smoothScrollingService.simpleScrollTo('#consultationScroll', true)
      })
    }

    recommendedServices.getRecommendedCompanies(this.consultations).then((response) => {
      this.similarCompany = response
    })

    this.services = companyProfile.services

    const onProfileLike = () =>
      this.profile.isFavourite = true

    const onProfileLikeError = (error: any) =>
      $log.error('Can not like this company because: ' + error)

    const onProfileDislike = () =>
      this.profile.isFavourite = false

    const onProfileDislikeError = (error: any) =>
      $log.error('Can not dislike this company because: ' + error)


    this.handleLike = () => {
      if (!this.profile.isFavourite) {
        ProfileApi.postProfileFavouriteOrganizationRoute($stateParams.profileId)
          .then(onProfileLike, onProfileLikeError)
      } else {
        ProfileApi.deleteProfileFavouriteOrganizationRoute($stateParams.profileId)
          .then(onProfileDislike, onProfileDislikeError)
      }
    }

    return this
  }

  angular.module('profitelo.controller.company-profile', [
    'ui.router',
    'profitelo.api.ProfileApi',
    'profitelo.services.session',
    'profitelo.directives.pro-top-navbar',
    'profitelo.directives.expert-profile.pro-expert-header',
    'profitelo.directives.pro-footer',
    'profitelo.services.smooth-scrolling',
    'profitelo.components.interface.collapse-tab',
    'profitelo.directives.expert-profile.pro-expert-slider',
    'profitelo.components.expert-profile.company-single-consultation',
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.components.expert-profile.social-links',
    'profitelo.services.top-alert',
    'profitelo.services.recommended-services',
    'profitelo.resolvers.company-profile',
    'commonConfig'
  ])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.company-profile', {
      controllerAs: 'vm',
      url: '/company-profile/{profileId}?primaryConsultationId',
      templateUrl: 'company-profile/company-profile.tpl.html',
      controller: 'CompanyProfileController',
      resolve: {
        /* istanbul ignore next */
        companyProfile: (CompanyProfileResolver: ICompanyProfileService, $stateParams: ICompanyProfileStateParams) =>
          CompanyProfileResolver.resolve($stateParams)
      },
      data: {
      }
    })
  })
  .controller('CompanyProfileController', CompanyProfileController)
}
