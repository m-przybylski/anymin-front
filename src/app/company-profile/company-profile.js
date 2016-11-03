(function() {
  function CompanyProfileController($stateParams, $timeout, smoothScrolling, savedProfile, companyImage, similarExperts) {

    this.profile = {}

    this.profileImage = companyImage
    
    this.profile = savedProfile.organizationDetails
    this.consultations = savedProfile.services
    this.profile.type = 'company'
   

    if (!!$stateParams.primaryConsultationId) {
      $timeout(() => {
        smoothScrolling.simpleScrollTo('#consultationScroll', true)
      })
    }
    
    this.services = savedProfile.services
    this.similarExperts = similarExperts

    return this
  }

  angular.module('profitelo.controller.company-profile', [
    'ui.router',
    'profitelo.swaggerResources',
    'c7s.ng.userAuth',
    'profitelo.directives.pro-top-navbar',
    'profitelo.directives.expert-profile.pro-expert-header',
    'profitelo.directives.pro-footer',
    'profitelo.directives.services.smooth-scrolling',
    'profitelo.components.interface.collapse-tab',
    'profitelo.directives.expert-profile.pro-expert-slider',
    'profitelo.directives.expert-profile.pro-expert-single-consultation',
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.components.expert-profile.social-links',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.directives.pro-top-alert-service',
    'commonConfig'
  ])
  .config(($stateProvider, UserRolesProvider) => {
    $stateProvider.state('app.company-profile', {
      controllerAs: 'vm',
      url: '/company-profile/{contactId}?primaryConsultationId',
      templateUrl: 'company-profile/company-profile.tpl.html',
      controller: 'CompanyProfileController',
      resolve: {
        /* istanbul ignore next */
        savedProfile: ($q, $state, $stateParams, ProfileApi, User, SearchApi, ServiceApi) => {
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
                console.log(primaryConsultation)
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
        },
        /* istanbul ignore next */
        similarExperts: (SearchApi, savedProfile, $q) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          const tagsArray = savedProfile.services[0].details.tags
          const tagId  = tagsArray[Math.floor((Math.random() * (tagsArray.length -1)))].id

          SearchApi.search({
            'tag.id':tagId,
            'profile.type': 'ORG',
            'limit' : 10
          }).$promise.then((response)=> {

            const currentConsultation = _.find(response.results, (o) => {return o.id === savedProfile.services[0].id })

            if (!!currentConsultation) {
              response.results = _.remove(response.results, (n) => {return n.id !== savedProfile.services[0].id})
            }

            _deferred.resolve(response.results)

          }, (error) => {
            _deferred.reject(error)
          })
          /* istanbul ignore next */
          return _deferred.promise
        }
      },
      data: {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('CompanyProfileController', CompanyProfileController)
}())
