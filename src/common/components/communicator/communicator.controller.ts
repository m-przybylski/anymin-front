import {GetService, GetProfile, MoneyDto} from 'profitelo-api-ng/model/models';
import {ClientCallService} from './call-services/client-call.service';
import {ExpertCallService} from './call-services/expert-call.service';
import {CurrentClientCall} from './models/current-client-call';
import {CurrentExpertCall} from './models/current-expert-call';
import {CurrentCall} from './models/current-call';
import {MessageRoom} from './models/message-room';
import {TopAlertService} from '../../services/top-alert/top-alert.service'
import {TranslatorService} from '../../services/translator/translator.service'

export class CommunicatorComponentController implements ng.IController {

  private static readonly disconnectedAnimationTimeout = 500

  public currentCall?: CurrentCall

  public isClosed: boolean = true
  public isDisconnectedAnimation: boolean = false
  public isConnecting: boolean = false
  public service?: GetService
  public expert?: GetProfile
  public expertAvatar?: string

  public isOffline: boolean = false
  public isParticipantOffline: boolean = false
  public isRemoteVideo: boolean = false
  public isLocalVideo: boolean = false
  public isMessenger: boolean = false
  public isOneMinuteLeftWarning: boolean = false
  public callLengthInSeconds: number = 0
  public callCost?: MoneyDto

  public localStreamElement: ng.IAugmentedJQuery
  public remoteStreamElement: ng.IAugmentedJQuery

  public messageRoom: MessageRoom

  /* @ngInject */
  constructor(private $element: ng.IRootElementService,
              private $timeout: ng.ITimeoutService,
              private $window: ng.IWindowService,
              private translatorService: TranslatorService,
              private topAlertService: TopAlertService,
              clientCallService: ClientCallService,
              expertCallService: ExpertCallService) {

    clientCallService.onNewCall(this.registerClientCall)
    clientCallService.onOneMinuteLeftWarning(this.onOneMinuteLeftWarning)
    clientCallService.onNewFinancialOperation(this.onNewFinancialOperation)

    expertCallService.onNewCall(this.registerExpertCall)
    expertCallService.onCallPull(this.onCallPull)
    expertCallService.onCallTaken(this.closeCommunicator)
  }

  $onInit = (): void => {
    this.remoteStreamElement = this.$element.find('.video-player-remote video')
    this.localStreamElement = this.$element.find('.video-player-local video')

    const communicatorElement: ng.IAugmentedJQuery = this.$element.find('.communicator')
    if (communicatorElement) {
      communicatorElement.on('dragover', (e) => e.preventDefault())
      communicatorElement.on('drop', (e) => e.preventDefault())
    }
  }

  private onOnline = (): void => {
    this.isOffline = false
    if (this.currentCall) this.currentCall.resumeTimer()

    this.topAlertService.success({
      message: this.translatorService.translate('COMMUNICATOR.NETWORK_RECONNECTED'),
      timeout: 2
    })
  }

  private onOffline = (): void => {
    this.isOffline = true
    if (this.currentCall) this.currentCall.pauseTimer()
    this.topAlertService.error({
      message: this.translatorService.translate('COMMUNICATOR.NETWORK_INTERRUPT'),
      timeout: 5
    })
  }

  private registerClientCall = (call: CurrentClientCall): void => {
    this.cleanupComponent()
    this.currentCall = call
    this.service = call.getService()
    this.expert = call.getExpert()
    this.expertAvatar = this.expert.expertDetails ? this.expert.expertDetails.avatar : undefined
    this.isConnecting = true
    this.isClosed = false
    this.registerCommonCallEvents(call);
  }

  private onCallPull = (call: CurrentExpertCall): void => {
    this.cleanupComponent()
    this.currentCall = call
    this.service = call.getService();
    this.isConnecting = false
    this.isClosed = false
    this.registerCommonCallEvents(call);
  }

  private registerExpertCall = (call: CurrentExpertCall): void => {
    this.cleanupComponent()
    this.currentCall = call
    this.service = call.getService();
    this.isConnecting = true
    this.isClosed = false
    this.registerCommonCallEvents(call);
  }

  private registerCommonCallEvents = (call: CurrentCall): void => {
    const remoteStream = call.getRemoteStream();
    if (remoteStream) this.onRemoteStream(remoteStream);

    const localStream = call.getLocalStream();
    if (localStream) this.onLocalStream(localStream);
    this.messageRoom = call.getMessageRoom();

    this.$window.addEventListener('online', this.onOnline)
    this.$window.addEventListener('offline', this.onOffline)
    call.onLocalStream(this.onLocalStream)
    call.onRemoteStream(this.onRemoteStream)
    call.onEnd(this.onCallEnd)
    call.onRejected(this.onCallEnd)
    call.onVideoStart(this.onVideoStart)
    call.onVideoStop(this.onVideoStop)
    call.onTimeCostChange(this.onTimeCostChange)
    call.onParticipantOnline(this.onUserBackOnline)
    call.onParticipantOffline(this.onUserOffline)
    call.onSuspendedCallEnd(this.closeCommunicator)
    call.onAnswered(this.onAnswered)
  }

  private onTimeCostChange = (timeMoneyTuple: { time: number, money: MoneyDto }): void => {
    this.callLengthInSeconds = timeMoneyTuple.time
    this.callCost = timeMoneyTuple.money
  }

  private onAnswered = (): void => {
    this.isConnecting = false
  }

  private onRemoteStream = (stream: MediaStream): void => {
    this.remoteStreamElement.attr('src', this.$window.URL.createObjectURL(stream))
  }

  private onLocalStream = (stream: MediaStream): void => {
    this.localStreamElement.attr('src', this.$window.URL.createObjectURL(stream))
  }

  private onUserBackOnline = (): void => {
    this.isParticipantOffline = false
  }

  private closeCommunicator = (): void => {
    this.isDisconnectedAnimation = true
    this.$timeout(() => {
      this.isClosed = true
      this.cleanupComponent()
    }, CommunicatorComponentController.disconnectedAnimationTimeout)
  }

  private onUserOffline = (): void => {
    this.isParticipantOffline = true
    this.topAlertService.error({
      message: this.translatorService.translate('COMMUNICATOR.INTERLOCUTOR_NETWORK_INTERRUPT'),
      timeout: 5
    })
  }

  private cleanupComponent = (): void => {
    this.currentCall = undefined
    this.isDisconnectedAnimation = false
    this.isConnecting = false
    this.service = undefined
    this.expert = undefined
    this.isRemoteVideo = false
    this.isLocalVideo = false
    this.isMessenger = false
    this.isParticipantOffline = false
    this.isOffline = false
    this.callLengthInSeconds = 0
    this.callCost = undefined
  }

  private onCallEnd = (): void => {
    this.closeCommunicator()
    this.$window.removeEventListener('online', this.onOnline)
    this.$window.removeEventListener('offline', this.onOffline)
  }

  /* Other events */
  private onVideoStart = (): void => {
    this.isRemoteVideo = true
  }

  private onVideoStop = (): void => {
    this.isRemoteVideo = false
  }

  private onOneMinuteLeftWarning = (): void => {
    this.isOneMinuteLeftWarning = true
  }

  private onNewFinancialOperation = (data: any): void => {
    if (this.callCost && this.callCost.amount < data.operation.amount) this.isOneMinuteLeftWarning = false
  }
}
