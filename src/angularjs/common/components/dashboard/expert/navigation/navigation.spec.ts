import * as angular from 'angular'

import expertNavigationModule from './navigation'
import IScope = angular.IScope
import {FinancesApi, FinancesApiMock} from 'profitelo-api-ng/api/api'
import {PromiseService} from '../../../../services/promise/promise.service';
import {ExpertNavigationComponentController} from './navigation.controller';
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service';
import {ProfiteloWebsocketService} from '../../../../services/profitelo-websocket/profitelo-websocket.service'
import {UserService} from '../../../../services/user/user.service'

  describe('Unit testing: profitelo.components.dashboard.expert.navigation', () => {
    return describe('for expertNavigation >', () => {

      let scope: IScope
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: ng.IComponentControllerService
      let component: ExpertNavigationComponentController
      const validHTML = '<expert-navigation></expert-navigation>'
      let FinancesApiMock: FinancesApiMock
      let injectors = {}
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

        angular.mock.module(expertNavigationModule)

        inject(($rootScope: any, $compile: ng.ICompileService, userService: UserService, $q: ng.IQService,
                profiteloWebsocket: ProfiteloWebsocketService, _$componentController_: ng.IComponentControllerService,
                FinancesApi: FinancesApi, _FinancesApiMock_: FinancesApiMock, promiseService: PromiseService,
                errorHandler: ErrorHandlerService) => {
          FinancesApiMock = _FinancesApiMock_
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          spyOn(userService, 'getUser').and.callFake(() => $q.resolve({isCompany: true}))
          compile = $compile
          injectors = {
            FinancesApi: FinancesApi,
            promiseService: promiseService,
            errorHandler: errorHandler,
            profiteloWebsocket: profiteloWebsocket
          }
        })
        FinancesApiMock.getClientBalanceRoute(500)
        component = componentController<ExpertNavigationComponentController, {}>('expertNavigation', injectors, {})
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))
      it('should compile the directive', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })
    })
  })
