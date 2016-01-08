function createNewServiceController($interval) {
  var vm = this

  vm.progress = 0

  vm.currentService = 1

  vm.directivesMapping = [
    {
      id:             'addServiceName',
      order:          1,
      methodOnSave:   'saveServiceName'
    },
    {
      id:             'addServiceIndustry',
      order:          2,
      methodOnSave:   'saveServiceIndystry'
    }
  ]

  return vm

}

angular.module('profitelo.controller.wizards.create-new-service', [
  'ui.router',
  'profitelo.directives.wizards.pro-create-new-service-name'
])

.config(function($stateProvider) {
  $stateProvider.state('app.wizards.create-new-service', {
    url:          '/create-new-service',
    templateUrl:  'wizards/create-new-service/create-new-service.tpl.html',
    controller:   createNewServiceController,
    controllerAs: 'vm'
  })
})

