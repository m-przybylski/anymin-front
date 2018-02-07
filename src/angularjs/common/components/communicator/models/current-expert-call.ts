import { BusinessRoom, BusinessCall, roomType, CallReason } from 'ratel-sdk-js';
import { Session } from 'ratel-sdk-js';
import { GetIncomingCallDetails } from 'profitelo-api-ng/model/models';
import { RatelApi } from 'profitelo-api-ng/api/api';
import { CallState, CurrentCall } from './current-call';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { CommunicatorService, LoggerService } from '@anymind-ng/core';

export class ExpertCall extends CurrentCall {

  constructor(private incomingCallDetails: GetIncomingCallDetails,
              session: Session,
              timerFactory: TimerFactory,
              call: BusinessCall,
              communicatorService: CommunicatorService,
              RatelApi: RatelApi,
              microphoneService: MicrophoneService,
              logger: LoggerService) {

    super(call, session, timerFactory,
      incomingCallDetails.service, incomingCallDetails.sue, communicatorService, RatelApi, microphoneService, logger);
    this.setState(CallState.PENDING);
    this.onCallTaken(() => {
      this.setState(CallState.PENDING_ON_OTHER_DEVICE);
    });
  }

  public answer = (localStream: MediaStream): Promise<void> => {
    this.setLocalStream(localStream);
    return this.ratelCall.answer(localStream)
      .then(this.onAnswer)
      .then(() => this.RatelApi.postRatelCreateRoomRoute(this.getSueId()))
      .then((room) => this.getSession().chat.getRoom(room.id))
      .then(businessRoom => this.joinRoom(businessRoom as BusinessRoom));
  }

  public pull = (localStream: MediaStream): Promise<void> => {
    this.setLocalStream(localStream);
    return this.pullCall(localStream).then(() => {
      this.setState(CallState.PENDING);
      const roomId = this.getRatelRoomId();
      if (roomId) {
        this.getSession().chat.getRoom(roomId).then((room) => {
          this.logger.debug('ExpertCall: received ratel room', room);
          if (roomType.isBusiness(room)) {
            this.setRoom(room);
          } else {
            this.logger.error('ExpertCall: Abnormal state,received room is not BusinessRoom');
          }
        }, (err) => {
          this.logger.error('ExpertCall: Abnormal state, could not get room', err);
        });
      } else {
        this.logger.error('ExpertCall: Abnormal state, there is no roomId in the SUE');
      }
    });
  }

  public reject = (): Promise<void> => this.ratelCall.reject(CallReason.CallRejected).then(this.onReject);

  private onAnswer = (): void => {
    this.setState(CallState.PENDING);
    this.startTimer(this.incomingCallDetails.sue.freeSeconds);
  }

  private onReject = (): void => {
    this.setState(CallState.REJECTED);
  }
}
