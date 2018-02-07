import { SoundsService } from '../../../services/sounds/sounds.service';
import { ExpertCallService } from '../call-services/expert-call.service';
import { MessageRoom } from '../models/message-room';
import { LoggerService } from '@anymind-ng/core';
import { Subscription } from 'rxjs/Subscription';
import { Message } from 'ratel-sdk-js';
import { ExpertCall } from '../models/current-expert-call';

export class MessengerService {
  public static $inject = ['soundService', 'logger', 'expertCallService'];

  constructor(private soundService: SoundsService,
              private logger: LoggerService,
              expertCallService: ExpertCallService) {
    expertCallService.newCall$.subscribe(this.handleNewExpertConsultation);
  }

  private handleNewMessage = (_msg: Message): Promise<void> =>
    this.soundService.playMessageNew().catch((err) => {
      this.logger.warn('MessengerService: Could not play new message sound', err);
    })

  private handleNewMessageRoom = (messageRoom: MessageRoom): Subscription =>
    messageRoom.message$.subscribe(this.handleNewMessage)

  private handleNewExpertConsultation = (expertCall: ExpertCall): Subscription =>
    expertCall.messageRoom$.subscribe(this.handleNewMessageRoom)
}
