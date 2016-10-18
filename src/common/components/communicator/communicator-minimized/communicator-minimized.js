(function() {

  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator-minimized/communicator-minimized.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      maximizeCommunicator: '='
    }
  }

  angular.module('profitelo.components.communicator.communicator-minimized', [
    'pascalprecht.translate'
  ])
    .component('communicatorMinimized', component)
}())
