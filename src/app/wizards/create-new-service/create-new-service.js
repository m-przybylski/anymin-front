/* istanbul ignore next */
(function() {
  function createNewServiceController($interval, _) {
    var vm = this

    vm.progress = 0

    vm.serviceModel = {}

    vm.queue = {
      currentActiveSection: 1,
      sectionBeingEdited:   -1
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
    'profitelo.directives.wizards.pro-create-new-service-tag',
    'profitelo.directives.wizards.pro-create-new-service-description',
    'profitelo.directives.wizards.pro-create-new-service-type',
    'profitelo.directives.wizards.pro-create-new-service-type-chooser',
    'profitelo.directives.wizards.pro-create-new-service-self-consultants'
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
}())