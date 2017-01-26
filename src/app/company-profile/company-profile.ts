(function() {
  function CompanyProfileController($stateParams, $timeout, $log, smoothScrollingService, ProfileApi, recommendedServices, companyProfile) {

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

    const onProfileLikeError = (error) =>
      $log.error('Can not like this company because: ' + error)

    const onProfileDislike = () =>
      this.profile.isFavourite = false

    const onProfileDislikeError = (error) =>
      $log.error('Can not dislike this company because: ' + error)


    this.handleLike = () => {
      if (!this.profile.isFavourite) {
        ProfileApi.postProfileFavouriteOrganization({profileId: $stateParams.profileId})
          .$promise.then(onProfileLike, onProfileLikeError)
      } else {
        ProfileApi.deleteProfileFavouriteOrganization({profileId: $stateParams.profileId })
          .$promise.then(onProfileDislike, onProfileDislikeError)
      }
    }

    return this
  }

  angular.module('profitelo.controller.company-profile', [
    'ui.router',
    'profitelo.swaggerResources',
    'c7s.ng.userAuth',
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
  .config(($stateProvider, UserRolesProvider) => {
    $stateProvider.state('app.company-profile', {
      controllerAs: 'vm',
      url: '/company-profile/{profileId}?primaryConsultationId',
      templateUrl: 'company-profile/company-profile.tpl.html',
      controller: 'CompanyProfileController',
      resolve: {
        /* istanbul ignore next */
        companyProfile: (CompanyProfileResolver, $stateParams) =>
          CompanyProfileResolver.resolve($stateParams)
      },
      data: {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('CompanyProfileController', CompanyProfileController)
}())
