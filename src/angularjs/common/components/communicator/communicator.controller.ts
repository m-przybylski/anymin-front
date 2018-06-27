import { GetProfile, MoneyDto } from 'profitelo-api-ng/model/models';
import { ExpertCallService } from './call-services/expert-call.service';
import { ExpertCall } from './models/current-expert-call';
import { CurrentCall } from './models/current-call';
import { TopAlertService } from '../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../services/translator/translator.service';
import { MicrophoneService, MicrophoneStateEnum } from './microphone-service/microphone.service';
import { CommunicatorService } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class CommunicatorComponentController implements ng.IController, ng.IOnInit, ng.IOnDestroy {

  public static $inject = ['$element', '$timeout', '$window', 'translatorService', 'topAlertService',
    'microphoneService', 'expertCallService', 'communicatorService'];

  private static readonly disconnectedAnimationTimeout = 500;

  public isClosed = true;
  public isDisconnectedAnimation = false;
  public isConnecting = false;
  public serviceName?: string;
  public expert?: GetProfile;
  public expertAvatar?: string;

  public isOffline = false;
  public isParticipantOffline = false;
  public isRemoteVideo = false;
  public isLocalVideo = false;
  public isMessenger = false;
  public isOneMinuteLeftWarning = false;
  public callLengthInSeconds = 0;
  public callCost?: MoneyDto;

  public localVideoStreamElement: ng.IAugmentedJQuery;
  public remoteAudioStreamElement: ng.IAugmentedJQuery;
  public remoteVideoStreamElement: ng.IAugmentedJQuery;

  public isMicrophoneMuted = false;

  private ngUnsubscribe = new Subject<void>();

  constructor(private $element: ng.IRootElementService,
              private $timeout: ng.ITimeoutService,
              private $window: ng.IWindowService,
              private translatorService: TranslatorService,
              private topAlertService: TopAlertService,
              private microphoneService: MicrophoneService,
              private expertCallService: ExpertCallService,
              private communicatorService: CommunicatorService) {
  }

  public $onInit(): void {
    this.expertCallService.newCall$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.registerExpertCall);

    this.communicatorService.connectionEstablishedEvent$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.connectionEstablished);

    this.communicatorService.connectionLostEvent$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.connectionLost);

    this.remoteVideoStreamElement = this.$element.find('.video-player-remote video');
    this.remoteAudioStreamElement = this.$element.find('.video-player-remote audio');

    this.localVideoStreamElement = this.$element.find('.video-player-local video');

    const communicatorElement: ng.IAugmentedJQuery = this.$element.find('.communicator');
    if (communicatorElement) {
      communicatorElement.on('dragover', (e) => e.preventDefault());
      communicatorElement.on('drop', (e) => e.preventDefault());
    }
    this.microphoneService.onMicrophoneStatusChange((state) =>
      this.isMicrophoneMuted = state === MicrophoneStateEnum.MUTED);
  }

  public $onDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private connectionEstablished = (): void => {
    // If established for the first time, do nothing
    if (this.isOffline) {
      this.isOffline = false;
      this.topAlertService.success({
        message: this.translatorService.translate('COMMUNICATOR.NETWORK_RECONNECTED'),
        timeout: 3
      });
    }
  }

  private connectionLost = (): void => {
    this.isOffline = true;
    this.topAlertService.error({
      message: this.translatorService.translate('COMMUNICATOR.NETWORK_INTERRUPT'),
      timeout: 2
    });
  }

  private registerExpertCall = (call: ExpertCall): void => {
    this.cleanupComponent();
    this.serviceName = call.getCallDetails().serviceName;
    this.isConnecting = true;
    this.isClosed = false;
    this.registerCommonCallEvents(call);
  }

  private registerCommonCallEvents = (call: CurrentCall): void => {
    call.remoteMediaTrack$.subscribe(this.handleRemoteStream);

    call.getLocalMediaTracks().forEach(t => this.onLocalMediaTrack(t));

    call.localMediaTrack$.subscribe(this.onLocalMediaTrack);
    call.onEnd(this.onCallEnd);
    call.onTimeCostChange(this.onTimeCostChange);
    call.onParticipantOnline(this.onUserBackOnline);
    call.onParticipantOffline(this.onUserOffline);
    call.onCallTaken(this.closeCommunicator);
  }

  private onTimeCostChange = (timeMoneyTuple: { time: number, money: MoneyDto }): void => {
    this.callLengthInSeconds = timeMoneyTuple.time;
    this.callCost = timeMoneyTuple.money;
  }

  private handleRemoteStream = (track: MediaStreamTrack): void => {
    this.isConnecting = false;
    if (track.kind === 'video') {
      this.attachTrackToElement(this.remoteVideoStreamElement, track);
      this.isRemoteVideo = true;
      track.onended = (): void => {
        this.isRemoteVideo = false;
      };
    } else {
      this.attachTrackToElement(this.remoteAudioStreamElement, track);
    }
  }

  private onLocalMediaTrack = (track: MediaStreamTrack): void => {
    if (track.kind === 'video') {
      this.attachTrackToElement(this.localVideoStreamElement, track);
    }
  }

  private onUserBackOnline = (): void => {
    this.isParticipantOffline = false;
  }

  private closeCommunicator = (): void => {
    this.isDisconnectedAnimation = true;
    this.$timeout(() => {
      this.isClosed = true;
      this.cleanupComponent();
    }, CommunicatorComponentController.disconnectedAnimationTimeout);
  }

  private onUserOffline = (): void => {
    this.isParticipantOffline = true;
    this.topAlertService.error({
      message: this.translatorService.translate('COMMUNICATOR.INTERLOCUTOR_NETWORK_INTERRUPT'),
      timeout: 5
    });
  }

  private cleanupComponent = (): void => {
    this.isDisconnectedAnimation = false;
    this.isConnecting = false;
    this.serviceName = undefined;
    this.expert = undefined;
    this.isRemoteVideo = false;
    this.isLocalVideo = false;
    this.isMessenger = false;
    this.isParticipantOffline = false;
    this.isOffline = false;
    this.callLengthInSeconds = 0;
    this.callCost = undefined;
    this.isMicrophoneMuted = false;
  }

  private onCallEnd = (): void => {
    this.closeCommunicator();
  }

  private attachTrackToElement = (element: ng.IAugmentedJQuery, track: MediaStreamTrack): void => {
    const stream = new MediaStream([track]);
    try {
      element.prop({srcObject: stream});
    } catch (_err) {
      element.attr('src', this.$window.URL.createObjectURL(stream));
    }
  }
}
