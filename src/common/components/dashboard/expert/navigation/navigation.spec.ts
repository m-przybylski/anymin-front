import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import expertNavigationModule from './navigation'
import IScope = angular.IScope
import {FinancesApi, FinancesApiMock} from 'profitelo-api-ng/api/api'

  describe('Unit testing: profitelo.components.dashboard.expert.navigation', () => {
    return describe('for expertNavigation >', () => {

      let scope: IScope
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: ng.IComponentControllerService
      let component: any
      let validHTML = '<expert-navigation></expert-navigation>'
      let FinancesApiMock: FinancesApiMock
      let injectors = {}
      function create(html: string) {
        scope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl/')
      }))

      beforeEach(() => {

        angular.mock.module(expertNavigationModule)

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, FinancesApi: FinancesApi,
                _FinancesApiMock_: FinancesApiMock) => {
          FinancesApiMock = _FinancesApiMock_
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
          injectors = {
            FinancesApi: FinancesApi
          }
        })
        FinancesApiMock.getClientBalanceRoute(500)
        component = componentController('expertNavigation', injectors, {})
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))
      it('should compile the directive', () => {
        let el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })
    })
  })
