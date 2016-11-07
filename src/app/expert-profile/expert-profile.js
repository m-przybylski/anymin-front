(function() {
  function ExpertProfileController($stateParams, $timeout, smoothScrolling, expertOrganizations, savedProfile, similarExperts) {

    this.profile = {}

    this.profile = savedProfile.expertDetails
    this.consultations = savedProfile.services
    this.profile.type = 'single'

    if (!!$stateParams.primaryConsultationId) {
      $timeout(() => {
        smoothScrolling.simpleScrollTo('#consultationScroll', true)
      })
    }

    this.profile.colaboratedOrganizations = expertOrganizations
    this.similarExperts = similarExperts

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
    'profitelo.components.interface.collapse-tab'
  ])
  .config(($stateProvider, UserRolesProvider) => {
    $stateProvider.state('app.expert-profile', {
      controllerAs: 'vm',
      url: '/expert-profile/{contactId}?primaryConsultationId',
      templateUrl: 'expert-profile/expert-profile.tpl.html',
      controller: 'ExpertProfileController',
      resolve: {
        /* istanbul ignore next */
        savedProfile: ($q, $state, $stateParams, ProfileApi, SearchApi, ServiceApi) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
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
                  profileWithServices.services.unshift(currentElement)
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
          /* istanbul ignore next */
          return _deferred.promise
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
            'profile.type': 'EXP',
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
        },
        expertOrganizations: ($q, $state, $stateParams, ProfileApi, User, proTopAlertService) => {
          let _deferred = $q.defer()
          User.getStatus().then(() => {
            ProfileApi.getEmployersProfilesWithServices({
              profileId: $stateParams.contactId
            }).$promise.then((response)=> {
              _deferred.resolve(response)
            }, (error)=> {
              _deferred.reject(error)
              $state.go('app.dashboard')
              proTopAlertService.error({
                message: 'error',
                timeout: 4
              })
            })
          })
          return _deferred.promise

        }
      },

      data: {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('ExpertProfileController', ExpertProfileController)
}())
