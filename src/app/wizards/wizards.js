function WizardsController() {
  var vm = this

  return vm
}

angular.module('profitelo.controller.wizards', [
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider.state('app.wizards', {
    abstract:       true,
    url:            '/wizards',
    controller:     WizardsController,
    controllerAs:   'vm',
    templateUrl:    'wizards/wizards.tpl.html'
  })
})

