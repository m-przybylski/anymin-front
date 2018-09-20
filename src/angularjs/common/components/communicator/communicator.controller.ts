// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
import { GetProfile, MoneyDto } from 'profitelo-api-ng/model/models';
import { ExpertCallService, IExpertSessionCall } from './call-services/expert-call.service';
import { CommunicatorService, CurrentCall, LoggerService } from '@anymind-ng/core';
import { TopAlertService } from '../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../services/translator/translator.service';
import { MicrophoneService, MicrophoneStateEnum } from './microphone-service/microphone.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class CommunicatorComponentController implements ng.IController, ng.IOnInit, ng.IOnDestroy {
  public static $inject = [
    '$element',
    '$timeout',
    '$window',
    'translatorService',
    'topAlertService',
    'microphoneService',
    'expertCallService',
    'communicatorService',
    'logger',
  ];

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

  constructor(
    private $element: ng.IRootElementService,
    private $timeout: ng.ITimeoutService,
    private $window: ng.IWindowService,
    private translatorService: TranslatorService,
    private topAlertService: TopAlertService,
    private microphoneService: MicrophoneService,
    private expertCallService: ExpertCallService,
    private communicatorService: CommunicatorService,
    private logger: LoggerService,
  ) {}

  public $onInit(): void {
    this.expertCallService.newCall$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.registerExpertCall);
    this.communicatorService.connectionEstablishedEvent$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.connectionEstablished);

    this.communicatorService.connectionLostEvent$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.connectionLost);

    this.remoteVideoStreamElement = this.$element.find('.video-player-remote video');
    this.remoteAudioStreamElement = this.$element.find('.video-player-remote audio');

    this.localVideoStreamElement = this.$element.find('.video-player-local video');

    const communicatorElement: ng.IAugmentedJQuery = this.$element.find('.communicator');
    if (communicatorElement) {
      communicatorElement.on('dragover', e => e.preventDefault());
      communicatorElement.on('drop', e => e.preventDefault());
    }
    this.microphoneService.onMicrophoneStatusChange(
      state => (this.isMicrophoneMuted = state === MicrophoneStateEnum.MUTED),
    );
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
        timeout: 3,
      });
    }
  };

  private connectionLost = (): void => {
    this.isOffline = true;
    this.topAlertService.error({
      message: this.translatorService.translate('COMMUNICATOR.NETWORK_INTERRUPT'),
      timeout: 2,
    });
  };

  private registerExpertCall = (expertSessionCall: IExpertSessionCall): void => {
    this.cleanupComponent();
    this.serviceName = expertSessionCall.currentExpertCall.getServiceName();
    this.isConnecting = true;
    this.isClosed = false;
    this.registerCommonCallEvents(expertSessionCall.currentExpertCall);
  };

  private registerCommonCallEvents = (call: CurrentCall): void => {
    call.remoteMediaTrack$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.handleRemoteStream);
    call.remoteVideoStatus$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.handleRemoteVideoStream);
    call.localMediaTrack$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.onLocalMediaTrack);
    call.callDestroyed$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.onCallEnd);
    call.timeCostChange$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.onTimeCostChange);
  };

  private onTimeCostChange = (timeMoneyTuple: { time: number; money: MoneyDto }): void => {
    this.callLengthInSeconds = timeMoneyTuple.time;
    this.callCost = timeMoneyTuple.money;
  };

  private handleRemoteVideoStream = (videoStatus: boolean): void => {
    this.isRemoteVideo = videoStatus;
  };

  private handleRemoteStream = (track: MediaStreamTrack): void => {
    this.isConnecting = false;
    this.logger.debug(`Remote track received ${track.id}`, track);
    if (this.remoteAudioStreamElement && this.remoteVideoStreamElement) {
      if (track.kind === 'video') {
        this.attachTrackToElement(this.remoteVideoStreamElement, track);
        const remoteVideoHTMLMediaElement = this.remoteVideoStreamElement.get(0) as HTMLMediaElement;
        remoteVideoHTMLMediaElement.play().catch(error => {
          this.logger.error('Can not call play method', error);
        });
      } else {
        this.attachTrackToElement(this.remoteAudioStreamElement, track);
        const remoteAudioStreamHTMLMediaElement = this.remoteAudioStreamElement.get(0) as HTMLMediaElement;
        remoteAudioStreamHTMLMediaElement.play().catch(error => {
          this.logger.error('Can not call play method', error);
        });
      }
    } else {
      this.logger.error('remote Stream Elements are undefined');
    }
  };

  private onLocalMediaTrack = (track: MediaStreamTrack): void => {
    if (this.localVideoStreamElement) {
      this.logger.info('CommunicatorMaximizedComponent: setting local stream');
      if (track.kind === 'video') {
        this.attachTrackToElement(this.localVideoStreamElement, track);
        const localVideoStreamHTMLMediaElement = this.localVideoStreamElement.get(0) as HTMLMediaElement;
        localVideoStreamHTMLMediaElement.play().catch(error => {
          this.logger.error('Can not call play method', error);
        });
      }
    }
  };

  private closeCommunicator = (): void => {
    this.isDisconnectedAnimation = true;
    this.$timeout(() => {
      this.isClosed = true;
      this.cleanupComponent();
    }, CommunicatorComponentController.disconnectedAnimationTimeout);
  };

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
  };

  private onCallEnd = (): void => {
    this.closeCommunicator();
  };

  private attachTrackToElement = (element: ng.IAugmentedJQuery, track: MediaStreamTrack): void => {
    const stream = new MediaStream([track]);
    try {
      element.prop({ srcObject: stream });
    } catch (_err) {
      element.attr('src', this.$window.URL.createObjectURL(stream));
    }
  };
}
