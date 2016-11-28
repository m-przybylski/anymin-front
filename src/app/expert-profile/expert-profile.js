(function() {
  function ExpertProfileController($stateParams, $timeout, $log, expertProfile, SearchApi, smoothScrolling) {

    this.profile = {}

    this.profile = expertProfile.profile.expertDetails
    this.consultations = expertProfile.services
    this.profile.type = 'single'

    if (!!$stateParams.primaryConsultationId) {
      $timeout(() => {
        smoothScrolling.simpleScrollTo('#consultationScroll', true)
      })
    }
    
    //this.profile.colaboratedOrganizations = expertProfile

    this.services = expertProfile.services

    const onFindSimilarExpertSuccess = (response) => {
      const currentConsultation = _.find(response.results, (o) => {
        return o.id === expertProfile.services[0].id
      })

      if (!!currentConsultation) {
        response.results = _.remove(response.results, (n) => {
          return n.id !== expertProfile.services[0].id
        })
      }else {
        return null
      }
      return response.results
    }

    const onFindSimilarExpertsError = (error) => {
      $log.info('Can not find any similar experts becouse: ' + error)
      return null
    }

    const searchSimilarExperts =  () => {
      if (!!expertProfile.services && expertProfile.services.length > 0) {
        const tagsArray = expertProfile.services[0].tags
        if(!!tagsArray && tagsArray.length > 0) {
          const tagId  = tagsArray[Math.floor((Math.random() * (tagsArray.length -1)))].id
          SearchApi.search({
            'tag.id':tagId,
            'profile.type': 'EXP',
            'limit' : 10
          }).$promise.then(onFindSimilarExpertSuccess, onFindSimilarExpertsError)
        } else {
          return null
        }
      }
    }
    
  
    this.similarExperts = searchSimilarExperts()

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
        expertProfile: ($q, $state, $stateParams, ProfileApi, proTopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          ProfileApi.getExpertProfile({
            profileId: $stateParams.contactId
          }).$promise.then((response)=> {
            const primaryConsultation = _.find(response.services, (o) => { return o.service.id === $stateParams.primaryConsultationId })
            if (angular.isDefined($stateParams.primaryConsultationId) && !!primaryConsultation && response.services.length > 1) {
              const currentElement = response.services.splice(response.services.indexOf(primaryConsultation), 1)
              response.services.unshift(currentElement[0])
            }
            _deferred.resolve(response)
          }, (error) => {
            _deferred.reject(error)
            $state.go('app.dashboard.start')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
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
  .controller('ExpertProfileController', ExpertProfileController)
}())
