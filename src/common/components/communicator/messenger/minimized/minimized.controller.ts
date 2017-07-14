import {IMessengerMinimizedComponentBindings} from './minimized'
import {MessageRoom} from '../../models/message-room';
import * as RatelSdk from 'ratel-sdk-js';
import {ClientCallService} from '../../call-services/client-call.service';
import {ExpertCallService} from '../../call-services/expert-call.service';
import {CurrentCall} from '../../models/current-call';

export class MessengerMinimizedComponentController implements ng.IController, IMessengerMinimizedComponentBindings {

  public onMessageClick: (msg: RatelSdk.Message) => void
  public messageRoom: MessageRoom

  public messages: RatelSdk.Message[] = []

  private static readonly messageShowTimeout = 5000

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService,
              clientCallService: ClientCallService,
              expertCallService: ExpertCallService) {
    clientCallService.onNewCall(this.onInit)
    expertCallService.onNewCall(this.onInit)
  }

  private onInit = (currentCall: CurrentCall) => {
    this.messages = []
    currentCall.getMessageRoom().onMessage(this.showMessage)
  }

  private hideMessage = (message: RatelSdk.Message) =>
    this.messages = this.messages.filter(msg => msg !== message)

  private showMessage = (message: RatelSdk.Message) => {
    this.messages.push(message)
    this.$timeout(_ => this.hideMessage(message), MessengerMinimizedComponentController.messageShowTimeout)
  }
}
