angular.module('profitelo.controller.dashboard.service-wizard', [
  'ui.router',
  'profitelo.directives.proProgressBar'
])
.config(($stateProvider) => {
  $stateProvider.state('app.dashboard.service-wizard', {
    url: '/service-wizard',
    templateUrl: 'dashboard/service-wizard/service-wizard.tpl.html',
    controller: 'ServiceWizardController',
    controllerAs: 'vm'
  })
})
.controller('ServiceWizardController', ServiceWizardController)

function ServiceWizardController($interval) {
  var vm = this

  vm.progress = 0

  $interval(() => {
    if (vm.progress++ >= 100) {
      vm.progress = 0
    }
  }, 100)

  return vm
}
