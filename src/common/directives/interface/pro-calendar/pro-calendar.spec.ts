namespace profitelo.directives.interface.proCalendar {
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.interface.pro-calendar', () => {
  return describe('for interface.pro-calendar directive >', () => {

    let scope: any     = null
    let rootScope: ng.IRootScopeService
    let compile: any   = null
    const validHTML = '<pro-calendar></pro-calendar>'

    beforeEach(() => {

    angular.mock.module('profitelo.directives.interface.pro-calendar')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
      })
    })

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
}
