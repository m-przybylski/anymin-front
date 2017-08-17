namespace profitelo.directives.getHeight {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.getHeight', () => {
    return describe('for getHeight directive >', () => {

      let compile: ng.ICompileService
      let scope: ng.IScope
      const validHTML = '<get-height></get-height>'

      beforeEach(() => {
        angular.mock.module('profitelo.directives.getHeight')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          scope = $rootScope.$new()
          compile = $compile
        })
      })

      function create() {
        const elem = angular.element(validHTML)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        const el = create()
        expect(el.html()).toBeDefined(true)
      })

    })
  })
}
