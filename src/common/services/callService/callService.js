(function() {

  function service($rootScope, $q, $log, $interval, UtilsService, communicatorService, ServiceApi, DialogService) {

    let call = null
    let callLengthInSeconds = 0
    let callCost = 0
    const freeMinutesCount = 1

    const _hangupCall = () => {
      if (call) {
        call.hangup().then(() => {
          callbacks.notify(events.onHangup, null)
        })
      }
    }

    const _setLocalStreamElement = (element) => {
      if (call) {
        call.setLocalStreamElement(element)
      }
    }

    const _setRemoteStreamElement = (element) => {
      if (call) {
        call.setRemoteStreamElement(element)
      }
    }

    const _toggleVideo = () => {
      if (call) {
        return call.toggleVideo()
      }
    }

    const _toggleAudio = () => {
      if (call) {
        return call.toggleAudio()
      }
    }

    const events = {
      onIncomingCall: 'onIncomingCall',
      onHangup: 'onHangup',
      onCallStarted: 'onCallStarted',
      onCallPending: 'onCallPending',
      onStartCall: 'onStartCall',
      onCallPendingError: 'onCallPendingError'
    }

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    const _createIncomingCallModal = (_service, answerCallback, rejectCallback) => {
      const dialogScope = $rootScope.$new(true)
      dialogScope.service = _service
      dialogScope.answerCall = answerCallback
      dialogScope.rejectCall = rejectCallback
      DialogService.openDialog({
        controller: 'clientCallController',
        templateUrl: 'components/communicator/modals/client-call/client-call.tpl.html',
        scope: dialogScope
      })
    }

    const _onClientHangup = () => {
      callbacks.notify(events.onHangup, null)
      _createConsultationSummaryModal()
    }

    const _onExpertHangup = () => {
      callbacks.notify(events.onHangup, null)
    }

    const _onExpertReject = () => {
      _onConsultationUnavailable()
    }

    const _onIncomingCall = (callInvitation, _service) =>
      _createIncomingCallModal(_service, () => {
        call = callInvitation.call
        call.join()
        call.onLeft(_ => {
          _onExpertHangup()
        })
        callbacks.notify(events.onCallStarted, call)
      }, () => {
        callInvitation.call.reject()
      })

    communicatorService.onCall(obj => {
      _onIncomingCall(obj.invitation, obj.service)
      callbacks.notify(events.onIncomingCall, null)
      call = obj.invitation.call
    })

    const _createNoFundsModal = (acceptCallback, rejectCallback) => {
      const dialogScope = $rootScope.$new(true)
      dialogScope.reject = acceptCallback
      dialogScope.accept = rejectCallback
      DialogService.openDialog({
        controller: 'noCreditsController',
        templateUrl: 'components/communicator/modals/no-credits/no-credits.tpl.html',
        scope: dialogScope
      })
    }

    const _onNoFunds = () => {
      _createNoFundsModal(_ => _, _ => _)
    }

    const _createServiceUnavailableModal = (acceptCallback, rejectCallback) => {
      const dialogScope = $rootScope.$new(true)
      dialogScope.reject = acceptCallback
      dialogScope.accept = rejectCallback
      DialogService.openDialog({
        controller: 'unavailableServiceController',
        templateUrl: 'components/communicator/modals/service-unavailable/service-unavailable.tpl.html',
        scope: dialogScope
      })
    }

    const _createConsultationSummaryModal = () => {
      const dialogScope = $rootScope.$new(true)
      DialogService.openDialog({
        controller: 'consultationSummaryController',
        templateUrl: 'components/communicator/modals/consultation-summary/consultation-summary.tpl.html',
        scope: dialogScope
      })
    }

    const _onConsultationUnavailable = () => {
      _createServiceUnavailableModal(_ => _, _ => _)
    }

    const _onStartCallError = (err) => {
      callbacks.notify(events.onCallPendingError, err)
      _onConsultationUnavailable()
      _onNoFunds()
    }

    const _timer = (_cost, _freeMinutesCount) => {
      let _timer
      const _freeMinutes = _freeMinutesCount || 0
      return {
        start: (cb) => {
          const _start = Date.now()
          _timer = $interval(() => {
            const _time = (Date.now() - _start) / 1000
            cb({
              time: _time,
              cost: _cost * Math.max(0, _time - (60 * _freeMinutes)) / 60
            })
          }, 200)
        },
        stop: () => {
          $interval.cancel(_timer)
        }
      }
    }

    const _startCall = (_service) => {
      if (!communicatorService.getClientSession() || !angular.isDefined(_service) || !_service) {
        return $q.resolve(null)
      }

      callbacks.notify(events.onStartCall, _service)

      return ServiceApi.addServiceUsageRequest({serviceId: _service.id}).$promise.then(config => {
        console.log(config)

        // _timer(2).start((x) => {console.log(x)})

        callbacks.notify(events.onCallPending, null)

        const session = communicatorService.getClientSession()

        session.chat.createDirectCall(config.ratelId).then(_call => {
          call = _call

          call.onJoined(callJoined => {
            $log.debug(callJoined.user + ' answered the call!')
            callbacks.notify(events.onCallStarted, call)
          })
          call.onLeft(_ => {
            _onClientHangup()
          })
        })

          /*session.chat.createDirectRoom(config.ratelId).then(room => {
            session.room = room
            session.room.onMessage(message => {
              callbacks.notify(events.onNewMessage, message)
            })
            session.room.getHistory().then(history => callbacks.notify(events.onRoomHistory, history))
            callbacks.notify(events.onDirectRoom, session)
          })*/

        $q.resolve(session)
      }, (err) => {
        _onStartCallError(err)
        return $q.resolve(null)
      })
    }


    const api = {
      callService: _startCall,
      getCall: () => call,
      toggleAudio: _toggleAudio,
      toggleVideo: _toggleVideo,
      hangupCall: _hangupCall,
      bindLocalStreamElement: _setLocalStreamElement,
      bindRemoteStreamElement: _setRemoteStreamElement
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.call', [
    'profitelo.services.communicatorService',
    'profitelo.swaggerResources',
    'profitelo.services.dialog-service',
    'profitelo.components.communicator.modals.client-call',
    'profitelo.components.communicator.modals.service-unavailable',
    'profitelo.components.communicator.modals.no-credits',
    'profitelo.components.communicator.modals.consultation-summary',
    'profitelo.services.utils'
  ])
    .service('callService', service)

}())
