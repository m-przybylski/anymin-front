function createNewServiceController($interval, _) {
  var vm = this

  vm.progress = 0

  vm.queue = {
    currentActiveSection: 1,
    sectionBeingEdited:   0
  }

  vm.nextSection = () => {
    vm.queue.currentActiveSection++
  }

  return vm

}

angular.module('profitelo.controller.wizards.create-new-service', [
  'ui.router',
  'lodash',

  'profitelo.directives.pro-progress-bar',
  'profitelo.directives.wizards.pro-create-new-service-name',
  'profitelo.directives.wizards.pro-create-new-service-industry',
  'profitelo.directives.wizards.pro-create-new-service-category',
  'profitelo.directives.wizards.pro-create-new-service-description'
])

.config(function($stateProvider) {
  $stateProvider.state('app.wizards.create-new-service', {
    url:          '/create-new-service',
    templateUrl:  'wizards/create-new-service/create-new-service.tpl.html',
    controller:   createNewServiceController,
    controllerAs: 'vm',
    data: {
      hideDashboardMenu: true
    }
  })
})

