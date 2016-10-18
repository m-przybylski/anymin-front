(function() {

  /* @ngInject */
  function controller() {
  }

  let communicatorConnecting = {
    transclude: true,
    templateUrl:    'components/communicator/communicator-connecting/communicator-connecting.tpl.html',
    controller: controller,
    controllerAs: 'vm'

  }

  angular.module('profitelo.components.communicator.communicator-connecting', [
    'pascalprecht.translate',
    'c7s.ng.userAuth'

  ])
    .component('communicatorConnecting', communicatorConnecting)

}())
