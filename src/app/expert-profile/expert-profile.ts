(function() {
  function ExpertProfileController($stateParams, $log, $timeout, expertProfile, recommendedProfilesServices, ProfileApi, smoothScrolling) {

    this.profile = {}

    this.profile = expertProfile.profile.expertDetails
    this.consultations = expertProfile.services
    this.profile.type = 'single'
    this.profile.isFavourite = expertProfile.isFavourite

    if (!!$stateParams.primaryConsultationId) {
      $timeout(() => {
        smoothScrolling.simpleScrollTo('#consultationScroll', true)
      })
    }

    this.profile.colaboratedOrganizations = expertProfile.employers
    this.services = expertProfile.services

    recommendedProfilesServices.getRecommendedExperts(this.consultations).then((response) => {
      this.similarExperts = response
    })

    const onProfileLike = () =>
      this.profile.isFavourite = true

    const onProfileLikeError = (error) =>
      $log.error('Can not like this company because: ' + error)

    const onProfileDislike = () =>
      this.profile.isFavourite = false

    const onProfileDislikeError = (error) =>
      $log.error('Can not dislike this company because: ' + error)


    this.handleLike = () => {
      if (!this.profile.isFavourite) {
        ProfileApi.postProfileFavouriteExpert({profileId: $stateParams.profileId})
          .$promise.then(onProfileLike, onProfileLikeError)
      } else {
        ProfileApi.deleteProfileFavouriteExpert({profileId: $stateParams.profileId })
          .$promise.then(onProfileDislike, onProfileDislikeError)
      }
    }

    return this
  }

  angular.module('profitelo.controller.expert-profile', [
    'ui.router',
    'profitelo.swaggerResources',
    'c7s.ng.userAuth',
    'profitelo.directives.pro-top-navbar',
    'profitelo.directives.expert-profile.pro-expert-header',
    'profitelo.directives.pro-footer',
    'profitelo.directives.services.smooth-scrolling',
    'profitelo.directives.expert-profile.pro-expert-slider',
    'profitelo.directives.expert-profile.pro-expert-single-consultation',
    'profitelo.directives.expert-profile.pro-expert-social-icons',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.services.pro-top-alert-service',
    'profitelo.services.recommended-profiles-service',
    'profitelo.services.resolvers.app-expert-profile-resolver',
    'profitelo.components.expert-profile.social-links',
    'profitelo.components.interface.collapse-tab'
  ])
  .config(($stateProvider, UserRolesProvider) => {
    $stateProvider.state('app.expert-profile', {
      controllerAs: 'vm',
      url: '/expert-profile/{profileId}?primaryConsultationId',
      templateUrl: 'expert-profile/expert-profile.tpl.html',
      controller: 'ExpertProfileController',
      resolve: {
        /* istanbul ignore next */
        expertProfile:  (AppExpertProfileResolver, $stateParams) =>
          AppExpertProfileResolver.resolve($stateParams)

      },

      data: {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('ExpertProfileController', ExpertProfileController)
}())
