describe('Unit testing: profitelo.services.messenger >', () => {
  describe('for profitelo.services.messenger >', () => {

    let onClientCallStarted
    let onExpertCallAnswered
    let onExpertCallReject
    let onClientCallRejected
    let onClientCallPending
    let onCallEnd

    const ratelId = '1'
    const room = {
      onTyping: _ => _,
      onMark: _ => _,
      onMessage: _ => _,
      getUsers: (_: any) => _
    }

    const serviceInvitationTuple = {
      service: {
        id: '1'
      },
      invitation: {
        inviter: ratelId
      }
    }

    const getTestSession = ($q) => ({
      chat: {
        createDirectRoom: () => $q.resolve(room)
      }
    })

    const callService = {
      onClientCallStarted: (cb) => onClientCallStarted = cb,
      onExpertCallAnswered: (cb) => onExpertCallAnswered = cb,
      onExpertCallReject: (cb) => onExpertCallReject = cb,
      onClientCallRejected: (cb) => onClientCallRejected = cb,
      onClientCallPending: (cb) => onClientCallPending = cb,
      onCallEnd: (cb) => onCallEnd = cb
    }

    const soundsService = {
      playMessageNew: _ => _
    }

    beforeEach(() => {
    angular.mock.module('profitelo.services.call')
    angular.mock.module('profitelo.services.messenger')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('callService', callService)
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('soundsService', soundsService)
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('expert should get users', inject(($q, $rootScope, communicatorService, messengerService) => {
      communicatorService.findExpertSession = () => getTestSession($q)

      onExpertCallAnswered(serviceInvitationTuple)
      messengerService.getUsers().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('client should get users', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.getClientSession = () => getTestSession($q)

      onClientCallStarted(ratelId)
      messengerService.getUsers().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('expert should get mark', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.findExpertSession = () => getTestSession($q)

      onExpertCallAnswered(serviceInvitationTuple)
      messengerService.getMark().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('client should get mark', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.getClientSession = () => getTestSession($q)

      onClientCallStarted(ratelId)
      messengerService.getMark().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('expert should mark', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.findExpertSession = () => getTestSession($q)

      onExpertCallAnswered(serviceInvitationTuple)
      messengerService.mark().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('client should mark', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.getClientSession = () => getTestSession($q)

      onClientCallStarted(ratelId)
      messengerService.mark().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('expert should indicateTyping', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.findExpertSession = () => getTestSession($q)

      onExpertCallAnswered(serviceInvitationTuple)
      messengerService.indicateTyping().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('client should indicateTyping', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.getClientSession = () => getTestSession($q)

      onClientCallStarted(ratelId)
      messengerService.indicateTyping().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('expert should sendMessage', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.findExpertSession = () => getTestSession($q)

      onExpertCallAnswered(serviceInvitationTuple)
      messengerService.sendMessage().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('client should sendMessage', inject(($q, $rootScope, communicatorService, messengerService) => {

      communicatorService.getClientSession = () => getTestSession($q)

      onClientCallStarted(ratelId)
      messengerService.sendMessage().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()
    }))

    it('onHangup should remove room', inject(() => {
      onCallEnd()
    }))

    it('onClientCallPending should notify callback facotyr', inject(() => {
      const serviceUsageRequest = {
        expert: {}
      }
      onClientCallPending(serviceUsageRequest)
    }))
  })
})
