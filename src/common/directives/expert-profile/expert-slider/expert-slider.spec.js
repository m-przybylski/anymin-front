describe('Unit testing: profitelo.directives.expert-profile.expert-slider', () => {
  return describe('for expert-profile.expert-slider directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<expert-slider></expert-slider>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.expert-profile.expert-slider')

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
