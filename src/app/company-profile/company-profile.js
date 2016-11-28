(function() {
  function CompanyProfileController($stateParams, $timeout, smoothScrolling, companyProfile) {

    this.profile = {}

    this.profile = companyProfile.profile.organizationDetails
    this.consultations = companyProfile.services
    this.profile.type = 'company'
   

    if (!!$stateParams.primaryConsultationId) {
      $timeout(() => {
        smoothScrolling.simpleScrollTo('#consultationScroll', true)
      })
    }
    
    this.services = companyProfile.services
    /* istanbul ignore next function*/
    this.similarExperts =  () => {

      if (!!companyProfile.services && companyProfile.services.length > 0) {
        const tagsArray = companyProfile.services[0].tags
        if(tagsArray && tagsArray.length > 0) {
          const tagId  = tagsArray[Math.floor((Math.random() * (tagsArray.length -1)))].id

          SearchApi.search({
            'tag.id':tagId,
            'profile.type': 'EXP',
            'limit' : 10
          }).$promise.then((response)=> {

            const currentConsultation = _.find(response.results, (o) => {
              return o.id === savedProfile.services[0].id
            })

            if (!!currentConsultation) {
              response.results = _.remove(response.results, (n) => {
                return n.id !== savedProfile.services[0].id
              })
            }else {
              return null
            }
            return response.results
          },(error) => {
            $log.error('ERROR MESSAGE')
            return null
          })
        } else {
          return null
        }
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
    'profitelo.directives.services.smooth-scrolling',
    'profitelo.components.interface.collapse-tab',
    'profitelo.directives.expert-profile.pro-expert-slider',
    'profitelo.components.expert-profile.company-single-consultation',
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.components.expert-profile.social-links',
    'profitelo.services.pro-top-alert-service',
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
        companyProfile: ($q, $state, $stateParams, ProfileApi, proTopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          ProfileApi.getOrganizationProfile({
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
  .controller('CompanyProfileController', CompanyProfileController)
}())
