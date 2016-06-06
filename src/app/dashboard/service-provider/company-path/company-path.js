(function() {
  function CompanyPathController($scope, $state, ProfileApi, savedProfile, User, proTopAlertService) {
    let vm = this

    let _profileType = $scope.$parent.serviceProviderController.profileTypes['COMPANY']

    let _updateMethod

    if (savedProfile) {
      _updateMethod = ProfileApi.putProfile
    } else {
      _updateMethod = ProfileApi.postProfile
    }

    vm.companyPathModel = {}

    vm.queue = {
      amountOfSteps: 6,
      currentStep: 2,
      completedSteps: 1,
      skippedSteps: {}
    }

    if (savedProfile.organizationDetails) {
      vm.companyPathModel = savedProfile.organizationDetails.toVerify
      vm.queue = {
        amountOfSteps: 7,
        currentStep: 7,
        completedSteps: 7,
        skippedSteps: {}
      }
    }

    let _calculateProgressPercentage = () => {
      vm.progressBarWidth = Math.ceil(vm.queue.completedSteps / vm.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()

    $scope.$watch(() => {
      return vm.queue.completedSteps
    }, _calculateProgressPercentage)

    vm.saveAccountObject = () => {
      _updateMethod({
        id: User.getData('id'),
        organizationDetails: {
          name: vm.companyPathModel.name,
          logo: vm.companyPathModel.logo,
          description: vm.companyPathModel.description,
          files: vm.companyPathModel.files || [],
          links: vm.companyPathModel.links || []
        }
      }).$promise.then(() => {
        $state.go('app.dashboard.service-provider.consultation-range')
      }, () => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.company-path', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-name',
    'profitelo.directives.service-provider.pro-service-provider-description',
    'profitelo.directives.service-provider.pro-service-provider-languages',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.swaggerResources',
    'profitelo.directives.service-provider.pro-service-provider-logo',
    'profitelo.directives.pro-top-alert-service',
    'c7s.ng.userAuth'
  ])
  .config(function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.service-provider.company-path', {
      url: '/company-path',
      templateUrl: 'dashboard/service-provider/company-path/company-path.tpl.html',
      controller: 'CompanyPathController',
      controllerAs: 'vm',
      resolve: {
        savedProfile: ($q, ProfileApi, User) => {

          let _deferred = $q.defer()

          User.getStatus().then(() => {
            ProfileApi.getProfile({
              profileId: User.getData('id')
            }).$promise.then((response) => {
              _deferred.resolve(response)
            }, () => {
              _deferred.resolve(false)
            })
          }, (error) => {
            _deferred.reject(error)
          })

          return _deferred.promise
        }
      },
      data: {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.COMPANY_PATH'
      }
    })
  })
  .controller('CompanyPathController', CompanyPathController)

}())
