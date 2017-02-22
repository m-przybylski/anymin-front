namespace profitelo.expertProfile {

  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import IExpertProfileServices = profitelo.resolvers.expertProfileResolver.IExpertProfileServices
  import IRecommendedServicesService = profitelo.services.recommendedServices.IRecommendedServicesService
  import IProfileApi = profitelo.api.IProfileApi
  import GetExpertProfile = profitelo.api.GetExpertProfile

  export interface IExpertProfileStateParams extends ng.ui.IStateParamsService {
    primaryConsultationId: string
    profileId: string
  }

  function ExpertProfileController($stateParams: IExpertProfileStateParams, $log: ng.ILogService,
                                   $timeout: ng.ITimeoutService, expertProfile: GetExpertProfile,
                                   recommendedServices: IRecommendedServicesService, ProfileApi: IProfileApi,
                                   smoothScrollingService: ISmoothScrollingService) {

    this.profile = {}

    this.profile = expertProfile.profile.expertDetails
    this.consultations = expertProfile.services
    this.profile.type = 'single'
    this.profile.isFavourite = expertProfile.isFavourite

    if (!!$stateParams.primaryConsultationId) {
      $timeout(() => {
        smoothScrollingService.simpleScrollTo('#consultationScroll', true)
      })
    }

    this.profile.colaboratedOrganizations = expertProfile.employers
    this.services = expertProfile.services

    recommendedServices.getRecommendedExperts(this.consultations).then((response) => {
      this.similarExperts = response
    })

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
        ProfileApi.postProfileFavouriteExpertRoute($stateParams.profileId)
          .then(onProfileLike, onProfileLikeError)
      } else {
        ProfileApi.deleteProfileFavouriteExpertRoute($stateParams.profileId)
          .then(onProfileDislike, onProfileDislikeError)
      }
    }

    return this
  }

  angular.module('profitelo.controller.expert-profile', [
    'ui.router',
    'profitelo.api.ProfileApi',
    'c7s.ng.userAuth',
    'profitelo.directives.pro-top-navbar',
    'profitelo.directives.expert-profile.pro-expert-header',
    'profitelo.directives.pro-footer',
    'profitelo.services.smooth-scrolling',
    'profitelo.directives.expert-profile.pro-expert-slider',
    'profitelo.directives.expert-profile.pro-expert-single-consultation',
    'profitelo.directives.expert-profile.pro-expert-social-icons',
    'profitelo.resolvers.service-provider-image',
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.services.top-alert',
    'profitelo.services.recommended-services',
    'profitelo.resolvers.expert-profile',
    'profitelo.components.expert-profile.social-links',
    'profitelo.components.interface.collapse-tab'
  ])
  .config(($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) => {
    $stateProvider.state('app.expert-profile', {
      controllerAs: 'vm',
      url: '/expert-profile/{profileId}?primaryConsultationId',
      templateUrl: 'expert-profile/expert-profile.tpl.html',
      controller: 'ExpertProfileController',
      resolve: {
        /* istanbul ignore next */
        expertProfile:  (ExpertProfileResolver: IExpertProfileServices, $stateParams: IExpertProfileStateParams) =>
          ExpertProfileResolver.resolve($stateParams)

      },

      data: {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('ExpertProfileController', ExpertProfileController)
}
