(function() {
  function CompanyPathController($scope, $state, ProfileApi, savedProfile, User, topAlertService, $timeout, smoothScrollingService) {

    let _updateMethod
    if (savedProfile) {
      _updateMethod = ProfileApi.patchProfile
    } else {
      _updateMethod = ProfileApi.postProfile
    }

    this.companyPathModel = {
      name: '',
      logo: null,
      description: '',
      files: [],
      links: []
    }

    this.queue = {
      amountOfSteps: 6,
      currentStep: 2,
      completedSteps: 1,
      skippedSteps: {}
    }

    if (savedProfile && savedProfile.organizationDetails) {
      this.companyPathModel = savedProfile.organizationDetails
      this.queue = {
        amountOfSteps: 6,
        currentStep: 7,
        completedSteps: 6,
        skippedSteps: {}
      }
      this.inEditMode = true
    } else {
      this.inEditMode = false
      $timeout(()=> {
        smoothScrollingService.scrollTo(this.queue.currentStep)
      })
    }

    let _calculateProgressPercentage = () => {
      this.progressBarWidth = Math.ceil(this.queue.completedSteps / this.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()

    $scope.$watch(() => {
      return this.queue.completedSteps
    }, _calculateProgressPercentage)

    this.saveAccountObject = () => {
      _updateMethod({
        id: User.getData('id'),
        organizationDetails: {
          name: this.companyPathModel.name,
          logo: this.companyPathModel.logo,
          description: this.companyPathModel.description,
          files: this.companyPathModel.files.map((file) => {
            return {token: file.token, previews: file.previews}
          }),
          links: this.companyPathModel.links
        }
      }).$promise.then(() => {
        $state.go('app.dashboard.service-provider.consultation-range.company')
      }, () => {
        topAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }


    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.company-path', [
    'ui.router',
    'profitelo.directives.service-provider.pro-service-provider-name',
    'profitelo.directives.service-provider.pro-service-provider-description',
    'profitelo.directives.service-provider.pro-service-provider-languages',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.swaggerResources',
    'profitelo.directives.service-provider.pro-service-provider-avatar',
    'profitelo.services.top-alert',
    'c7s.ng.userAuth'
  ])
    .config(function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.company-path', {
        url: '/company-path',
        templateUrl: 'dashboard/service-provider/company-path/company-path.tpl.html',
        controller: 'CompanyPathController',
        controllerAs: 'vm',
        resolve: {
          savedProfile: ($log, $q, $state, ProfileApi, User, topAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfile({
                profileId: User.getData('id')
              }).$promise.then((response) => {
                _deferred.resolve(response)
              }, () => {
                _deferred.resolve(null)
              })
            }, (error) => {
              $log.error(error)
              $state.go('app.dashboard')
              topAlertService.error({
                message: 'error',
                timeout: 4
              })
            })
            /* istanbul ignore next */
            return _deferred.promise
          }
        },
        data: {
          access: UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.COMPANY_PATH',
          showMenu: false
        }
      })
    })
    .controller('CompanyPathController', CompanyPathController)

}())
