namespace profitelo.services.call {

  import INavigatorService = profitelo.services.navigator.INavigatorService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import ServiceUsageRequest = profitelo.models.ServiceUsageRequest
  import IModalsService = profitelo.services.modals.IModalsService
  import ISoundsService = profitelo.services.sounds.ISoundsService
  import ICallbacksFactory = profitelo.services.callbacks.ICallbacksFactory
  import ICallbacksService = profitelo.services.callbacks.ICallbacksService
  import ITimerFactory = profitelo.services.timer.ITimerFactory
  import ITimerService = profitelo.services.timer.ITimerService
  import ExpertProfile = profitelo.models.ExpertProfile
  import Money = profitelo.models.Money

  export interface ICallService {
    onCallEnd(cb: () => void): void
    onClientCallPending(cb: (data: {service: Service, expert: ExpertProfile}) => void): void
    onClientCallStarted(cb: (inviterId: string) => void): void
    onExpertCallAnswered(cb: (data: {invitation: any, service: Service}) => void): void
    onTimeCostChange(cb: (data: {time: number, money: Money}) => void): void
    onVideoStart(cb: () => void): void
    onVideoStop(cb: () => void): void
    callServiceId(serviceId: string)
    startVideo(): void
    stopVideo(): void
    startAudio(): void
    stopAudio(): void
    hangupCall(): ng.IPromise<any>
    setLocalStreamElement(element: ng.IAugmentedJQuery): void
    setRemoteStreamElement(element: ng.IAugmentedJQuery): void
  }

  class CallService implements ICallService {

    private call: any = null
    private timer: ITimerService | null = null

    private isConnecting: boolean = false

    private serviceId: string | null
    private serviceFreeMinutesCount: number | null

    private localStreamElement: ng.IAugmentedJQuery | null = null
    private remoteStreamElement: ng.IAugmentedJQuery | null = null

    private localStream: MediaStream | null = null
    private callingModal: any

    private callbacks: ICallbacksService
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

    constructor(private $q: ng.IQService, private $log: ng.ILogService, private navigatorService: INavigatorService,
                callbacksFactory: ICallbacksFactory, private communicatorService: ICommunicatorService,
                private modalsService: IModalsService, private soundsService: ISoundsService, private User: any,
                private timerFactory: ITimerFactory, private RatelApi: any, private ServiceApi: any) {

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

    public onCallEnd = (callback) =>
      this.callbacks.methods.onCallEnd(callback)

    public onClientCallPending = (callback) =>
      this.callbacks.methods.onClientCallPending(callback)

    public onClientCallStarted = (callback) =>
      this.callbacks.methods.onClientCallStarted(callback)

    public onExpertCallAnswered = (callback) =>
      this.callbacks.methods.onExpertCallAnswered(callback)

    public onTimeCostChange = (callback) =>
      this.callbacks.methods.onTimeCostChange(callback)

    public onVideoStart = (callback) =>
      this.callbacks.methods.onVideoStart(callback)

    public onVideoStop = (callback) =>
      this.callbacks.methods.onVideoStop(callback)

    private stopLocalStream = () => {
      if (this.localStream) {
        if (this.localStream.stop) {
          this.localStream.stop()
        } else {
          this.localStream.getTracks().forEach(t => t.stop())
        }
      }
    }

    private setLocalStream = (stream) => {
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

    private startHookMock = (expertId: string) =>
      this.RatelApi.ratelCallStartedHook({
        callId: this.call.id,
        clientId: this.User.getData('id'),
        expertId: expertId,
        serviceId: this.serviceId,
        timestamp: Date.now()
      }).$promise.then((res) => this.$log.debug('Hook Start', res), (err) => this.$log.error('Hook Start error:', err))

    private stopHookMock = () => {
      if (this.call) {
        this.RatelApi.ratelCallStoppedHook({
          callId: this.call.id,
          timestamp: Date.now()
        }).$promise.then((res) => this.$log.debug('Hook Stop', res), (err) => this.$log.error('Hook Stop error:', err))
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
      this.serviceFreeMinutesCount = null
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

    private setCallVideoEvents = (_call, participantId) => {
      _call.onStreamPaused(callAction => {
          if (callAction.user === participantId) {
            this.callbacks.notify(CallService.events.onVideoStop, null)
          }
        }
      )
      _call.onStreamUnpaused(callAction => {
        if (callAction.user === participantId) {
          this.callbacks.notify(CallService.events.onVideoStart, null)
        }
      })
    }

    private createTimer = (price, freeMinutesCount) =>
      this.timer = this.timerFactory.getInstance(
        price, freeMinutesCount, CallService.moneyChangeNotificationInterval)

    private startTimer = () => {
      if (this.timer) this.timer.start(this.onTimeMoneyChange)
    }

    private onTimeMoneyChange = (timeMoneyTuple) =>
      this.callbacks.notify(CallService.events.onTimeCostChange, timeMoneyTuple)

    private onExpertCallAnsweredEvent = (serviceInvitationTuple) => {
      this.soundsService.callIncomingSound().stop()
      this.serviceId = serviceInvitationTuple.service.id

      this.callbacks.notify(CallService.events.onExpertCallAnswered, serviceInvitationTuple)
      this.call = serviceInvitationTuple.invitation.call
      this.call.pause()
      this.call.onEnd(this.onCallEndEvent)
      this.call.onRemoteStream((_agentId, stream) => {
        if (this.remoteStreamElement) {
          this.remoteStreamElement.attr('src', window.URL.createObjectURL(stream))
        }
        else {
          this.$log.error("remoteStreamElement not set")
        }
      })
      this.call.onLeft(this.onExpertCallEnd)

      this.createTimer(serviceInvitationTuple.service.details.price, this.serviceFreeMinutesCount)
      this.startTimer()

      this.hangupFunction = this.expertHangupCall
      this.setCallVideoEvents(this.call, serviceInvitationTuple.invitation.inviter)
      //callbacks.notify(events.onExpertCallJoined, {inviter: inviterId, session: session})
    }

    private onAnswerCallError = (err) => {
      this.cleanupService()
      this.$log.error(err)
      alert("Call does not exist anymore")
    }

    private answerCall = (serviceInvitationTuple) =>
      this.navigatorService.getUserMediaStream()
        .then(_localStream => {
            this.setLocalStream(_localStream)
            return serviceInvitationTuple.invitation.call.answer(this.localStream).then(_ =>
                this.onExpertCallAnsweredEvent(serviceInvitationTuple),
              this.onAnswerCallError
            )
          },
          () => this.rejectCall(serviceInvitationTuple.invitation.call)
        )

    private rejectCall = (_call) => {
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

    private onExpertCallIncoming = (serviceInvitationTuple) => {
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
      this.modalsService.createServiceUnavailableModal(() => _, () => _)
    }

    private onExpertCallDisappearBeforeAnswering = () => {
      this.cleanupService()
      this.soundsService.playCallRejected()
    }

    private onClientCallStartError = (err) => {
      this.onConsultationUnavailable()
      this.$log.error(err)
      // _onNoFunds()
    }

    private onClientCallStartedEvent = (inviterId, expertId) => {
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

    private onCreateDirectCall = (newCall, participantId: string, expertId: string) => {
      this.call = newCall

      this.call.onRemoteStream((_agentId, stream) => {
        if (this.remoteStreamElement) {
          this.remoteStreamElement.attr('src', window.URL.createObjectURL(stream))
        }
        else {
          this.$log.error('remoteStreamElement not set')
        }
      })

      this.call.onJoined(_ => this.onClientCallStartedEvent(participantId, expertId))
      this.call.onLeft(this.onClientCallEnd)
      this.call.onEnd(this.onCallEndEvent)
      this.call.onRejected(this.onClientCallRejected)
      this.setCallVideoEvents(this.call, participantId)
    }

    private onDirectCallError = (err) => {
      this.$log.error(err)
      this.soundsService.callConnectingSound().stop()
    }

    private onAddSUR = (serviceUsageRequest: ServiceUsageRequest) => {

      const _service = serviceUsageRequest.service
      const agentId = serviceUsageRequest.agentId

      this.serviceId = _service.id
      this.createTimer(_service.details.price, this.serviceFreeMinutesCount)

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

    private onAddSURError = (err) => {
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

      return this.ServiceApi.addServiceUsageRequest({serviceId: _serviceId})
        .$promise
        .then(this.onAddSUR, this.onAddSURError)
    }
  }

  angular.module('profitelo.services.call', [
    'profitelo.services.navigator',
    'profitelo.services.communicator',
    'profitelo.swaggerResources',
    'profitelo.services.timer',
    'profitelo.services.callbacks',
    'profitelo.services.modals',
    'profitelo.services.sounds'
  ])
    .config(($qProvider) => {
      $qProvider.errorOnUnhandledRejections(false)
    })
    .service('callService', CallService)
}
