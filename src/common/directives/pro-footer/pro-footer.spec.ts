describe('Unit testing: profitelo.directives.pro-footer', () => {
  return describe('for pro-footer directive >', () => {

    let scope: any = null
    let rootScope
    let compile: any = null
    let validHTML = '<pro-footer></pro-footer>'

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.pro-footer')

      inject(($rootScope, $compile) => {
        rootScope = $rootScope.$new()
        compile = $compile
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
