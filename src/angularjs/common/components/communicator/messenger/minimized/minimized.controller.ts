import {IMessengerMinimizedComponentBindings} from './minimized'
import {MessageRoom} from '../../models/message-room';
import * as RatelSdk from 'ratel-sdk-js';
import {ClientCallService} from '../../call-services/client-call.service';
import {ExpertCallService} from '../../call-services/expert-call.service';
import {CurrentCall} from '../../models/current-call';
import {Message} from 'ratel-sdk-js/dist/protocol/wire-entities'
import {CommunicatorService} from '../../communicator.service'

export class MessengerMinimizedComponentController implements ng.IController, IMessengerMinimizedComponentBindings {

  public onMessageClick: (msg: RatelSdk.Message) => void
  public messageRoom: MessageRoom

  public messages: RatelSdk.Message[] = []

  private static readonly messageShowTimeout = 5000
  private clientSession: RatelSdk.Session | undefined

  static $inject = ['$timeout', 'communicatorService', 'clientCallService', 'expertCallService'];

    constructor(private $timeout: ng.ITimeoutService,
              private communicatorService: CommunicatorService,
              clientCallService: ClientCallService,
              expertCallService: ExpertCallService) {
    clientCallService.onNewCall(this.onInit)
    expertCallService.onNewCall(this.onInit)
  }

  private onInit = (currentCall: CurrentCall): void => {
    this.clientSession = this.communicatorService.getClientSession()
    this.messages = []
    currentCall.getMessageRoom().onMessage(this.showMessage)
  }

  private hideMessage = (message: RatelSdk.Message): Message[] =>
    this.messages = this.messages.filter(msg => msg !== message)

  private showMessage = (message: RatelSdk.Message): void => {
    if (typeof this.clientSession !== 'undefined' && this.clientSession.id !== message.userId) {
      this.messages.push(message)
      this.$timeout(_ => this.hideMessage(message), MessengerMinimizedComponentController.messageShowTimeout)
    }
  }
}
