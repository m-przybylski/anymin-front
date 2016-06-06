(function() {
  function ConsultationRangeController($scope, ProfileApi, savedProfile, User, $state, ServiceApi) {
    let vm = this

    vm.costModel = {
      name: '',
      tags: [],
      cost: 0
    }

    vm.queue = {
      amountOfSteps: 3,
      currentStep: 1,
      completedSteps: 0,
      skippedSteps: {}
    }

    vm.currency = [
      {id: 1, name: 'PLN'},
      {id: 2, name: 'USD'},
      {id: 3, name: 'EUR'}
    ]
    vm.consultations = []
    vm.profile = {}
    let isExpert = false

    ProfileApi.getProfileWithServices({profileId: User.getData('id')}).$promise.then((response)=>{
      if (response.expertDetails) {
        vm.profile = response.expertDetails.toVerify
        vm.consultations = response.services
        isExpert = true
      } else {
        vm.profile = response.organizationDetails.toVerify
      }
    }, (err)=> {
      $state.go('app.dashboard')
      proTopAlertService.error({
        message: 'error',
        timeout: 4
      })
    })

    let _calculateProgressPercentage = () => {
      vm.progressBarWidth = Math.ceil(vm.queue.completedSteps / vm.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()

    $scope.$watch(() => {
      return vm.queue.completedSteps
    }, _calculateProgressPercentage)

    vm.backToFirstStep = () => {
      if (isExpert) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.company-path')
      }

    }



    vm.saveConsultationObject = () => {
      $state.go('app.dashboard.service-provider.summary')
      if (vm.queue.completedSteps === 3) {
        ServiceApi.postService({
          details: {
            name: vm.costModel.name,
            tags: vm.costModel.tags,
            price: parseInt(vm.costModel.cost, 10)
          }
        }).$promise.then((res)=> {
        }, (err)=> {

        })
      }
    }

    vm.checkIsConsultation = () => {
      return vm.consultations.length > 0
    }

    vm.editConsultation = () => {

    }

    vm.deleteConsultation = (id, index) => {
      ServiceApi.deleteService({
        serviceId: id
      }).$promise.then((res)=> {
        vm.consultations.splice(index, 1)
      })
    }

    vm.addAnotherConsultation = () => {
      ServiceApi.postService({
        details: {
          name: vm.costModel.name,
          tags: vm.costModel.tags,
          price: parseInt(vm.costModel.cost, 10)
        }
      }).$promise.then((res)=> {
        $state.reload()
      }, (err)=> {

      })
    }

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.consultation-range', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.swaggerResources',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.service-provider.consultation-range', {
      url:          '/consultation-range',
      templateUrl:  'dashboard/service-provider/consultation-range/consultation-range.tpl.html',
      controller:   'ConsultationRangeController',
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
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE'
      }
    })
  })
  .controller('ConsultationRangeController', ConsultationRangeController)

}())
