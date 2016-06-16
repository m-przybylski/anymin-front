(function() {
  function SummaryController($state, savedProfile, ServiceApi, proTopAlertService) {
    let vm = this

    if (savedProfile && savedProfile.expertDetails && !savedProfile.organizationDetails) {
      vm.profile = savedProfile.expertDetails
      vm.consultations = savedProfile.services
    } else {
      vm.profile = savedProfile.organizationDetails
      vm.consultations = savedProfile.services
      if (savedProfile.expertDetails) {
        vm.expertProfile = savedProfile.expertDetails
      }
    }


    vm.backToFirstStep = () => {
      if (savedProfile.expertDetails && !savedProfile.organizationDetails) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.company-path')
      }
    }

    vm.goToExpertEdit = () => {
      $state.go('app.dashboard.service-provider.individual-path')
    }

    vm.verifyProfile = ()=> {
      ServiceApi.postServicesVerify().$promise.then((res)=> {
        $state.go('app.dashboard.start')
      }, (err) => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    vm.editConsultation = (id, name, price, tags) => {
      vm.currentEditConsultationId = vm.currentEditConsultationId === id ? -1 : id
      vm.editQueue = {
        amountOfSteps: 3,
        currentStep: 4,
        completedSteps: 3,
        skippedSteps: {}
      }
      vm.editModel = {
        name: name,
        tags: tags,
        cost: price
      }
      vm.updateConsultation = () => {
        ServiceApi.putService({
          serviceId: id
        }, {
          details: {
            name: vm.editModel.name,
            tags: vm.editModel.tags,
            price: parseInt(vm.editModel.cost, 10)
          },
          invitations: []
        }).$promise.then(() => {
          $state.reload()
        })
      }
    }
    vm.deleteConsultation = (id, index) => {
      ServiceApi.deleteService({
        serviceId: id
      }).$promise.then((res)=> {
        vm.consultations.splice(index, 1)
      }, (err) => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-summary-head',
    'profitelo.directives.service-provider.pro-service-provider-summary-step',
    'c7s.ng.userAuth',
    'profitelo.swaggerResources',
    'profitelo.directives.interface.pro-alert'
  ])
  .config(function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.service-provider.summary', {
      url:          '/summary',
      templateUrl:  'dashboard/service-provider/summary/summary.tpl.html',
      controller:   'SummaryController',
      controllerAs: 'vm',
      resolve: {
        savedProfile: ($q, $state, ProfileApi, User) => {

          let _deferred = $q.defer()
          User.getStatus().then(() => {
            ProfileApi.getProfileWithServices({
              profileId: User.getData('id')
            }).$promise.then((response)=>{
              _deferred.resolve(response)
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


          return _deferred.promise
        }
      },
      data: {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE'
      }
    })
  })
  .controller('SummaryController', SummaryController)

}())
