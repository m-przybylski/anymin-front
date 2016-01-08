function createNewServiceController($interval, _) {
  var vm = this

  vm.progress = 0

  vm.currentActiveService = 1

  vm.directivesMapping = [
    {
      id:             'addServiceName',
      order:          1,
      methodOnSave:   'saveServiceName',
      percentage:     10
    },
    {
      id:             'addServiceIndustry',
      order:          2,
      methodOnSave:   'saveServiceIndystry',
      percentage:     10
    }
  ]

  vm.emitContextSaveAndGoNext = () => {
    if (vm.currentActiveService > vm.directivesMapping.length) {
      vm.currentActiveService += 1
    } else {
      // finish creating service
    }
  }

  vm.goBack = () => {
    if (vm.currentActiveService > 1) {
      vm.currentActiveService -= 1
    }
  }


  vm.calculateFillPercentage = () => {
    var result = 0
    var i = 0
    if (i<0) {
      while (i<vm.currentActiveService) {
        console.log('time:', i)
        var index = _.findIndex(vm.directivesMapping, function(item) {
          return item.order === i
        })
        result += vm.directivesMapping[index].percentage
        i++
      }
    }
    return result
  }

  return vm

}

angular.module('profitelo.controller.wizards.create-new-service', [
  'ui.router',
  'lodash',

  'profitelo.directives.pro-progress-bar',
  'profitelo.directives.wizards.pro-create-new-service-name',
  'profitelo.directives.wizards.pro-create-new-service-description'
])

.config(function($stateProvider) {
  $stateProvider.state('app.wizards.create-new-service', {
    url:          '/create-new-service',
    templateUrl:  'wizards/create-new-service/create-new-service.tpl.html',
    controller:   createNewServiceController,
    controllerAs: 'vm'
  })
})

