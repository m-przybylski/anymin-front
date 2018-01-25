import * as angular from 'angular'
import * as RatelSdk from 'ratel-sdk-js'
import {GetServiceUsageRequest} from 'profitelo-api-ng/model/models'
import {ServiceApi} from 'profitelo-api-ng/api/api'
import userModule from '../../../services/user/user'
import communicatorModule from '../communicator'

import {ClientCallService} from './client-call.service'

import {Session} from 'ratel-sdk-js'
import RtcDetectorModule from '../../../services/rtc-detector/rtc-detector'
import {CommunicatorService} from '@anymind-ng/core';

interface ICallSound {
  play: () => void,
  stop: () => void
}

describe('Unit testing: profitelo.services.call >', () => {
  describe('for client call service >', () => {

    let clientCallService: ClientCallService
    let onCall: any
    const modalsService = {
      createClientConsultationSummaryModal: (): void => {
      },
      createExpertConsultationSummaryModal: (): void => {
      },
      createIncomingCallModal: (): void => {
      },
      createServiceUnavailableModal: (): void => {
      }
    }

    const communicatorServiceMock = {
      onCall: (cb: any): void => onCall = cb,
      onSuspendedCallEnd: (cb: () => void): void => cb()
    }

    const testSUR: GetServiceUsageRequest = {
      freeSeconds: 0,
      service: {
        id: '123',
        usageCounter: 0,
        ownerId: '',
        usageDurationInSeconds: 0,
        createdAt: new Date(0),
        rating: 0,
        isSuspended: false,
        name: '',
        description: 'asd',
        language: 'pl',
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
      playMessageNew: (): void => {
      },
      callConnectingSound: (): ICallSound => {
        return {
          play: (): void => {
          },
          stop: (): void => {
          }
        }
      },
      callIncomingSound: (): ICallSound => {
        return {
          play: (): void => {
          },
          stop: (): void => {
          }
        }
      },
      playCallRejected: (): void => {
      },
      playCallEnded: (): void => {
      }
    }

    const navigatorService = {
      getUserMediaStream: (): void => {
      }
    }

    const userService = {
      getUser: (): Promise<{}> =>
        Promise.resolve({id: '123'})
    }

    beforeEach(() => {
      angular.mock.module(userModule)
      angular.mock.module(RtcDetectorModule)
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
      ($rootScope: any, communicatorService: CommunicatorService) => {
        const serviceId: string = '1'

        communicatorService.getClientSession = (): Session => <any>{}

        clientCallService.callServiceId(serviceId).then((res) => {
          expect(res).toEqual(<any>null)
        })

        $rootScope.$digest()
      }))

    it('should not start call if there is no serviceId', inject(
      ($rootScope: any, communicatorService: CommunicatorService) => {
        const serviceId = null

        communicatorService.getClientSession = (): Session => {
          return {} as RatelSdk.Session
        }

        clientCallService.callServiceId(<any>serviceId).then((res) => {
          expect(res).toEqual(<any>null)
        })

        $rootScope.$digest()
      }))

    it('should startCall', inject(($q: ng.IQService, $rootScope: any,
                                   communicatorService: CommunicatorService, ServiceApi: ServiceApi) => {
      const serviceId = '1'

      const session = {
        chat: {}
      } as RatelSdk.Session

      communicatorService.getClientSession = (): Session => {
        return session
      }

      ServiceApi.postServiceUsageRequestRoute = (): ng.IPromise<GetServiceUsageRequest> => {
        return <ng.IPromise<GetServiceUsageRequest>>$q.resolve(testSUR)
      }

      clientCallService.callServiceId(serviceId)

      $rootScope.$digest()
    }))

  })
})
