import {MessengerService} from '../messenger.service'
import {IMessengerMinimizedComponentBindings} from './minimized'

export class MessengerMinimizedComponentController implements ng.IController, IMessengerMinimizedComponentBindings {

  public onMessageClick: (msg: any) => void
  public messages: Array<any> = []

  private static messageShowTimeout = 5000

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService, messengerService: MessengerService) {

    messengerService.onClientMessage(this.showMessage)
    messengerService.onExpertMessage(this.showMessage)
    messengerService.onChatLeft(this.init)
  }

  private hideMessage = (message: any) =>
    this.messages = this.messages.filter(msg => msg !== message)

  private showMessage = (message: any) => {
    this.messages.push(message)
    this.$timeout(_ => this.hideMessage(message), MessengerMinimizedComponentController.messageShowTimeout)
  }

  private init = () => {
    this.messages = []
  }
}
