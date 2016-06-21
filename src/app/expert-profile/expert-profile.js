(function() {
  function ExpertProfileController($scope, $state, savedProfile, ServiceApi, proTopAlertService, CommonConfig, profileImage) {

    let _commonConfig = CommonConfig.getAllData()
    this.profile = {}

    this.profileImage = profileImage

    if (savedProfile && savedProfile.expertDetails) {
      this.profile = savedProfile.expertDetails
      this.services = savedProfile.services
      this.consultations = savedProfile.services
    } else if (savedProfile.organizationDetails) {
      vm.profile = savedProfile.organizationDetails
    }

    return this
  }

  angular.module('profitelo.controller.expert-profile', [
    'ui.router',
    'profitelo.swaggerResources',
    'c7s.ng.userAuth',
    'profitelo.directives.interface.pro-top-navbar',
    'profitelo.directives.expert-profile.pro-expert-header',
    'profitelo.directives.expert-profile.pro-expert-footer',
    'profitelo.directives.expert-profile.pro-expert-slider',
    'profitelo.directives.expert-profile.pro-expert-single-consultation',
    'profitelo.directives.expert-profile.pro-expert-social-icons',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.directives.pro-top-alert-service',
    'commonConfig'
  ])
  .config(($stateProvider, UserRolesProvider) => {
    $stateProvider.state('app.expert-profile', {
      controllerAs: 'vm',
      url: '/expert-profile/{contactId:int}',
      templateUrl: 'expert-profile/expert-profile.tpl.html',
      controller: 'ExpertProfileController',
      resolve: {
        savedProfile: ($q, $state, ProfileApi, User, $stateParams) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          User.getStatus().then(() => {
            ProfileApi.getProfileWithServices({
              profileId: $stateParams.contactId
            }).$promise.then((response)=>{
              _deferred.resolve(response)
            }, () => {
              _deferred.resolve(null)
            })
          }, (error) => {
            $state.go('app.dashboard')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        profileImage: (AppServiceProviderImageResolver, savedProfile) => {
          return AppServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar)
        }
      },
      data: {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('ExpertProfileController', ExpertProfileController)
}())
