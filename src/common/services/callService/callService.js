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
        call.hangup().then(_ => {
          callbacks.notify(events.onHangup, null)
          timer.stop()
          serviceUsageData = null
          expertService = null
          timer = null
          call = null
        })
      }
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

    const _onTimeCostChange = timeCost => {
      callbacks.notify(events.onTimeCostChange, timeCost)
    }

    const _onExpertCallJoin = () => {
      let price = 0
      if (serviceUsageData) {
        price = serviceUsageData.service.details.price
      } else {
        price = expertService.details.price
      }
      timer = UtilsService.timerFactory.getInstance(price, freeMinutesCount)
      timer.start(_onTimeCostChange)
      callbacks.notify(events.onExpertCallJoin, null)
    }

    const _answerCall = (callInvitation) => {
      call = callInvitation.call
      call.join().then(_ => {
        _onExpertCallJoin()
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

    const _onExpertCallIncoming = (callInvitation, _service) => {
      modalsService.createIncomingCallModal(_service, () => {
        _answerCall(callInvitation)
      }, () => {
        _rejectCall(callInvitation)
      })

      expertService = _service

      callbacks.notify(events.onExpertCallIncoming, _service)
      call = callInvitation.call
    }

    communicatorService.onCall(obj =>
      _onExpertCallIncoming(obj.invitation, obj.service))

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

    const _onClientCallStarted = (callJoined) => {
      timer = UtilsService.timerFactory.getInstance(serviceUsageData.service.details.price, freeMinutesCount)
      timer.start(_onTimeCostChange)
      $log.debug(callJoined.user + ' answered the call!')
      callbacks.notify(events.onClientCallStarted, call)
    }

    const _onClientCallStart = (_serviceId) => {
      callbacks.notify(events.onClientCallStart, _serviceId)
    }

    const _onClientCallPending = (serviceUsageRequest) => {
      console.log(serviceUsageRequest)
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

    const startCall = (_serviceId) => {
      if (!communicatorService.getClientSession() || !angular.isDefined(_serviceId) || !_serviceId) {
        return $q.resolve(null)
      }

      _onClientCallStart(_serviceId)

      return ServiceApi.addServiceUsageRequest({serviceId: _serviceId}).$promise.then(serviceUsageRequest => {

        _onClientCallPending(serviceUsageRequest)

        const session = communicatorService.getClientSession()

        session.chat.createDirectCall(serviceUsageRequest.ratelId).then(_call => {
          call = _call

          let callStarted = false
          call.onJoined(callJoined => {
            callStarted = true
            _onClientCallStarted(callJoined)
          })
          call.onLeft(_ => {
            if (callStarted) {
              _onClientCallHangup()
            } else {
              _onClientCallRejected()
            }
          })
        })

        $q.resolve(session)
      }, (err) => {
        _onClientCallStartError(err)
        return $q.resolve(null)
      })
    }

    const api = {
      callServiceId: startCall,
      getCall: () => call,
      toggleAudio: toggleAudio,
      toggleVideo: toggleVideo,
      hangupCall: hangupCall,
      bindLocalStreamElement: setLocalStreamElement,
      bindRemoteStreamElement: setRemoteStreamElement
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.call', [
    'profitelo.services.communicatorService',
    'profitelo.swaggerResources',
    'profitelo.services.utils',
    'profitelo.services.modals'
  ])
    .service('callService', service)

}())
