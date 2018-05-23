import * as angular from 'angular'
import * as RatelSdk from 'ratel-sdk-js'
import userModule from '../../../services/user/user'
import {ExpertCallService} from './expert-call.service'
import Calls = jasmine.Calls
import communicatorMockModule from '../communicator.mock';

interface ICallSound {
  play: () => void,
  stop: () => void
}

describe('Unit testing: profitelo.services.call >', () => {
  describe('for expert call service >', () => {

    let expertCallService: ExpertCallService
    let onCallInvitation: (callInvitation: RatelSdk.events.CallInvitation) => void
    const modalsService = {
      createClientConsultationSummaryModal: (): void => {
      },
      createExpertConsultationSummaryModal: (): void => {
      },
      createIncomingCallModal: (): void => {
      },
      createServiceUnavailableModal: (): void => {
      }
    };

    const communicatorServiceMock = {
      onCallInvitation: (cb: any): void => onCallInvitation = cb,
      onSuspendedCallEnd: (cb: () => void): void => cb(),
      onActiveCall: (cb: (activeCalls: Calls[]) => void): void => cb([]),
      onReconnect: (cb: () => void): void => cb(),
      onDisconnectCall: (cb: () => void): void => cb(),
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
      getUser: (): void => {
      }
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('communicatorService', communicatorServiceMock)
    }))

    beforeEach(() => {
      angular.mock.module(userModule)
      angular.mock.module(communicatorMockModule)
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
      expertCallService = $injector.get<ExpertCallService>('expertCallService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
