import { BusinessRoom, BusinessCall, roomType, CallReason } from 'ratel-sdk-js';
import { Session, Message } from 'ratel-sdk-js';
import { GetExpertSueDetails } from 'profitelo-api-ng/model/models';
import { RatelApi, ServiceApi } from 'profitelo-api-ng/api/api';
import { CallState, CurrentCall, ICallDetails } from './current-call';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { CommunicatorService, LoggerService } from '@anymind-ng/core';

export class ExpertCall extends CurrentCall {

  constructor(private getExpertSueDetails: GetExpertSueDetails,
              session: Session,
              timerFactory: TimerFactory,
              call: BusinessCall,
              communicatorService: CommunicatorService,
              RatelApi: RatelApi,
              ServiceApi: ServiceApi,
              microphoneService: MicrophoneService,
              logger: LoggerService) {

    super(call, session, timerFactory, ExpertCall.toCallDetails(getExpertSueDetails), communicatorService,
      RatelApi, ServiceApi, microphoneService, logger);
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

  public pull = (localStream: MediaStream, callMsgs: Message[]): Promise<void> => {
    this.setLocalStream(localStream);
    return this.pullCall(localStream).then(() => {
      this.setDuration(this.getExpertSueDetails.callDuration);
      this.startTimer(this.getExpertSueDetails.freeSeconds);
      if (this.isClientOnline(callMsgs)) {
        this.logger.debug('ExpertCall: Client is online in pulled call');
        this.setState(CallState.PENDING);
      } else {
        this.logger.debug('ExpertCall: Client is offline in pulled call, emitting onOffline, pausing timer');
        this.timer.pause();
        this.events.onParticipantOffline.next(undefined);
      }
      const roomId = this.getRatelRoomId();
      if (roomId) {
        this.logger.debug(`ExpertCall: Initializing ratel room by id ${roomId}`);
        this.getSession().chat.getRoom(roomId).then((room) => {
          this.logger.debug('ExpertCall: received ratel room', room);
          if (roomType.isBusiness(room)) {
            this.setRoom(room);
          } else {
            this.logger.error('ExpertCall: Abnormal state,received room is not BusinessRoom');
          }
        }, (err) => {
          this.logger.error(`ExpertCall: Abnormal state, could not get room ${roomId}`, err);
        });
      } else {
        this.logger.error('ExpertCall: Abnormal state, there is no roomId in the SUE');
      }
    });
  }

  public reject = (): Promise<void> => this.ratelCall.reject(CallReason.CallRejected).then(this.onReject);

  private static toCallDetails = (expertSue: GetExpertSueDetails): ICallDetails => ({
    sueId: expertSue.sueId,
    serviceId: expertSue.serviceName,
    servicePrice: expertSue.servicePrice,
    serviceName: expertSue.serviceName,
    ratelRoomId: expertSue.ratelRoomId
  })

  private onAnswer = (): void => {
    this.setState(CallState.PENDING);
    this.startTimer(this.getExpertSueDetails.freeSeconds);
  }

  private onReject = (): void => {
    this.setState(CallState.REJECTED);
  }
}
