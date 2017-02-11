namespace profitelo.services.messenger {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  describe('Unit testing: profitelo.services.messenger >', () => {
    describe('for profitelo.services.messenger >', () => {

      let onClientCallStarted: any
      let onExpertCallAnswered: any
      let onExpertCallReject: any
      let onClientCallRejected: any
      let onClientCallPending: any
      let onCallEnd: any

      const ratelId = '1'
      const room = {
        onTyping: () => {
        },
        onMark: () => {
        },
        onMessage: () => {
        },
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

      const getTestSession = ($q: ng.IQService) => ({
        chat: {
          createDirectRoom: () => $q.resolve(room)
        }
      })

      const callService = {
        onClientCallStarted: (cb: any) => onClientCallStarted = cb,
        onExpertCallAnswered: (cb: any) => onExpertCallAnswered = cb,
        onExpertCallReject: (cb: any) => onExpertCallReject = cb,
        onClientCallRejected: (cb: any) => onClientCallRejected = cb,
        onClientCallPending: (cb: any) => onClientCallPending = cb,
        onCallEnd: (cb: any) => onCallEnd = cb
      }

      const soundsService = {
        playMessageNew: () => {
        }
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.call')
        angular.mock.module('profitelo.services.messenger')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('callService', callService)
        $provide.value('apiUrl', 'awesomeURL')
        $provide.value('soundsService', soundsService)
      }))

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })

      it('expert should get users', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                            communicatorService: ICommunicatorService,
                                            messengerService: IMessengerService) => {

        communicatorService.findExpertSession = () => getTestSession($q)

        onExpertCallAnswered(serviceInvitationTuple)
        messengerService.getUsers().then(res => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('client should get users', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                            communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.getClientSession = () => getTestSession($q)

        onClientCallStarted(ratelId)
        messengerService.getUsers().then((res: any) => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('expert should get mark', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                           communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.findExpertSession = () => getTestSession($q)

        onExpertCallAnswered(serviceInvitationTuple)
        messengerService.getMark().then(res => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('client should get mark', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                           communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.getClientSession = () => getTestSession($q)

        onClientCallStarted(ratelId)
        messengerService.getMark().then((res: any) => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('expert should mark', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                       communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.findExpertSession = () => getTestSession($q)

        onExpertCallAnswered(serviceInvitationTuple)
        messengerService.mark(new Date).then((res: any) => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('client should mark', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                       communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.getClientSession = () => getTestSession($q)

        onClientCallStarted(ratelId)
        messengerService.mark(new Date).then((res: any) => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('expert should indicateTyping', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                                 communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.findExpertSession = () => getTestSession($q)

        onExpertCallAnswered(serviceInvitationTuple)
        messengerService.indicateTyping().then(res => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('client should indicateTyping', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                                 communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.getClientSession = () => getTestSession($q)

        onClientCallStarted(ratelId)
        messengerService.indicateTyping().then((res: any) => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('expert should sendMessage', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                              communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.findExpertSession = () => getTestSession($q)

        onExpertCallAnswered(serviceInvitationTuple)
        messengerService.sendMessage('').then((res: any) => {
          expect(res).toEqual('test')
        })
        $rootScope.$digest()
      }))

      it('client should sendMessage', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                              communicatorService: ICommunicatorService, messengerService: IMessengerService) => {

        communicatorService.getClientSession = () => getTestSession($q)

        onClientCallStarted(ratelId)
        messengerService.sendMessage('').then((res: any) => {
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
}
