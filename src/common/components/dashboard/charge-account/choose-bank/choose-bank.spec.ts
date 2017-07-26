import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import chooseBankModule from './choose-bank'
describe('Unit testing: profitelo.components.dashboard.charge-account.choose-bank', () => {
  return describe('for chooseBank component >', () => {

    const url = 'awesomUrl/'

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let bindings: any
    let el: any
    const validHTML = '<choose-bank bank-model="{value: 1}" payments-links="[{value: 1}, {value: 2}]" scroll-section-id="1"></choose-bank>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      angular.mock.module(chooseBankModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        bankModel: 'asas',
        paymentsLinks: [
          {value: 1}
        ]
      }
      el = create(validHTML)
      component = componentController('chooseBank', {$element: el, $scope: scope}, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      expect(el.html()).toBeDefined(true)
    })

  })
})
