import * as angular from 'angular'
import * as RatelSdk from 'ratel-sdk-js'
import userModule from '../../../services/user/user'
import communicatorModule from '../communicator'
import {ExpertCallService} from "./expert-call.service";
import {ServiceApi} from 'profitelo-api-ng/api/api'

describe('Unit testing: profitelo.services.call >', () => {
  describe('for profitelo.services.call >', () => {

    let expertCallService: ExpertCallService
    let onCallInvitation: (callInvitation: RatelSdk.events.CallInvitation) => void
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
      onCallInvitation: (cb: any) => onCallInvitation = cb
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
      expertCallService = $injector.get<ExpertCallService>('expertCallService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should get call details on incoming call', inject((
      $rootScope: ng.IRootScopeService, ServiceApi: ServiceApi, $q: ng.IQService) => {

      const callInvitation: RatelSdk.events.CallInvitation = {
        call: {
          id: '123'
        }
      } as RatelSdk.events.CallInvitation

      spyOn(ServiceApi, 'getIncomingCallDetailsRoute').and.returnValue($q.resolve({}))

      onCallInvitation(callInvitation)

      $rootScope.$digest()

      expect(ServiceApi.getIncomingCallDetailsRoute).toHaveBeenCalled()
    }))
  })
})
