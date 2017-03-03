namespace profitelo.components.dashboard.chargeAccount.chooseAmountCharge {
describe('Unit testing: profitelo.components.dashboard.charge-account.choose-amount-charge', () => {
  return describe('for chooseAmountCharge component >', () => {

    const url = 'awesomUrl/'

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: ChooseAmountChargeComponentController
    let validHTML = '<choose-amount-charge title="title" amounts="amounts" amount-model="amountModel"' +
      'scroll-handler="scrollHandler"></choose-amount-charge>'

    const bindings: IChooseAmountChargeComponentBindings = {
      title: 'test',
      currentSection: 1,
      amountModel: {
        cashAmount: null,
        amount: null
      },
      amounts: {
        minimalAmounts: {
          amount: 10,
          currency: 'PLN'
        },
        paymentOptions: [
          {
            amount: 123,
            currency: 'PLN'
          }
        ]
      },
      scrollHandler: jasmine.createSpy('scrollHandler')
    }

    function create(html: string, bindings: IChooseAmountChargeComponentBindings) {
      scope = rootScope.$new()
      const bindedScope = angular.extend(scope, bindings)
      let elem = angular.element(html)
      let compiledElement = compile(elem)(bindedScope)
      bindedScope.$digest()
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

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $componentController: ng.IComponentControllerService) => {
        rootScope = $rootScope.$new()
        compile = $compile

        component = $componentController<ChooseAmountChargeComponentController, IChooseAmountChargeComponentBindings>(
          'chooseAmountCharge', {}, bindings)
      })
    })


    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should scroll on click in payment amount ', () => {
      const el = create(validHTML, bindings)
      scope.$digest()
      el.find('.option').trigger('click')
      expect(bindings.scrollHandler).toHaveBeenCalled()
    })

  })
})
}
