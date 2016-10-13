(function() {

  /* @ngInject */
  function controller() {



    return this
  }

  let communicatorNav = {
    transclude: true,
    templateUrl:    'components/communicator/communicator-nav/communicator-nav.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      showChat: '<',
      toggles: '=',
      session: '=',
      messages: '='
    }
  }

  angular.module('profitelo.components.communicator.communicator-nav', [
    'pascalprecht.translate',
    'c7s.ng.userAuth'

  ])
    .component('communicatorNav', communicatorNav)

}())
