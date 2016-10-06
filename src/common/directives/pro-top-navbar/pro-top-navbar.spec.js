describe('Unit testing: profitelo.directives.pro-top-navbar', () => {
  return describe('for pro-top-navbar directive >', () => {

    let scope = null
    let rootScope
    let state
    let compile = null
    let validHTML = '<pro-top-navbar></pro-top-navbar>'
    let smoothScrolling

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', '')
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.pro-top-navbar')

      inject(($rootScope, $compile, _smoothScrolling_) => {
        rootScope = $rootScope.$new()
        compile = $compile
        state = {}
        smoothScrolling = _smoothScrolling_
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
