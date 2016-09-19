describe('Unit testing: profitelo.directives.ng-enter', () => {
  return describe('for ng-enter directive >', () => {

    var compile   = null
    var scope     = null
    var validHTML = '<input type="text" data-ng-enter="mockFunction()" />'

    beforeEach(() => {
      module('profitelo.directives.ng-enter')

      inject(($rootScope, $compile) => {
        scope                 = $rootScope.$new()
        compile               = $compile
      })
    })


    function create() {
      var elem = angular.element(validHTML)
      scope.mockFunction = () => {}
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
      let isoScope = el.isolateScope()
      console.log(isoScope)
      spyOn(scope, 'mockFunction').and.callThrough()
      var e = jQuery.Event('keypress')
      e.which = 13
      e.keyCode = 13
      el.trigger(e)
    
      expect(scope.mockFunction).toHaveBeenCalled()
    })

  })
})
