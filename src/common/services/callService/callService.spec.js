describe('Unit testing: profitelo.services.call >', () => {
  describe('for profitelo.services.call >', () => {

    let callService
    let onCall

    const communicatorService = {
      onCall: (cb) => onCall = cb
    }

    const soundsService = {
      playMessageNew: _ => _,
      callConnectingSound: () => { return {
        play: _ => _,
        stop: _ => _
      }},
      callIncomingSound: () => { return {
        play: _ => _,
        stop: _ => _
      }},
      playCallRejected: _ => _,
      playCallEnded: _ => _
    }

    beforeEach(() => {
      module('profitelo.services.communicator')
      module('profitelo.services.call')
    })

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('communicatorService', communicatorService)
      $provide.value('soundsService', soundsService)
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

    it('should startCall with error and show service unavailable', inject(($q, $rootScope, communicatorService, ServiceApi, modalsService) => {
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

    it('should create direct call with error and log it', inject(($q, $log, $rootScope, communicatorService, ServiceApi) => {
      const serviceId = '1'
      const sur = {
        ratelId: '123'
      }
      const call = null
      const session = {
        chat: {
          createDirectCall: _ => $q.reject(call)
        }
      }

      communicatorService.getClientSession = () => { return session }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.resolve(sur)} }

      spyOn($log, 'error')

      callService.callServiceId(serviceId)

      $rootScope.$digest()

      expect($log.error).toHaveBeenCalled()
    }))

    it('should startCall', inject(($q, $rootScope, communicatorService, ServiceApi) => {
      const serviceId = '1'
      const sur = {
        ratelId: '123'
      }
      const call = {
        onJoined: _ => _,
        onLeft: _ => _
      }
      const session = {
        chat: {
          createDirectCall: _ => $q.resolve(call)
        }
      }

      communicatorService.getClientSession = () => { return session }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.resolve(sur)} }

      callService.callServiceId(serviceId)

      $rootScope.$digest()
    }))

    it('should not hangup if no call', inject(($rootScope) => {

      callService.hangupCall().then((res) => {
        expect(res).toEqual(null)
      })

      $rootScope.$digest()
    }))

    it('should hangup', inject(($q, $rootScope, communicatorService, ServiceApi) => {
      const serviceId = '1'
      const sur = {
        ratelId: '123'
      }
      const call = {
        onJoined: _ => _,
        onLeft: _ => _,
        hangup: () => { return $q.resolve('hangup') }
      }
      const session = {
        chat: {
          createDirectCall: _ => $q.resolve(call)
        }
      }

      communicatorService.getClientSession = () => { return session }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.resolve(sur)} }

      callService.callServiceId(serviceId)
      $rootScope.$digest()
      callService.hangupCall().then((res) => {
        expect(res).toEqual('hangup')
      })
      $rootScope.$digest()
    }))

    it('should bind streams', inject(($q, $rootScope, communicatorService, ServiceApi) => {
      const serviceId = '1'
      const sur = {
        ratelId: '123'
      }
      const call = {
        onJoined: _ => _,
        onLeft: _ => _,
        setLocalStreamElement: _ => _,
        setRemoteStreamElement: _ => _
      }
      const session = {
        chat: {
          createDirectCall: _ => $q.resolve(call)
        }
      }
      const remoteStreamElement = angular.element('<div></div>')
      const localStreamElement = angular.element('<div></div>')

      communicatorService.getClientSession = () => { return session }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.resolve(sur)} }

      callService.callServiceId(serviceId)
      $rootScope.$digest()

      spyOn(call, 'setLocalStreamElement')
      spyOn(call, 'setRemoteStreamElement')
      callService.bindRemoteStreamElement(remoteStreamElement)
      callService.bindLocalStreamElement(localStreamElement)

      expect(call.setLocalStreamElement).toHaveBeenCalled()
      expect(call.setRemoteStreamElement).toHaveBeenCalled()
    }))

    it('should toggle video&audio', inject(($q, $rootScope, communicatorService, ServiceApi) => {
      const serviceId = '1'
      const sur = {
        ratelId: '123'
      }
      const call = {
        onJoined: _ => _,
        onLeft: _ => _,
        toggleVideo: _ => _,
        toggleAudio: _ => _
      }
      const session = {
        chat: {
          createDirectCall: _ => $q.resolve(call)
        }
      }

      communicatorService.getClientSession = () => { return session }
      ServiceApi.addServiceUsageRequest = () => { return {$promise: $q.resolve(sur)} }

      callService.callServiceId(serviceId)
      $rootScope.$digest()

      spyOn(call, 'toggleVideo')
      spyOn(call, 'toggleAudio')

      callService.toggleVideo()
      callService.toggleAudio()

      expect(call.toggleVideo).toHaveBeenCalled()
      expect(call.toggleAudio).toHaveBeenCalled()
    }))

    it('should show modal on onCall', inject((modalsService) => {

      const obj = {
        invitation: {
          call: {}
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
