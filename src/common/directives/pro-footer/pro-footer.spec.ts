namespace profitelo.directives.proFooter {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.pro-footer', () => {
    return describe('for pro-footer directive >', () => {

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      let validHTML = '<pro-footer></pro-footer>'

      beforeEach(() => {

        angular.mock.module('profitelo.directives.pro-footer')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          rootScope = $rootScope.$new()
          compile = $compile
        })
      })

      function create(html: string) {
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
}
