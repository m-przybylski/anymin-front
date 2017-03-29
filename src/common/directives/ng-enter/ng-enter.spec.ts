namespace profitelo.directives.ngEnter {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.ng-enter', () => {
    return describe('for ng-enter directive >', () => {

      let compile: any = null
      let scope: any = null
      let validHTML = '<input type="text" data-ng-enter="mockFunction()" />'

      beforeEach(() => {
        angular.mock.module('profitelo.directives.ng-enter')

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

      it('should call the mock function on pressing enter', () => {

        let el = create()
        spyOn(scope, 'mockFunction').and.callThrough()
        let e = jQuery.Event('keypress')
        e.which = 13
        e.keyCode = 13
        el.trigger(e)

        expect(scope.mockFunction).toHaveBeenCalled()
      })

    })
  })
}
