(function() {

  /* @ngInject */
  function controller() {

    this.getConnection = false

    return this
  }

  let communicator = {
    transclude: true,
    templateUrl:    'components/communicator/communicator.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      showChat: '<',
      toggles: '=',
      session: '=',
      messages: '='
    }
  }

  angular.module('profitelo.components.communicator', [
    'pascalprecht.translate',
    'c7s.ng.userAuth',
    'profitelo.components.communicator.communicator-nav'

  ])
    .component('communicator', communicator)

}())
