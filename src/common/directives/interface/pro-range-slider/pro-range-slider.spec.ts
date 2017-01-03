describe('Unit testing: profitelo.directives.interface.pro-range-slider', () => {
  return describe('for interface.pro-range-slider directive >', () => {


    let scope     = null
    let rootScope
    let compile   = null
    let validHTML = '<pro-range-slider max-value="max" min-value="min"></pro-range-slider>'

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.interface.pro-range-slider')

      inject(($rootScope, $compile ) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
      })
    })

    function create(html, min, max) {
      scope = rootScope.$new()
      scope.min = min
      scope.max = max
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML, 0, 100)
      expect(el.html()).toBeDefined(true)
    })

  })
})