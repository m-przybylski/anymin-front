namespace profitelo.directives.autoFocus {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.auto-focus', () => {
    return describe('for auto-focus directive >', () => {

      let compile: any = null
      let scope: any = null
      let validHTML = '<form><input type="text" name="first" auto-focus/>' +
        '<input type="text" name="second"/></form>'

      beforeEach(() => {
        angular.mock.module('profitelo.directives.auto-focus')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          scope = $rootScope.$new()
          compile = $compile
        })
      })

      function create() {
        let elem = angular.element(validHTML)
        scope.mockFunction = () => {
        }
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        let el = create()
        expect(el.html()).toBeDefined(true)
      })
    })
  })
}
