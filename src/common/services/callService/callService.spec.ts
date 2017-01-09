describe('Unit testing: profitelo.services.call >', () => {
  describe('for profitelo.services.call >', () => {

    let callService
    let onCall
    const modalsService = {
      createClientConsultationSummaryModal: _ => _,
      createExpertConsultationSummaryModal: _ => _,
      createIncomingCallModal: _ => _,
      createServiceUnavailableModal: _ => _
    }

    const communicatorServiceMock = {
      onCall: (cb) => onCall = cb
    }

    const testSUR = {
      agentId: '123',
      service: {
        id: '123',
        details: {
          price: {
            amount: 100,
            currency: 'PLN'
          }
        }
      },
      expert: {
        id: '121'
      }
    }
    const call = {
      onJoined: _ => _,
      onLeft: _ => _,
      mute: _ => _,
      unmute: _ => _,
      pause: _ => _,
      unpause: _ => _,
      onRemoteStream: _ => _,
      onStreamPaused: _ => _,
      onStreamUnpaused: _ => _,
      onEnd: _ => _,
      onRejected: _ => _,
      leave: _ => _
    }

    const soundsService = {
      playMessageNew: _ => _,
      callConnectingSound: () => {
        return {
          play: _ => _,
          stop: _ => _
        }
      },
      callIncomingSound: () => {
        return {
          play: _ => _,
          stop: _ => _
        }
      },
      playCallRejected: _ => _,
      playCallEnded: _ => _
    }

    const navigatorService = {
      getUserMediaStream: _ => _
    }

    beforeEach(() => {
    angular.mock.module('profitelo.services.communicator')
    angular.mock.module('profitelo.services.call')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('communicatorService', communicatorServiceMock)
      $provide.value('soundsService', soundsService)
      $provide.value('modalsService', modalsService)
      $provide.value('navigatorService', navigatorService)
    }))

    beforeEach(inject(($injector) => {
      callService = $injector.get('callService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should not start call if there is no clientSession', inject(($rootScope, communicatorService) => {
      const serviceId = '1'

      communicatorService.getClientSession = () => null

      callService.callServiceId(serviceId).then((res) => {
        expect(res).toEqual(null)
      })

      $rootScope.$digest()
    }))

    it('should not start call if there is no serviceId', inject(($rootScope, communicatorService) => {
      const serviceId = null

      communicatorService.getClientSession = () => { return {} }

      callService.callServiceId(serviceId).then((res) => {
        expect(res).toEqual(null)
      })

      $rootScope.$digest()
    }))

    it('should startCall with error and show service unavailable', inject(($q, $rootScope, communicatorService, ServiceApi) => {
      const serviceId = '1'
      const err = 'error'

      communicatorService.getClientSession = () => { return {} }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.reject(err)} }

      spyOn(modalsService, 'createServiceUnavailableModal')

      callService.callServiceId(serviceId).then((res) => {
        expect(res).toEqual(null)
      })

      $rootScope.$digest()

      expect(modalsService.createServiceUnavailableModal).toHaveBeenCalled()
    }))

    it('should create direct call with error and log it', inject(
      ($q, $log, $rootScope, communicatorService, ServiceApi, navigatorService) => {
      const serviceId = '1'
      const session = {
        chat: {
          createDirectCall: _ => $q.reject(null)
        }
      }

      navigatorService.getUserMediaStream = () => $q.resolve()
      communicatorService.getClientSession = () => { return session }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.resolve(testSUR)} }

      spyOn($log, 'error')

      callService.callServiceId(serviceId)

      $rootScope.$digest()

      expect($log.error).toHaveBeenCalled()
    }))

    it('should startCall', inject(($q, $rootScope, communicatorService, ServiceApi, navigatorService) => {
      const serviceId = '1'

      const session = {
        chat: {
          createDirectCall: _ => $q.resolve(call)
        }
      }

      navigatorService.getUserMediaStream = () => $q.resolve()
      communicatorService.getClientSession = () => { return session }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.resolve(testSUR)} }

      callService.callServiceId(serviceId)

      $rootScope.$digest()
    }))

    it('should not hangup if no call', inject(($rootScope) => {

      callService.hangupCall().then(_ => _, (err) => {expect(err).toEqual('NO CALL')})

      $rootScope.$digest()
    }))

    it('should hangup', inject(($q, $rootScope, communicatorService, ServiceApi, navigatorService, RatelApi) => {
      const serviceId = '1'

      const _call = angular.copy(call)
      _call.leave = () => $q.resolve()

      const session = {
        chat: {
          createDirectCall: _ => $q.resolve(_call)
        }
      }

      navigatorService.getUserMediaStream = () => $q.resolve()
      communicatorService.getClientSession = () => session
      ServiceApi.addServiceUsageRequest = () => ({$promise: $q.resolve(testSUR)})
      RatelApi.ratelCallStoppedHook = () => ({$promise: $q.resolve('')})

      callService.callServiceId(serviceId)
      $rootScope.$digest()
      callService.hangupCall().then((res) => {
        expect(res).toEqual(undefined)
      })
      $rootScope.$digest()
    }))

    it('should start video&audio', inject(($q, $rootScope, communicatorService, ServiceApi, navigatorService) => {
      const serviceId = '1'

      const session = {
        chat: {
          createDirectCall: _ => $q.resolve(call)
        }
      }

      navigatorService.getUserMediaStream = () => $q.resolve()
      communicatorService.getClientSession = () => { return session }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.resolve(testSUR)} }

      callService.callServiceId(serviceId)
      $rootScope.$digest()

      spyOn(call, 'pause')
      spyOn(call, 'mute')
      spyOn(call, 'unpause')
      spyOn(call, 'unmute')

      callService.stopVideo()
      callService.stopAudio()
      callService.startVideo()
      callService.startAudio()

      expect(call.mute).toHaveBeenCalled()
      expect(call.pause).toHaveBeenCalled()
      expect(call.unpause).toHaveBeenCalled()
      expect(call.unmute).toHaveBeenCalled()
    }))

    it('should show modal on onCall', inject(() => {

      const obj = {
        invitation: {
          call: call
        },
        expert: {},
        session: {}
      }

      spyOn(modalsService, 'createIncomingCallModal')

      onCall(obj)

      expect(modalsService.createIncomingCallModal).toHaveBeenCalled()
    }))
  })
})
