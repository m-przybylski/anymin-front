import * as angular from "angular"
import {CallbacksService} from "../../services/callbacks/callbacks.service"
import {TimerService} from "../../services/timer/timer.service"
import {GetService} from "../../api/model/GetService"
import {GetProfile} from "../../api/model/GetProfile"
import {MoneyDto} from "../../api/model/MoneyDto"
import {CallbacksFactory} from "../../services/callbacks/callbacks.factory"
import {NavigatorService} from "../../services/navigator/navigator.service"
import {CommunicatorService} from "./communicator.service"
import {SoundsService} from "../../services/sounds/sounds.service"
import {ModalsService} from "../../services/modals/modals.service"
import {TimerFactory} from "../../services/timer/timer.factory"
import {UserService} from "../../services/user/user.service"
import {RatelApi} from "../../api/api/RatelApi"
import {ServiceApi} from "../../api/api/ServiceApi"
import {GetServiceUsageRequest} from "../../api/model/GetServiceUsageRequest"

export class CallService {

  private call: any = null
  private timer: TimerService | null = null

  private isConnecting: boolean = false

  private serviceId: string | null
  private serviceFreeMinutesCount: number = 0

  private localStreamElement: ng.IAugmentedJQuery | null = null
  private remoteStreamElement: ng.IAugmentedJQuery | null = null

  private localStream: MediaStream | null = null
  private callingModal: any

  private callbacks: CallbacksService
  private hangupFunction: () => ng.IPromise<any>

  private static callingTimeout: number = 30
  private static moneyChangeNotificationInterval: number = 1000

  private static events = {
    onCallEnd: 'onCallEnd',
    onClientCallPending: 'onClientCallPending',
    onClientCallStarted: 'onClientCallStarted',
    onExpertCallAnswered: 'onExpertCallAnswered',
    onTimeCostChange: 'onTimeCostChange',
    onVideoStart: 'onVideoStart',
    onVideoStop: 'onVideoStop'
  }

  private static reasons = {
    reject: 'reject',
    hangup: 'hangup'
  }

  /* @ngInject */
  constructor(private $q: ng.IQService, private $log: ng.ILogService, private navigatorService: NavigatorService,
              callbacksFactory: CallbacksFactory, private communicatorService: CommunicatorService,
              private modalsService: ModalsService, private soundsService: SoundsService, private userService: UserService,
              private timerFactory: TimerFactory, private RatelApi: RatelApi, private ServiceApi: ServiceApi) {

    this.hangupFunction = () => $q.reject('NO CALL')
    this.callbacks = callbacksFactory.getInstance(Object.keys(CallService.events))
    communicatorService.onCall(this.onExpertCallIncoming)
  }

  public setLocalStreamElement = (element: ng.IAugmentedJQuery) =>
    this.localStreamElement = element

  public setRemoteStreamElement = (element: ng.IAugmentedJQuery) =>
    this.remoteStreamElement = element

  public hangupCall = () =>
    this.hangupFunction()

  public stopVideo = () => {
    if (this.call) {
      this.call.pause()
    } else {
      this.$log.error('There is no call')
    }
  }

  public startVideo = () => {
    if (this.call) {
      this.call.unpause()
    } else {
      this.$log.error('There is no call')
    }
  }

  public startAudio = () => {
    if (this.call) {
      this.call.unmute()
    } else {
      this.$log.error('There is no call')
    }
  }

  public stopAudio = () => {
    if (this.call) {
      this.call.mute()
    } else {
      this.$log.error('There is no call')
    }
  }

  public onCallEnd = (cb: () => void) =>
    this.callbacks.methods.onCallEnd(cb)

  public onClientCallPending = (cb: (data: {service: GetService, expert: GetProfile}) => void) =>
    this.callbacks.methods.onClientCallPending(cb)

  public onClientCallStarted = (cb: (inviterId: string) => void) =>
    this.callbacks.methods.onClientCallStarted(cb)

  public onExpertCallAnswered = (cb: (data: {invitation: any, service: GetService}) => void) =>
    this.callbacks.methods.onExpertCallAnswered(cb)

  public onTimeCostChange = (cb: (data: {time: number, money: MoneyDto}) => void) =>
    this.callbacks.methods.onTimeCostChange(cb)

  public onVideoStart = (cb: () => void) =>
    this.callbacks.methods.onVideoStart(cb)

  public onVideoStop = (cb: () => void) =>
    this.callbacks.methods.onVideoStop(cb)

  private stopLocalStream = () => {
    if (this.localStream) {
      if (this.localStream.stop) {
        this.localStream.stop()
      } else {
        this.localStream.getTracks().forEach(t => t.stop())
      }
    }
  }

  private setLocalStream = (stream: MediaStream) => {
    if (stream) {
      this.localStream = stream
      if (this.localStreamElement) {
        this.localStreamElement.attr('src', window.URL.createObjectURL(this.localStream))
      }
    }
  }

  private destroyModals = () => {
    if (this.callingModal) {
      this.callingModal.dismiss()
    }
  }

  private startHookMock = (expertId: string) => {
    this.userService.getUser().then(user => {
      if (this.serviceId) {
        this.RatelApi.ratelCallStartedHookRoute({
          callId: this.call.id,
          clientId: user.id,
          expertId: expertId,
          serviceId: this.serviceId,
          timestamp: Date.now()
        }).then(
          (res) => this.$log.debug('Hook Start', res),
          (err) => this.$log.error('Hook Start error:', err)
        )
      }
    })
  }

  private stopHookMock = () => {
    if (this.call) {
      this.RatelApi.ratelCallStoppedHookRoute({
        callId: this.call.id,
        timestamp: Date.now()
      }).then(
        (res) => this.$log.debug('Hook Stop', res),
        (err) => this.$log.error('Hook Stop error:', err)
      )
    }
  }

  private cleanupService = () => {
    this.stopLocalStream()
    this.cleanCallVariables()
    this.stopSounds()
    this.destroyModals()
  }

  private stopSounds = () => {
    this.soundsService.callConnectingSound().stop()
    this.soundsService.callIncomingSound().stop()
    this.soundsService.playCallEnded()
  }

  private cleanCallVariables = () => {
    this.call = null
    this.isConnecting = false
    this.serviceId = null
    this.serviceFreeMinutesCount = 0
    this.localStream = null
    if (this.timer) {
      this.timer.stop()
      this.timer = null
    }
  }

  private onClientCallEnd = () => {
    this.stopHookMock()
    this.callbacks.notify(CallService.events.onCallEnd, null)
    if (!this.isConnecting && this.serviceId) {
      this.modalsService.createClientConsultationSummaryModal(this.serviceId)
    }
    this.cleanupService()
  }

  private onExpertCallEnd = () => {
    this.callbacks.notify(CallService.events.onCallEnd, null)
    if (this.serviceId) {
      this.modalsService.createExpertConsultationSummaryModal(this.serviceId)
    }
    this.cleanupService()
  }

  private clientHangupCall = () => {
    if (this.call) {
      return this.call.leave(CallService.reasons.hangup).then(this.onClientCallEnd)
    }
    return this.$q.reject('There is no room')
  }

  private expertHangupCall = () => {
    if (this.call) {
      return this.call.leave(CallService.reasons.hangup).then(this.onExpertCallEnd)
    }
    return this.$q.reject('There is no room')
  }

  private setCallVideoEvents = (_call: any, participantId: any) => {
    _call.onStreamPaused((callAction: any) => {
        if (callAction.user === participantId) {
          this.callbacks.notify(CallService.events.onVideoStop, null)
        }
      }
    )
    _call.onStreamUnpaused((callAction: any) => {
      if (callAction.user === participantId) {
        this.callbacks.notify(CallService.events.onVideoStart, null)
      }
    })
  }

  private createTimer = (price: MoneyDto, freeMinutesCount: number) =>
    this.timer = this.timerFactory.getInstance(
      price, freeMinutesCount, CallService.moneyChangeNotificationInterval)

  private startTimer = () => {
    if (this.timer) this.timer.start(this.onTimeMoneyChange)
  }

  private onTimeMoneyChange = (timeMoneyTuple: {time: number, money: MoneyDto}) =>
    this.callbacks.notify(CallService.events.onTimeCostChange, timeMoneyTuple)

  private onExpertCallAnsweredEvent = (serviceInvitationTuple: {service: GetService, invitation: any}) => {
    this.soundsService.callIncomingSound().stop()
    this.serviceId = serviceInvitationTuple.service.id

    this.callbacks.notify(CallService.events.onExpertCallAnswered, serviceInvitationTuple)
    this.call = serviceInvitationTuple.invitation.call
    this.call.pause()
    this.call.onEnd(this.onCallEndEvent)
    this.call.onRemoteStream((_agentId: string, stream: MediaStream) => {
      if (this.remoteStreamElement) {
        this.remoteStreamElement.attr('src', window.URL.createObjectURL(stream))
      }
      else {
        this.$log.error("remoteStreamElement not set")
      }
    })
    this.call.onLeft(this.onExpertCallEnd)

    this.createTimer(serviceInvitationTuple.service.details!.price, this.serviceFreeMinutesCount)
    this.startTimer()

    this.hangupFunction = this.expertHangupCall
    this.setCallVideoEvents(this.call, serviceInvitationTuple.invitation.inviter)
    //callbacks.notify(events.onExpertCallJoined, {inviter: inviterId, session: session})
  }

  private onAnswerCallError = (err: any) => {
    this.cleanupService()
    this.$log.error(err)
    alert("Call does not exist anymore")
  }

  private answerCall = (serviceInvitationTuple: {service: GetService, invitation: any}) =>
    this.navigatorService.getUserMediaStream()
      .then(_localStream => {
          this.setLocalStream(_localStream)
          return serviceInvitationTuple.invitation.call.answer(this.localStream).then(() =>
              this.onExpertCallAnsweredEvent(serviceInvitationTuple),
            this.onAnswerCallError
          )
        },
        () => this.rejectCall(serviceInvitationTuple.invitation.call)
      )

  private rejectCall = (_call: any) => {
    this.cleanCallVariables()
    this.stopSounds()
    this.soundsService.playCallRejected()
    return _call.reject(CallService.reasons.reject)
  }

  private onCallEndEvent = () => {
    this.stopHookMock()
    this.cleanupService()
    this.callbacks.notify(CallService.events.onCallEnd, null)
  }

  private onExpertCallIncoming = (serviceInvitationTuple: {service: GetService, invitation: any}) => {
    this.soundsService.callIncomingSound().play()

    serviceInvitationTuple.invitation.call.onEnd(this.onExpertCallDisappearBeforeAnswering)

    this.callingModal = this.modalsService.createIncomingCallModal(
      serviceInvitationTuple.service,
      () => this.answerCall(serviceInvitationTuple),
      () => this.rejectCall(serviceInvitationTuple.invitation.call)
    )
  }

  // FIXME
  /*private onNoFunds = () => {
   this.modalsService.createNoFundsModal(() => _, () => _)
   }*/

  private onConsultationUnavailable = () => {
    this.cleanupService()
    this.soundsService.playCallRejected()
    this.modalsService.createServiceUnavailableModal(() => {}, () => {})
  }

  private onExpertCallDisappearBeforeAnswering = () => {
    this.cleanupService()
    this.soundsService.playCallRejected()
  }

  private onClientCallStartError = (err: any) => {
    this.onConsultationUnavailable()
    this.$log.error(err)
    // _onNoFunds()
  }

  private onClientCallStartedEvent = (inviterId: string, expertId: string) => {
    this.isConnecting = false
    this.startHookMock(expertId)
    this.startTimer()
    this.soundsService.callConnectingSound().stop()
    this.call.pause()
    this.callbacks.notify(CallService.events.onClientCallStarted, inviterId)
  }

  private onClientCallRejected = () => {
    this.callbacks.notify(CallService.events.onCallEnd, null)
    this.onConsultationUnavailable()
  }

  private onCreateDirectCall = (newCall: any, participantId: string, expertId: string) => {
    this.call = newCall

    this.call.onRemoteStream((_agentId: string, stream: MediaStream) => {
      if (this.remoteStreamElement) {
        this.remoteStreamElement.attr('src', window.URL.createObjectURL(stream))
      }
      else {
        this.$log.error('remoteStreamElement not set')
      }
    })

    this.call.onJoined(() => this.onClientCallStartedEvent(participantId, expertId))
    this.call.onLeft(this.onClientCallEnd)
    this.call.onEnd(this.onCallEndEvent)
    this.call.onRejected(this.onClientCallRejected)
    this.setCallVideoEvents(this.call, participantId)
  }

  private onDirectCallError = (err: any) => {
    this.$log.error(err)
    this.soundsService.callConnectingSound().stop()
  }

  private onAddSUR = (serviceUsageRequest: GetServiceUsageRequest) => {

    const _service = serviceUsageRequest.service
    const agentId = serviceUsageRequest.agentId

    this.serviceId = _service.id
    this.createTimer(_service.details!.price, this.serviceFreeMinutesCount)

    this.callbacks.notify(CallService.events.onClientCallPending, {
      expert: serviceUsageRequest.expert,
      service: serviceUsageRequest.service
    })

    this.hangupFunction = this.clientHangupCall
    this.soundsService.callConnectingSound().play()

    const session = this.communicatorService.getClientSession()

    return this.navigatorService.getUserMediaStream()
      .then(_localStream => {
        this.setLocalStream(_localStream)
        return session.chat.createDirectCall(this.localStream, agentId, CallService.callingTimeout)
      })
      .then(_call => this.onCreateDirectCall(_call, agentId, serviceUsageRequest.expert.id), this.onDirectCallError)
  }

  private onAddSURError = (err: any) => {
    this.onClientCallStartError(err)
    this.soundsService.callConnectingSound().stop()
    return this.$q.reject(err)
  }

  public callServiceId = (_serviceId: string) => {
    if (!angular.isDefined(_serviceId) || !_serviceId) {
      return this.$q.reject('serviceId must be defined')
    }

    if (!this.communicatorService.getClientSession()) {
      return this.$q.reject('There is no client session')
    }

    if (this.call || this.isConnecting) {
      return this.$q.reject('There is a call already')
    }

    this.isConnecting = true

    return this.ServiceApi.addServiceUsageRequestRoute(_serviceId, {})
      .then(this.onAddSUR, this.onAddSURError)

  }
}
