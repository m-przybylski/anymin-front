(function () {

  function service($q, $log, navigatorService, UtilsService, communicatorService, ServiceApi, modalsService,
                   soundsService, User, RatelApi) {

    const callingTimeout = 30
    const moneyChangeNotificationInterval = 1000

    let call = null
    let timer = null
    let isConnecting = false

    let serviceId = null
    let serviceFreeMinutesCount = null

    let localStreamElement = null
    let remoteStreamElement = null

    let localStream = null

    let callingModal = null

    const events = {
      onCallEnd: 'onCallEnd',
      onClientCallPending: 'onClientCallPending',
      onClientCallPendingError: 'onClientCallPendingError',
      onClientCallStarted: 'onClientCallStarted',
      onExpertCallAnswered: 'onExpertCallAnswered',
      onTimeCostChange: 'onTimeCostChange',
      onVideoStart: 'onVideoStart',
      onVideoStop: 'onVideoStop'
    }

    const reasons = {
      reject: 'reject',
      hangup: 'hangup'
    }

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    const setLocalStreamElement = (element) =>
      localStreamElement = element

    const setRemoteStreamElement = (element) =>
      remoteStreamElement = element

    const stopLocalStream = () => {
      if (localStream) {
        if (localStream.stop) {
          localStream.stop()
        } else {
          localStream.getTracks().forEach(t => t.stop())
        }
      }
    }

    const setLocalStream = (stream) => {
      if (stream) {
        localStream = stream
        localStreamElement.attr('src', window.URL.createObjectURL(localStream))
      }
    }

    const destroyModals = () => {
      if (callingModal) {
        callingModal.dismiss()
      }
    }

    const startHookMock = (expertId) =>
      RatelApi.ratelCallStartedHook({
        callId: call.id,
        clientId: User.getData('id'),
        expertId: expertId,
        serviceId: serviceId,
        timestamp: Date.now()
      }).$promise.then((res) => $log.debug('Hook Start', res), (err) => $log.error('Hook Start error:', err))

    const stopHookMock = () => {
      if (call) {
        RatelApi.ratelCallStoppedHook({
          callId: call.id,
          timestamp: Date.now()
        }).$promise.then((res) => $log.debug('Hook Stop', res), (err) => $log.error('Hook Stop error:', err))
      }
    }


    const cleanupService = () => {
      stopLocalStream()
      cleanCallVariables()
      stopSounds()
      destroyModals()
    }

    const stopSounds = () => {
      soundsService.callConnectingSound().stop()
      soundsService.callIncomingSound().stop()
      soundsService.playCallEnded()
    }

    const cleanCallVariables = () => {
      call = null
      isConnecting = false
      serviceId = null
      serviceFreeMinutesCount = null
      localStream = null
      if (timer) {
        timer.stop()
        timer = null
      }
    }

    let hangupCall = _ => $q.reject('NO CALL')

    const onClientCallEnd = () => {
      stopHookMock()
      callbacks.notify(events.onCallEnd, null)
      if (!isConnecting) {
        modalsService.createClientConsultationSummaryModal(serviceId)
      }
      cleanupService()
    }

    const onExpertCallEnd = () => {
      callbacks.notify(events.onCallEnd, null)
      modalsService.createExpertConsultationSummaryModal(serviceId)
      cleanupService()
    }

    const clientHangupCall = () => {
      if (call) {
        return call.leave(reasons.hangup).then(onClientCallEnd)
      }
      return $q.reject('There is no room')
    }

    const expertHangupCall = () => {
      if (call) {
        return call.leave(reasons.hangup).then(onExpertCallEnd)
      }
      return $q.reject('There is no room')
    }

    const stopVideo = () => {
      if (call) {
        call.pause()
      } else {
        $log.error('There is no call')
      }
    }

    const startVideo = () => {
      if (call) {
        call.unpause()
      } else {
        $log.error('There is no call')
      }
    }

    const startAudio = () => {
      if (call) {
        call.unmute()
      } else {
        $log.error('There is no call')
      }
    }

    const stopAudio = () => {
      if (call) {
        call.mute()
      } else {
        $log.error('There is no call')
      }
    }

    const setCallVideoEvents = (_call, participantId) => {
      _call.onStreamPaused(callAction => {
          if (callAction.user === participantId) {
            callbacks.notify(events.onVideoStop, null)
          }
        }
      )
      _call.onStreamUnpaused(callAction => {
        if (callAction.user === participantId) {
          callbacks.notify(events.onVideoStart, null)
        }
      })
    }

    const createTimer = (price, freeMinutesCount) =>
      timer = UtilsService.callTimerFactory.getInstance(price, freeMinutesCount, moneyChangeNotificationInterval)

    const startTimer = () =>
      timer.start(onTimeMoneyChange)

    const onTimeMoneyChange = (timeMoneyTuple) =>
      callbacks.notify(events.onTimeCostChange, timeMoneyTuple)

    const onExpertCallAnswered = (serviceInvitationTuple) => {
      soundsService.callIncomingSound().stop()
      serviceId = serviceInvitationTuple.service.id

      callbacks.notify(events.onExpertCallAnswered, serviceInvitationTuple)
      call = serviceInvitationTuple.invitation.call
      call.pause()
      call.onEnd(onCallEnd)
      call.onRemoteStream((agentId, stream) =>
        remoteStreamElement.attr('src', window.URL.createObjectURL(stream)))
      call.onLeft(onExpertCallEnd)

      createTimer(serviceInvitationTuple.service.details.price, serviceFreeMinutesCount)
      startTimer()

      hangupCall = expertHangupCall
      setCallVideoEvents(call, serviceInvitationTuple.invitation.inviter)
      //callbacks.notify(events.onExpertCallJoined, {inviter: inviterId, session: session})
    }

    const onAnswerCallError = (err) => {
      cleanupService()
      $log.error(err)
      alert("Call does not exist anymore")
    }

    const answerCall = (serviceInvitationTuple) =>
      navigatorService.getUserMediaStream()
        .then(_localStream => {
            setLocalStream(_localStream)
            return serviceInvitationTuple.invitation.call.answer(localStream).then(_ =>
              onExpertCallAnswered(serviceInvitationTuple),
              onAnswerCallError
            )
          },
          () => rejectCall(serviceInvitationTuple.invitation.call)
        )

    const rejectCall = (_call) => {
      cleanCallVariables()
      stopSounds()
      soundsService.playCallRejected()
      return _call.reject(reasons.reject)
    }

    const onCallEnd = () => {
      stopHookMock()
      cleanupService()
      callbacks.notify(events.onCallEnd, null)
    }

    const onExpertCallIncoming = (serviceInvitationTuple) => {
      soundsService.callIncomingSound().play()

      serviceInvitationTuple.invitation.call.onEnd(onExpertCallDisappearBeforeAnswering)

      callingModal = modalsService.createIncomingCallModal(
        serviceInvitationTuple.service,
        () => answerCall(serviceInvitationTuple),
        () => rejectCall(serviceInvitationTuple.invitation.call)
      )
    }

    communicatorService.onCall(onExpertCallIncoming)

    const onNoFunds = () => {
      modalsService.createNoFundsModal(_ => _, _ => _)
    }

    const onConsultationUnavailable = () => {
      cleanupService()
      soundsService.playCallRejected()
      modalsService.createServiceUnavailableModal(_ => _, _ => _)
    }

    const onExpertCallDisappearBeforeAnswering = () => {
      cleanupService()
      soundsService.playCallRejected()
    }

    const onClientCallStartError = (err) => {
      onConsultationUnavailable()
      $log.error(err)
      // _onNoFunds()
    }

    const onClientCallStarted = (inviterId, expertId) => {
      isConnecting = false
      startHookMock(expertId)
      startTimer()
      soundsService.callConnectingSound().stop()
      call.pause()
      callbacks.notify(events.onClientCallStarted, inviterId)
    }

    const onClientCallRejected = () => {
      callbacks.notify(events.onCallEnd, null)
      onConsultationUnavailable()
    }

    const onCreateDirectCall = (newCall, participantId, expertId) => {
      call = newCall

      call.onRemoteStream((agentId, stream) => {
        remoteStreamElement.attr('src', window.URL.createObjectURL(stream))
      })

      call.onJoined(_ => onClientCallStarted(participantId, expertId))
      call.onLeft(onClientCallEnd)
      call.onEnd(onCallEnd)
      call.onRejected(onClientCallRejected)
      setCallVideoEvents(call, participantId)
    }

    const onDirectCallError = (err) => {
      $log.error(err)
      soundsService.callConnectingSound().stop()
    }

    const onAddSUR = (serviceUsageRequest) => {

      const _service = serviceUsageRequest.service

      const agentId = serviceUsageRequest.agentId

      serviceId = _service.id

      createTimer(_service.details.price, serviceFreeMinutesCount)

      callbacks.notify(events.onClientCallPending, {
        expert: serviceUsageRequest.expert,
        service: serviceUsageRequest.service
      })

      hangupCall = clientHangupCall

      soundsService.callConnectingSound().play()

      const session = communicatorService.getClientSession()

      return navigatorService.getUserMediaStream()
        .then(_localStream => {
          setLocalStream(_localStream)
          return session.chat.createDirectCall(localStream, agentId, callingTimeout)
        })
        .then(_call => onCreateDirectCall(_call, agentId, serviceUsageRequest.expert.id), onDirectCallError)
    }

    const onAddSURError = (err) => {
      onClientCallStartError(err)
      soundsService.callConnectingSound().stop()
      return $q.reject(err)
    }

    const startCall = (_serviceId) => {
      if (!angular.isDefined(_serviceId) || !_serviceId) {
        return $q.reject('serviceId must be defined')
      }

      if (!communicatorService.getClientSession()) {
        return $q.reject('There is no client session')
      }

      if (call || isConnecting) {
        return $q.reject('There is a call already')
      }

      isConnecting = true

      return ServiceApi.addServiceUsageRequest({serviceId: _serviceId})
        .$promise
        .then(onAddSUR, onAddSURError)
    }

    const api = {
      callServiceId: startCall,
      startVideo: startVideo,
      stopVideo: stopVideo,
      startAudio: startAudio,
      stopAudio: stopAudio,
      hangupCall: _ => hangupCall(),
      setLocalStreamElement: setLocalStreamElement,
      setRemoteStreamElement: setRemoteStreamElement
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.call', [
    'profitelo.services.navigator',
    'profitelo.services.communicator',
    'profitelo.swaggerResources',
    'profitelo.services.utils',
    'profitelo.services.modals',
    'profitelo.services.sounds'
  ])
    .service('callService', service)

}())
