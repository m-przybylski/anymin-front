namespace profitelo.components.communicator.messenger {

  import Money = profitelo.models.Money

  export interface IMessengerComponentBindings {
    callCost: Money
    isMessenger: boolean
    callLength: number
  }

  export class MessengerComponentController implements ng.IController, IMessengerComponentBindings {

    callCost: Money
    isMessenger: boolean
    callLength: number

    /* @ngInject */
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
    bindings: {[boundProperty: string]: string} = {
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
