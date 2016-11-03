(function() {

  /* @ngInject */
  function controller() {

    this.minimizeMessenger = () =>
      this.isMessenger = false

    this.maximizeMessenger = () =>
      this.isMessenger = true

    return this
  }

  const component = {
    templateUrl:    'components/communicator/communicator-maximized/messenger/messenger.tpl.html',
    controller: controller,
    bindings: {
      callCost: '<',
      isMessenger: '=',
      callLength: '<'
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized.messenger', [
    'profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized',
    'profitelo.components.communicator.communicator-maximized.messenger.messenger-minimized'
  ])
    .component('messenger', component)

}())
