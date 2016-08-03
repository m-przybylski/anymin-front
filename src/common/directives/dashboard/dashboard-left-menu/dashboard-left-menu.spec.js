describe('Unit testing: profitelo.directives.dashboard.dashboard-left-menu', () => {
  return describe('for dashboardLeftMenu directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<dashboard-left-menu></dashboard-left-menu>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.dashboard.dashboard-left-menu')

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
