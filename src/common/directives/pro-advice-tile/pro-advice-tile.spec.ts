describe('Unit testing: profitelo.directives.pro-advice-tile', () => {
  return describe('for proAdviceTile directive >', () => {

    let _placeholder = 'PLACEHOLDER'

    let scope     = null
    let rootScope
    let compile   = null
    let validHTML = '<pro-advice-tile></pro-advice-tile>'

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.pro-advice-tile')

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
