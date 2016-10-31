(function() {
  function ExpertProfileController($stateParams, $timeout, smoothScrolling, savedProfile, CommonConfig, profileImage) {

    let _commonConfig = CommonConfig.getAllData()
    this.profile = {}

    this.profileImage = profileImage

    this.profile = savedProfile.expertDetails
    this.consultations = savedProfile.services
    this.profile.type = 'single'
    
    if (!!$stateParams.primaryConsultationId) {
      $timeout(() => {
        smoothScrolling.simpleScrollTo('#consultationScroll', true)
      })
    }


    this.services = savedProfile.services

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
    'profitelo.directives.pro-top-alert-service',
    'profitelo.components.expert-profile.social-links',
    'profitelo.components.interface.collapse-tab',
    'commonConfig'
  ])
  .config(($stateProvider, UserRolesProvider) => {
    $stateProvider.state('app.expert-profile', {
      controllerAs: 'vm',
      url: '/expert-profile/{contactId}?primaryConsultationId',
      templateUrl: 'expert-profile/expert-profile.tpl.html',
      controller: 'ExpertProfileController',
      resolve: {
        /* istanbul ignore next */
        savedProfile: ($q, $state, $stateParams, ProfileApi, User, ServiceApi) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          User.getStatus().then(() => {
            ProfileApi.getProfileWithServices({
              profileId: $stateParams.contactId
            }).$promise.then((profileWithServices)=> {
              ServiceApi.postServicesTags({
                serviceIds: _.map(profileWithServices.services, 'id')
              }).$promise.then((servicesTags) => {

                profileWithServices.services.forEach((service) => {
                  service.details.tags = _.head(_.filter(servicesTags, (serviceTags) => service.id === serviceTags.serviceId)).tags
                })
                
                const primaryConsultation = _.find(profileWithServices.services, (o) => { return o.id === $stateParams.primaryConsultationId })
                
                if (angular.isDefined($stateParams.primaryConsultationId) && !!primaryConsultation) {
                  const currentElement = profileWithServices.services.splice(profileWithServices.services.indexOf(primaryConsultation), 1)
                  profileWithServices.services.unshift(currentElement[0])
                }

                _deferred.resolve(profileWithServices)
              })
            }, () => {
              _deferred.resolve(null)
            }, (error)=> {
              _deferred.reject(error)
              $state.go('app.dashboard')
              proTopAlertService.error({
                message: 'error',
                timeout: 4
              })
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
        checkAccount: (savedProfile, $state, $stateParams) => {
          if (savedProfile.expertDetails === null) {
            $state.go('app.company-profile', {
              contactId: $stateParams.contactId
            })
          }
        },
        profileImage: (AppServiceProviderImageResolver, savedProfile, $state, $stateParams) => {
          if (savedProfile.expertDetails !== null) {
            if (savedProfile.expertDetails.avatar == null) {
              savedProfile.expertDetails.avatar = null
            }
            return AppServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar)
          }
        }
      },
      data: {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('ExpertProfileController', ExpertProfileController)
}())
