describe('Unit testing: profitelo.components.interface.mouse-slider', () => {
  return describe('for interface.mouse-slider component >', () => {

    let scope     = null
    let rootScope
    let compile   = null
    let validHTML = '<mouse-slider></mouse-slider>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.mouse-slider')

      inject(($rootScope, $compile ) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML, true)
      expect(el.html()).toBeDefined(true)
    })
  })
})
