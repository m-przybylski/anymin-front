(function() {
  function SummaryController(ProfileApi, User, $state, ServiceApi) {
    let vm = this
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
      $state.go('app.dashboard.start')
      proTopAlertService.error({
        message: 'error',
        timeout: 4
      })
    })

    vm.backToFirstStep = () => {
      if (isExpert) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.company-path')
      }

    }

    vm.verifyProfile = ()=> {
      $state.go('app.dashboard.start')
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

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-summary-head',
    'profitelo.directives.service-provider.pro-service-provider-summary-step'
  ])
  .config(function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.summary', {
      url:          '/summary',
      templateUrl:  'dashboard/service-provider/summary/summary.tpl.html',
      controller:   'SummaryController',
      controllerAs: 'vm'
    })
  })
  .controller('SummaryController', SummaryController)

}())
