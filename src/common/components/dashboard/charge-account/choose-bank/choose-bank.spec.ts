describe('Unit testing: profitelo.components.dashboard.charge-account.choose-bank', () => {
  return describe('for chooseBank component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let bindings
    let el
    let smoothScrollingService
    let validHTML = '<choose-bank bank-model="{value: 1}" payments-links="[{value: 1}, {value: 2}]" scroll-section-id="1"></choose-bank>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.dashboard.charge-account.choose-bank')

      inject(($rootScope, $compile, _$componentController_, _smoothScrollingService_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        smoothScrollingService = _smoothScrollingService_
      })

      bindings = {
        bankModel: {
          value: 1
        },
        paymentsLinks: [
          {value: 1}
        ],
        scrollSectionId: 1
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

    it('should call scroll method and select bank', () => {
      spyOn(smoothScrollingService, 'scrollTo')
      el.find('.option:first-child').trigger('click')
      expect(smoothScrollingService.scrollTo).toHaveBeenCalled()
    })

  })
})
