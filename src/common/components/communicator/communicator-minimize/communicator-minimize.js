(function() {

  /* @ngInject */
  function controller() {
    this.isFullscreen = () => {
      this.fullscreenActions()
    }
  }

  let communicatorMinimize = {
    transclude: true,
    templateUrl:    'components/communicator/communicator-minimize/communicator-minimize.tpl.html',
    controller: controller,
    bindings: {
      fullscreenActions: '=?'
    },
    controllerAs: 'vm'

  }

  angular.module('profitelo.components.communicator.communicator-minimize', [
    'pascalprecht.translate',
    'c7s.ng.userAuth'

  ])
    .component('communicatorMinimize', communicatorMinimize)

}())
