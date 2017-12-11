import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import * as angular from 'angular'
import {PaymentsApiMock} from 'profitelo-api-ng/api/api'
import {GetCreditCard} from 'profitelo-api-ng/model/models'
import {PromiseService} from '../../../../services/promise/promise.service';
import {ProfiteloWebsocketService} from '../../../../services/profitelo-websocket/profitelo-websocket.service'
describe('Unit testing: profitelo.components.dashboard.client.navigation', () => {
  return describe('for clientNavigation >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    const validHTML = '<client-navigation></client-navigation>'
    let httpBackend: ng.IHttpBackendService

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.dashboard.client.navigation')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $httpBackend: ng.IHttpBackendService,
              _$componentController_: ng.IComponentControllerService, profiteloWebsocket: ProfiteloWebsocketService,
              PaymentsApiMock: PaymentsApiMock, promiseService: PromiseService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        httpBackend = $httpBackend

        PaymentsApiMock.getCreditCardsRoute(200, [<GetCreditCard>{}])

        component = componentController('clientNavigation', {}, {
          promiseService: promiseService,
          profiteloWebsocket: profiteloWebsocket,
          $element: create(validHTML)
        })
        httpBackend.flush()
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

  })
})

