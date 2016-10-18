(function() {
  function CompanyProfileController($scope, $state, savedProfile, ServiceApi, proTopAlertService, CommonConfig, checkAccount, companyImage, DialogService) {

    let _commonConfig = CommonConfig.getAllData()
    this.profile = {}

    this.profileImage = companyImage

    if (savedProfile && savedProfile.organizationDetails) {
      this.profile = savedProfile.organizationDetails
      this.services = savedProfile.services
      this.consultations = savedProfile.services
      this.profile.type = 'company'
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
    'profitelo.directives.expert-profile.pro-expert-slider',
    'profitelo.directives.expert-profile.pro-expert-single-consultation',
    'profitelo.directives.expert-profile.pro-expert-social-icons',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.directives.pro-top-alert-service',
    'commonConfig'
  ])
  .config(($stateProvider, UserRolesProvider) => {
    $stateProvider.state('app.company-profile', {
      controllerAs: 'vm',
      url: '/company-profile/{contactId}',
      templateUrl: 'company-profile/company-profile.tpl.html',
      controller: 'CompanyProfileController',
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
              $state.go('app.dashboard.start')
            })
          }, (error) => {
            $state.go('app.dashboard.start')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        checkAccount: (savedProfile, $state, $stateParams) => {
          if (savedProfile.organizationDetails === null) {
            $state.go('app.expert-profile', {
              contactId: $stateParams.contactId
            })
          }
        },
        companyImage: (AppServiceProviderImageResolver, savedProfile, $state, $stateParams) => {
          if (savedProfile.organizationDetails !== null) {
            if (savedProfile.organizationDetails.logo == null) {
              savedProfile.expertDetails.logo = null
            }
            return AppServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo)
          }
        }
      },
      data: {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('CompanyProfileController', CompanyProfileController)
}())
