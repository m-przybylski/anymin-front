namespace profitelo.directives.ngEnter {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.ng-enter', () => {
    return describe('for ng-enter directive >', () => {

      var compile: any = null
      var scope: any = null
      var validHTML = '<input type="text" data-ng-enter="mockFunction()" />'

      beforeEach(() => {
        angular.mock.module('profitelo.directives.ng-enter')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          scope = $rootScope.$new()
          compile = $compile
        })
      })


      function create() {
        var elem = angular.element(validHTML)
        scope.mockFunction = () => {
        }
        var compiledElement = compile(elem)(scope)
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
        var e = jQuery.Event('keypress')
        e.which = 13
        e.keyCode = 13
        el.trigger(e)

        expect(scope.mockFunction).toHaveBeenCalled()
      })

    })
  })
}
