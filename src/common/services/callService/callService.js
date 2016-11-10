(function() {

  function service($q, $log, UtilsService, communicatorService, ServiceApi, modalsService) {

    let call = null
    let timer = null
    let serviceUsageData = null
    let expertService = null
    const freeMinutesCount = 1

    const events = {
      onHangup: 'onHangup',
      onClientCallHangup: 'onClientCallHangup',
      onClientCallPending: 'onClientCallPending',
      onClientCallStart: 'onClientCallStart',
      onClientCallPendingError: 'onClientCallPendingError',
      onClientCallStarted: 'onClientCallStarted',
      onClientCallRejected: 'onClientCallRejected',
      onExpertCallIncoming: 'onExpertCallIncoming',
      onExpertCallAnswer: 'onExpertCallAnswer',
      onExpertCallJoin: 'onExpertCallJoin',
      onExpertCallReject: 'onExpertCallReject',
      onTimeCostChange: 'onTimeCostChange'
    }

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    const hangupCall = () => {
      if (call) {
        return call.hangup().then(result => {
          callbacks.notify(events.onHangup, null)
          timer.stop()
          serviceUsageData = null
          expertService = null
          timer = null
          call = null

          return $q.resolve(result)
        })
      }
      return $q.resolve(null)
    }

    const setLocalStreamElement = (element) => {
      if (call) {
        call.setLocalStreamElement(element)
      }
    }

    const setRemoteStreamElement = (element) => {
      if (call) {
        call.setRemoteStreamElement(element)
      }
    }

    const toggleVideo = () => {
      if (call) {
        return call.toggleVideo()
      }
    }

    const toggleAudio = () => {
      if (call) {
        return call.toggleAudio()
      }
    }

    const _onExpertCallHangup = () => {
      timer.stop()
      timer = null
      callbacks.notify(events.onHangup, null)
    }

    const _onTimeCostChange = timeCost =>
      callbacks.notify(events.onTimeCostChange, timeCost)

    const _onExpertCallJoin = (_inviter, session) => {
      let price = 0
      if (serviceUsageData) {
        price = serviceUsageData.service.details.price
      } else {
        price = expertService.details.price
      }
      timer = UtilsService.timerFactory.getInstance(price, freeMinutesCount)
      timer.start(_onTimeCostChange)
      callbacks.notify(events.onExpertCallJoin, {inviter: _inviter, session: session})
    }

    const _answerCall = (callInvitation, session) => {
      call = callInvitation.call
      call.join().then(_ => {
        _onExpertCallJoin(callInvitation.inviter, session)
      })
      call.onLeft(_ => {
        _onExpertCallHangup()
      })
      callbacks.notify(events.onExpertCallAnswer, callInvitation)
    }

    const _rejectCall = (callInvitation) => {
      callInvitation.call.reject()
      callbacks.notify(events.onExpertCallReject, callInvitation)
    }

    const _onExpertCallIncoming = (callInvitation, _service, session) => {
      modalsService.createIncomingCallModal(_service, () => {
        _answerCall(callInvitation, session)
      }, () => {
        _rejectCall(callInvitation)
      })

      $log.info('EXPERT received call invitation: ', callInvitation)

      expertService = _service

      callbacks.notify(events.onExpertCallIncoming, _service)
      call = callInvitation.call
    }

    communicatorService.onCall(obj =>
      _onExpertCallIncoming(obj.invitation, obj.service, obj.session))

    const _onNoFunds = () => {
      modalsService.createNoFundsModal(_ => _, _ => _)
    }

    const _onConsultationUnavailable = () => {
      modalsService.createServiceUnavailableModal(_ => _, _ => _)
    }

    const _onClientCallReject = () => {
      _onConsultationUnavailable()
    }

    const _onClientCallStartError = (err) => {
      callbacks.notify(events.onClientCallPendingError, err)
      _onConsultationUnavailable()
      // _onNoFunds()
    }

    const _onClientCallStarted = (_inviterId) => {
      timer = UtilsService.timerFactory.getInstance(serviceUsageData.service.details.price, freeMinutesCount)
      timer.start(_onTimeCostChange)
      callbacks.notify(events.onClientCallStarted, _inviterId)
    }

    const _onClientCallStart = (_serviceId) => {
      callbacks.notify(events.onClientCallStart, _serviceId)
    }

    const _onClientCallPending = (serviceUsageRequest) => {
      serviceUsageData = serviceUsageRequest
      callbacks.notify(events.onClientCallPending, serviceUsageRequest)
    }

    const _onClientCallHangup = () => {
      callbacks.notify(events.onClientCallHangup, null)
      timer.stop()
      timer = null
      // modalsService.createClientConsultationSummaryModal()
    }

    const _onClientCallRejected = () => {
      _onConsultationUnavailable()
      callbacks.notify(events.onClientCallRejected, null)
    }

    const _onCreateDirectCall = (_call, _inviterId) => {
      call = _call

      let callStarted = false
      call.onJoined(_ => {
        callStarted = true
        _onClientCallStarted(_inviterId)
      })
      call.onLeft(_ => {
        if (callStarted) {
          _onClientCallHangup()
        } else {
          _onClientCallRejected()
        }
      })
    }

    const _onDirectCallError = (err) =>
      $log.error(err)

    const _onAddSUR = (serviceUsageRequest) => {
      _onClientCallPending(serviceUsageRequest)

      const session = communicatorService.getClientSession()

      $log.info('CLIENT call: ', serviceUsageRequest)
      return session.chat.createDirectCall(serviceUsageRequest.ratelId)
        .then((_call) => _onCreateDirectCall(_call, serviceUsageRequest.ratelId), _onDirectCallError)
    }

    const _onAddSURError = (err) => {
      _onClientCallStartError(err)
      return $q.resolve(null)
    }

    const startCall = (_serviceId) => {
      if (!communicatorService.getClientSession() || !angular.isDefined(_serviceId) || !_serviceId) {
        return $q.resolve(null)
      }

      _onClientCallStart(_serviceId)

      return ServiceApi.addServiceUsageRequest({serviceId: _serviceId})
        .$promise
        .then(_onAddSUR, _onAddSURError)
    }

    const api = {
      callServiceId: startCall,
      toggleAudio: toggleAudio,
      toggleVideo: toggleVideo,
      hangupCall: hangupCall,
      bindLocalStreamElement: setLocalStreamElement,
      bindRemoteStreamElement: setRemoteStreamElement
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.call', [
    'profitelo.services.communicator',
    'profitelo.swaggerResources',
    'profitelo.services.utils',
    'profitelo.services.modals'
  ])
    .service('callService', service)

}())
