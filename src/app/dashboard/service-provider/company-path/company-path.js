(function () {
  function CompanyPathController($scope, $state, ProfileApi, savedProfile, User, proTopAlertService, $timeout, smoothScrolling) {

    let _updateMethod
    if (savedProfile) {
      _updateMethod = ProfileApi.putProfile
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
        smoothScrolling.scrollTo(this.queue.currentStep)
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
            return {fileId: file.id, previewFileId: file.meta.previewFileId}
          }),
          links: this.companyPathModel.links
        }
      }).$promise.then(() => {
        $state.go('app.dashboard.service-provider.consultation-range.company')
      }, () => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }


    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.company-path', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-name',
    'profitelo.directives.service-provider.pro-service-provider-description',
    'profitelo.directives.service-provider.pro-service-provider-languages',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.swaggerResources',
    'profitelo.directives.service-provider.pro-service-provider-avatar',
    'profitelo.directives.pro-top-alert-service',
    'c7s.ng.userAuth'
  ])
    .config(function ($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.company-path', {
        url: '/company-path',
        templateUrl: 'dashboard/service-provider/company-path/company-path.tpl.html',
        controller: 'CompanyPathController',
        controllerAs: 'vm',
        resolve: {
          savedProfile: ($q, $state, ProfileApi, User) => {
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
              $state.go('app.dashboard')
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
          access: UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.COMPANY_PATH',
          showMenu: false
        }
      })
    })
    .controller('CompanyPathController', CompanyPathController)

}())
