module profitelo.components.communicator.messenger {

  class MessengerComponentBindings {
    callCost: Money
    isMessenger: boolean
    callLength: number
  }

  class MessengerComponentController implements ng.IController, MessengerComponentBindings {

    callCost: Money
    isMessenger: boolean
    callLength: number

    constructor() {
    }

    public minimizeMessenger = () =>
      this.isMessenger = false

    public maximizeMessenger = () =>
      this.isMessenger = true
  }

  class MessengerComponent implements ng.IComponentOptions {
    templateUrl: string = 'components/communicator/messenger/messenger.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = MessengerComponentController
    bindings: {
      callCost: '<',
      isMessenger: '=',
      callLength: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger', [
    'profitelo.components.communicator.messenger.maximized',
    'profitelo.components.communicator.messenger.minimized'
  ])
  .component('messenger', new MessengerComponent())
}