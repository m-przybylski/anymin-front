describe('Unit testing: profitelo.components.dashboard.charge-account.thank-you-page', () => {
  return describe('for thankYouPage component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let location
    let validHTML = '<thank-you-page></thank-you-page>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.charge-account.thank-you-page')

      inject(($rootScope, $compile, _$componentController_, _$location_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        location = _$location_
      })

      component = componentController('thankYouPage', null)
      component.paymentsValues = {
        current: 'PLN',
        amount: 123123
      }
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})

