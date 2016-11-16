describe('Unit testing: profitelo.services.messenger >', () => {
  describe('for profitelo.services.messenger >', () => {

    let onClientCallStarted
    let onExpertCallJoin
    let onExpertCallReject
    let onClientCallRejected
    let onClientCallPending
    let onHangup

    const callService = {
      onClientCallStarted: (cb) => onClientCallStarted = cb,
      onExpertCallJoin: (cb) => onExpertCallJoin = cb,
      onExpertCallReject: (cb) => onExpertCallReject = cb,
      onClientCallRejected: (cb) => onClientCallRejected = cb,
      onClientCallPending: (cb) => onClientCallPending = cb,
      onHangup: (cb) => onHangup = cb
    }

    beforeEach(() => {
      module('profitelo.services.call')
      module('profitelo.services.messenger')
    })

    beforeEach(module(($provide) => {
      $provide.value('callService', callService)
      $provide.value('apiUrl', 'awesomeURL')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('expert should get users', inject(($q, $rootScope, communicatorService, messengerService) => {
      const ratelId = '1'
      const room = {
        onTyping: _ => _,
        onMark: _ => _,
        onMessage: _ => _,
        getUsers: () => $q.resolve('test')
      }
      const obj = {
        session: {
          chat: {
            createDirectRoom: () => $q.resolve(room)
          }
        },
        inviter: ratelId
      }

      onExpertCallJoin(obj)
      messengerService.getUsers().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()

      expect(callService.onClientCallStarted).toHaveBeenCalled()
    }))

    it('expert should get mark', inject(($q, $rootScope, communicatorService, messengerService) => {
      const ratelId = '1'
      const room = {
        onTyping: _ => _,
        onMark: _ => _,
        onMessage: _ => _,
        getMark: () => $q.resolve('test')
      }
      const obj = {
        session: {
          chat: {
            createDirectRoom: () => $q.resolve(room)
          }
        },
        inviter: ratelId
      }

      onExpertCallJoin(obj)
      messengerService.getMark().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()

      expect(callService.onClientCallStarted).toHaveBeenCalled()
    }))

    it('expert should mark', inject(($q, $rootScope, communicatorService, messengerService) => {
      const ratelId = '1'
      const room = {
        onTyping: _ => _,
        onMark: _ => _,
        onMessage: _ => _,
        mark: () => $q.resolve('test')
      }
      const obj = {
        session: {
          chat: {
            createDirectRoom: () => $q.resolve(room)
          }
        },
        inviter: ratelId
      }

      onExpertCallJoin(obj)
      messengerService.mark().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()

      expect(callService.onClientCallStarted).toHaveBeenCalled()
    }))

    it('expert should indicateTyping', inject(($q, $rootScope, communicatorService, messengerService) => {
      const ratelId = '1'
      const room = {
        onTyping: _ => _,
        onMark: _ => _,
        onMessage: _ => _,
        indicateTyping: () => $q.resolve('test')
      }
      const obj = {
        session: {
          chat: {
            createDirectRoom: () => $q.resolve(room)
          }
        },
        inviter: ratelId
      }

      onExpertCallJoin(obj)
      messengerService.indicateTyping().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()

      expect(callService.onClientCallStarted).toHaveBeenCalled()
    }))

    it('expert should sendMessage', inject(($q, $rootScope, communicatorService, messengerService) => {
      const ratelId = '1'
      const room = {
        onTyping: _ => _,
        onMark: _ => _,
        onMessage: _ => _,
        sendMessage: () => $q.resolve('test')
      }
      const obj = {
        session: {
          chat: {
            createDirectRoom: () => $q.resolve(room)
          }
        },
        inviter: ratelId
      }

      onExpertCallJoin(obj)
      messengerService.sendMessage().then(res => {
        expect(res).toEqual('test')
      })
      $rootScope.$digest()

      expect(callService.onClientCallStarted).toHaveBeenCalled()
    }))
  })
})
