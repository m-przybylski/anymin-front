import * as angular from 'angular'
import {GetServiceUsageRequest, GetService} from 'profitelo-api-ng/model/models'
import {RatelApi, ServiceApi} from 'profitelo-api-ng/api/api'
import {CallService} from './call.service'
import userModule from '../../services/user/user'
import communicatorModule from '../communicator/communicator'

import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {NavigatorService} from '../../services/navigator/navigator.service'
import {CommunicatorService} from './communicator.service'
describe('Unit testing: profitelo.services.call >', () => {
  describe('for profitelo.services.call >', () => {

    let callService: CallService
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

    const testSUR: GetServiceUsageRequest = {
      agentId: '123',
      freeSeconds: 0,
      service: {
        id: '123',
        usageCounter: 0,
        ownerId: '',
        usageDurationInSeconds: 0,
        invitations: [],
        createdAt: 0,
        ownerEmployee: false,
        rating: 0,
        status: GetService.StatusEnum.VERIFIED,
        name: '',
        price: {
          amount: 100,
          currency: 'PLN'
        }

      },
      tags: [],
      expert: {
        id: '121',
        isActive: true
      },
      profile: {
        id: '121',
        isActive: true
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

    const userService = {
      getUser: () => {
      }
    }

    beforeEach(() => {
      angular.mock.module(userModule)
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('communicatorService', communicatorServiceMock)
      $provide.value('soundsService', soundsService)
      $provide.value('modalsService', modalsService)
      $provide.value('navigatorService', navigatorService)
      $provide.value('userService', userService)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $q: ng.IQService) => {
      spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))
      callService = $injector.get<CallService>('callService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should not start call if there is no clientSession', inject(
      ($rootScope: IRootScopeService, communicatorService: CommunicatorService) => {
        const serviceId = '1'

        communicatorService.getClientSession = () => null

        callService.callServiceId(serviceId).then((res) => {
          expect(res).toEqual(<any>null)
        })

        $rootScope.$digest()
      }))

    it('should not start call if there is no serviceId', inject(
      ($rootScope: IRootScopeService, communicatorService: CommunicatorService) => {
        const serviceId = null

        communicatorService.getClientSession = () => {
          return {}
        }

        callService.callServiceId(<any>serviceId).then((res) => {
          expect(res).toEqual(<any>null)
        })

        $rootScope.$digest()
      }))

    it('should startCall with error and show service unavailable', inject(
      ($q: ng.IQService, $rootScope: IRootScopeService, communicatorService: CommunicatorService, ServiceApi: ServiceApi) => {
        const serviceId = '1'
        const err = 'error'

        communicatorService.getClientSession = () => {
          return {}
        }

        ServiceApi.addServiceUsageRequestRoute = (_x: any) => {
          return $q.reject(err)
        }

        spyOn(modalsService, 'createServiceUnavailableModal')

        callService.callServiceId(serviceId).then((res) => {
          expect(res).toEqual(<any>err)
        })

        $rootScope.$digest()

        expect(modalsService.createServiceUnavailableModal).toHaveBeenCalled()
      }))

    it('should create direct call with error and log it', inject(
      ($q: ng.IQService, $log: ng.ILogService, $rootScope: IRootScopeService,
       communicatorService: CommunicatorService, ServiceApi: ServiceApi, navigatorService: NavigatorService) => {
        const serviceId = '1'
        const session = {
          chat: {
            createDirectCall: () => $q.reject('')
          }
        }

        navigatorService.getUserMediaStream = () => $q.resolve<MediaStream>(<any>{})
        communicatorService.getClientSession = () => {
          return session
        }

        ServiceApi.addServiceUsageRequestRoute = () => {
          return $q.resolve(testSUR)
        }

        spyOn($log, 'error')

        callService.callServiceId(serviceId)

        $rootScope.$digest()

        expect($log.error).toHaveBeenCalled()
      }))

    it('should startCall', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                   communicatorService: CommunicatorService, ServiceApi: ServiceApi,
                                   navigatorService: NavigatorService) => {
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
      ServiceApi.addServiceUsageRequestRoute = (_x: any) => {
        return <ng.IPromise<GetServiceUsageRequest>>$q.resolve(testSUR)
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
                                communicatorService: CommunicatorService, ServiceApi: ServiceApi,
                                navigatorService: NavigatorService, RatelApi: RatelApi) => {
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
      ServiceApi.addServiceUsageRequestRoute = () => $q.resolve(testSUR)
      RatelApi.ratelCallStoppedHookRoute = () => $q.resolve('')

      callService.callServiceId(serviceId)
      $rootScope.$digest()
      callService.hangupCall().then((res) => {
        expect(res).toEqual(undefined)
      })
      $rootScope.$digest()
    }))

    it('should start video&audio', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                           communicatorService: CommunicatorService, ServiceApi: ServiceApi,
                                           navigatorService: NavigatorService) => {
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
      ServiceApi.addServiceUsageRequestRoute = () => {
        return $q.resolve(testSUR)
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
