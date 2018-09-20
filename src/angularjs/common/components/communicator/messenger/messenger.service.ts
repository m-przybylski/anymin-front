// tslint:disable:readonly-array
import { SoundsService } from '../../../services/sounds/sounds.service';
import { ExpertCallService, IExpertSessionCall } from '../call-services/expert-call.service';
import { LoggerService, MessageRoom } from '@anymind-ng/core';
import { Subscription } from 'rxjs';
import { roomEvents } from 'ratel-sdk-js';

export class MessengerService {
  public static $inject = ['soundService', 'logger', 'expertCallService'];

  constructor(
    private soundService: SoundsService,
    private logger: LoggerService,
    expertCallService: ExpertCallService,
  ) {
    expertCallService.newCall$.subscribe(this.handleNewExpertConsultation);
  }

  private handleNewMessage = (_msg: roomEvents.CustomMessageSent): Promise<void> =>
    this.soundService.playMessageNew().catch(err => {
      this.logger.warn('MessengerService: Could not play new message sound', err);
    });

  private handleNewMessageRoom = (messageRoom: MessageRoom): Subscription =>
    messageRoom.message$.subscribe(this.handleNewMessage);

  private handleNewExpertConsultation = (expertSessionCall: IExpertSessionCall): Subscription =>
    expertSessionCall.currentExpertCall.messageRoom$.subscribe(this.handleNewMessageRoom);
}
