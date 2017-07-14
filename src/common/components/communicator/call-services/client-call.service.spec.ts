import * as angular from 'angular'
import * as RatelSdk from 'ratel-sdk-js'
import {GetServiceUsageRequest} from 'profitelo-api-ng/model/models'
import {ServiceApi, RatelApi} from 'profitelo-api-ng/api/api'
import userModule from '../../../services/user/user'
import communicatorModule from '../communicator'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {CommunicatorService} from '../communicator.service'
import {ClientCallService} from "./client-call.service";

describe('Unit testing: profitelo.services.call >', () => {
  describe('for profitelo.services.call >', () => {

    let clientCallService: ClientCallService
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
      freeSeconds: 0,
      service: {
        id: '123',
        usageCounter: 0,
        ownerId: '',
        usageDurationInSeconds: 0,
        createdAt: 0,
        rating: 0,
        isSuspended: false,
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
      clientCallService = $injector.get<ClientCallService>('clientCallService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should not start call if there is no clientSession', inject(
      ($rootScope: IRootScopeService, communicatorService: CommunicatorService) => {
        const serviceId = '1'

        communicatorService.getClientSession = () => undefined

        clientCallService.callServiceId(serviceId).then((res) => {
          expect(res).toEqual(<any>null)
        })

        $rootScope.$digest()
      }))

    it('should not start call if there is no serviceId', inject(
      ($rootScope: IRootScopeService, communicatorService: CommunicatorService) => {
        const serviceId = null

        communicatorService.getClientSession = () => {
          return {} as RatelSdk.Session
        }

        clientCallService.callServiceId(<any>serviceId).then((res) => {
          expect(res).toEqual(<any>null)
        })

        $rootScope.$digest()
      }))

    it('should startCall with error and show service unavailable', inject(
      ($q: ng.IQService, $rootScope: IRootScopeService, communicatorService: CommunicatorService, RatelApi: RatelApi) => {
        const serviceId = '1'
        const err = 'error'

        communicatorService.getClientSession = () => {
          return {} as RatelSdk.Session
        }

        RatelApi.postStartCallRoute = (_x: any) => {
          return $q.reject(err)
        }

        spyOn(modalsService, 'createServiceUnavailableModal')

        clientCallService.callServiceId(serviceId).then((res) => {
          expect(res).toEqual(<any>err)
        })

        $rootScope.$digest()

        expect(modalsService.createServiceUnavailableModal).toHaveBeenCalled()
      }))

    it('should create direct call with error and log it', inject(
      ($q: ng.IQService, $log: ng.ILogService, $rootScope: IRootScopeService,
       communicatorService: CommunicatorService, ServiceApi: ServiceApi) => {
        const serviceId = '1'
        const session = {
          chat: {
          }
        } as RatelSdk.Session

        communicatorService.getClientSession = () => session
        communicatorService.getClientDeviceId = () => undefined

        ServiceApi.addServiceUsageRequestRoute = () => {
          return $q.reject(testSUR)
        }

        spyOn($log, 'error')

        clientCallService.callServiceId(serviceId)

        $rootScope.$digest()

        expect($log.error).toHaveBeenCalled()
      }))

    it('should startCall', inject(($q: ng.IQService, $rootScope: IRootScopeService,
                                   communicatorService: CommunicatorService, ServiceApi: ServiceApi) => {
      const serviceId = '1'

      const session = {
        chat: {
        }
      } as RatelSdk.Session

      communicatorService.getClientSession = () => {
        return session
      }

      ServiceApi.addServiceUsageRequestRoute = () => {
        return <ng.IPromise<GetServiceUsageRequest>>$q.resolve(testSUR)
      }

      clientCallService.callServiceId(serviceId)

      $rootScope.$digest()
    }))

  })
})
