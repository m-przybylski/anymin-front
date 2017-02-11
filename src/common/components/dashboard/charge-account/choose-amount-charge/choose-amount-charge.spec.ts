namespace profitelo.components.dashboard.chargeAccount.chooseAmountCharge {
describe('Unit testing: profitelo.components.dashboard.charge-account.choose-amount-charge', () => {
  return describe('for chooseAmountCharge component >', () => {

    const url = 'awesomUrl/'

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let bindings: any
    let component: any
    let validHTML = '<choose-amount-charge data-title="DASHBOARD.CHARGE_ACCOUNT.CHOOSE_AMMOUNT_CHARGE" data-amounts="{paymentOptions: [{amount:  20000}], ' +
      'minimalAmounts: {}}" data-amount-model="{cashAmount: null, amount: null}" scroll-handler="ctrl.scrollHandler"></choose-amount-charge>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('translateFilter', (x: any) => { return x })
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.dashboard.charge-account.choose-amount-charge')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        amountModel: {
          cashAmount: {
            amount: '123'
          }
        },
        amounts: {
          minimalAmounts: {
            amount: 10
          }
        }
      }

      component = componentController('chooseAmountCharge', null, bindings)
      expect(component.amountModel).toBeDefined()
    })


    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should scroll on click in payment amount ', () => {
      let el = create(validHTML)
      scope.ctrl = {
        scrollHandler: jasmine.createSpy('scrollHandler')
      }
      scope.$digest()
      el.find('.option').trigger('click')
      expect(scope.ctrl.scrollHandler).toHaveBeenCalled()
    })

  })
})
}
