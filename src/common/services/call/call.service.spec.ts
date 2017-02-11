namespace profitelo.services.call {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import INavigatorService = profitelo.services.navigator.INavigatorService
  describe('Unit testing: profitelo.services.call >', () => {
    describe('for profitelo.services.call >', () => {

      let callService: ICallService
      let onCall: any
      const modalsService = {
        createClientConsultationSummaryModal: () => {
        },
        createExpertConsultationSummaryModal: () => {
        },
        createIncomingCallModal: () => {
        },
        createServiceUnavailableModal: () => {
        }
      }

      const communicatorServiceMock = {
        onCall: (cb: any) => onCall = cb
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
        onJoined: () => {
        },
        onLeft: () => {
        },
        mute: () => {
        },
        unmute: () => {
        },
        pause: () => {
        },
        unpause: () => {
        },
        onRemoteStream: () => {
        },
        onStreamPaused: () => {
        },
        onStreamUnpaused: () => {
        },
        onEnd: () => {
        },
        onRejected: () => {
        },
        leave: () => {
        }
      }

      const soundsService = {
        playMessageNew: () => {
        },
        callConnectingSound: () => {
          return {
            play: () => {
            },
            stop: () => {
            }
          }
        },
        callIncomingSound: () => {
          return {
            play: () => {
            },
            stop: () => {
            }
          }
        },
        playCallRejected: () => {
        },
        playCallEnded: () => {
        }
      }

      const navigatorService = {
        getUserMediaStream: () => {
        }
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.communicator')
        angular.mock.module('profitelo.services.call')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL')
        $provide.value('communicatorService', communicatorServiceMock)
        $provide.value('soundsService', soundsService)
        $provide.value('modalsService', modalsService)
        $provide.value('navigatorService', navigatorService)
      }))

      beforeEach(inject(($injector: ng.auto.IInjectorService) => {
        callService = $injector.get<ICallService>('callService')
      }))

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })

      it('should not start call if there is no clientSession', inject(
        ($rootScope: IRootScopeService, communicatorService: ICommunicatorService) => {
          const serviceId = '1'

          communicatorService.getClientSession = () => null

          callService.callServiceId(serviceId).then((res) => {
            expect(res).toEqual(null)
          })

          $rootScope.$digest()
        }))

      it('should not start call if there is no serviceId', inject(
        ($rootScope: IRootScopeService, communicatorService: ICommunicatorService) => {
          const serviceId = null

          communicatorService.getClientSession = () => {
            return {}
          }

          callService.callServiceId(<any>serviceId).then((res) => {
            expect(res).toEqual(null)
          })

          $rootScope.$digest()
        }))

      it('should startCall with error and show service unavailable', inject(($q: ng.IQService, $rootScope: IRootScopeService, communicatorService: ICommunicatorService, ServiceApi: any) => {
        const serviceId = '1'
        const err = 'error'

        communicatorService.getClientSession = () => {
          return {}
        }
        ServiceApi.addServiceUsageRequest = () => {
          return {$promise: $q.reject(err)}
        }

        spyOn(modalsService, 'createServiceUnavailableModal')

        callService.callServiceId(serviceId).then((res) => {
          expect(res).toEqual(null)
        })

        $rootScope.$digest()

        expect(modalsService.createServiceUnavailableModal).toHaveBeenCalled()
      }))

      it('should create direct call with error and log it', inject(
        ($q: ng.IQService, $log: ng.ILogService, $rootScope: IRootScopeService,
         communicatorService: ICommunicatorService, ServiceApi: any, navigatorService: INavigatorService) => {
          const serviceId = '1'
          const session = {
            chat: {
              createDirectCall: () => $q.reject(null)
            }
          }

          navigatorService.getUserMediaStream = () => $q.resolve<MediaStream>(<any>{})
          communicatorService.getClientSession = () => {
            return session
          }
          ServiceApi.addServiceUsageRequest = () => {
            return {$promise: $q.resolve(testSUR)}
          }

          spyOn($log, 'error')

          callService.callServiceId(serviceId)

          $rootScope.$digest()

          expect($log.error).toHaveBeenCalled()
        }))

      it('should startCall', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                     communicatorService: ICommunicatorService, ServiceApi: any,
                                     navigatorService: INavigatorService) => {
        const serviceId = '1'

        const session = {
          chat: {
            createDirectCall: () => $q.resolve(call)
          }
        }

        navigatorService.getUserMediaStream = () => $q.resolve<MediaStream>(<any>{})
        communicatorService.getClientSession = () => {
          return session
        }
        ServiceApi.addServiceUsageRequest = () => {
          return {$promise: $q.resolve(testSUR)}
        }

        callService.callServiceId(serviceId)

        $rootScope.$digest()
      }))

      it('should not hangup if no call', inject(($rootScope: IRootScopeService) => {

        callService.hangupCall().then(() => {
        }, (err) => {
          expect(err).toEqual('NO CALL')
        })

        $rootScope.$digest()
      }))

      it('should hangup', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                  communicatorService: ICommunicatorService, ServiceApi: any,
                                  navigatorService: INavigatorService, RatelApi: any) => {
        const serviceId = '1'

        const _call = angular.copy(call)
        _call.leave = () => $q.resolve()

        const session = {
          chat: {
            createDirectCall: () => $q.resolve(_call)
          }
        }

        navigatorService.getUserMediaStream = () => $q.resolve<MediaStream>(<any>{})
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

      it('should start video&audio', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                             communicatorService: ICommunicatorService, ServiceApi: any,
                                             navigatorService: INavigatorService) => {
        const serviceId = '1'

        const session = {
          chat: {
            createDirectCall: () => $q.resolve(call)
          }
        }

        navigatorService.getUserMediaStream = () => $q.resolve<MediaStream>(<any>{})
        communicatorService.getClientSession = () => {
          return session
        }
        ServiceApi.addServiceUsageRequest = () => {
          return {$promise: $q.resolve(testSUR)}
        }

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
}
