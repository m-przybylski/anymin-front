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
    templateUrl:    'components/communicator/messenger/messenger.tpl.html',
    controller: controller,
    bindings: {
      callCost: '<',
      isMessenger: '=',
      callLength: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger', [
    'profitelo.components.communicator.messenger.messenger-maximized',
    'profitelo.components.communicator.messenger.messenger-minimized'
  ])
    .component('messenger', component)

}())
