namespace profitelo.components.communicator.messenger.minimized {

  import IMessengerService = profitelo.services.messenger.IMessengerService

  export interface IMessengerMinimizedComponentBindings {
    onMessageClick: (msg: any) => void
  }

  export class MessengerMinimizedComponentController implements ng.IController, IMessengerMinimizedComponentBindings {

    public onMessageClick: (msg: any) => void
    public messages: Array<any> = []

    private static messageShowTimeout = 5000

    /* @ngInject */
    constructor(private $timeout: ng.ITimeoutService, messengerService: IMessengerService) {

      messengerService.onClientMessage(this.showMessage)
      messengerService.onExpertMessage(this.showMessage)
      messengerService.onChatLeft(this.init)
    }

    private hideMessage = (message) =>
      this.messages = this.messages.filter(msg => msg !== message)

    private showMessage = (message) => {
      this.messages.push(message)
      this.$timeout(_ => this.hideMessage(message), MessengerMinimizedComponentController.messageShowTimeout)
    }

    private init = () => {
      this.messages = []
    }
  }

  class MessengerMinimizedComponent implements ng.IComponentOptions {
    templateUrl: string = 'components/communicator/messenger/minimized/minimized.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = MessengerMinimizedComponentController
    bindings: {[boundProperty: string]: string} = {
      onMessageClick: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger.minimized', [
    'profitelo.services.messenger'
  ])
  .component('messengerMinimized', new MessengerMinimizedComponent())
}
