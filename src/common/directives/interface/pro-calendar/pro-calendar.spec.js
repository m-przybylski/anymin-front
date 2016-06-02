describe('Unit testing: profitelo.directives.interface.pro-calendar', () => {
  return describe('for interface.pro-calendar directive >', () => {

    let scope     = null
    let rootScope
    let compile   = null
    let validHTML = '<pro-calendar></pro-calendar>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.interface.pro-calendar')

      inject(($rootScope, $compile ) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
