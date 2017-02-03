describe('Unit testing: profitelo.directives.expert-profile.pro-expert-social-icons', () => {
  return describe('for expert-profile.pro-expert-social-icons directive >', () => {

    let scope: any = null
    let rootScope
    let compile: any = null
    let validHTML = '<pro-expert-social-icons></pro-expert-social-icons>'

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.expert-profile.pro-expert-social-icons')

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
