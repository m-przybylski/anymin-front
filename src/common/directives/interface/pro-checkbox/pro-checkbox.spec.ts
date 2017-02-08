describe('Unit testing: profitelo.directives.interface.pro-checkbox', () => {
  return describe('for interface.pro-checkbox directive >', () => {

    let scope: any     = null
    let rootScope
    let compile: any   = null
    let validHTML = '<pro-checkbox required id ng-model="isChecked"></pro-checkbox>'

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.interface.pro-checkbox')

      inject(($rootScope, $compile ) => {
        rootScope             = $rootScope.$new()
        compile               = $compile
      })
    })

    function create(html, isChecked) {
      scope = rootScope.$new()

      scope.isChecked = isChecked

      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML, true)
      expect(el.html()).toBeDefined(true)
    })

    it('should be isChecked after click in checkbox', () => {
      let el = create(validHTML, false)
      let isoScope = el.isolateScope()
      $(el).triggerHandler('click')
      expect(isoScope.ngModel).toEqual(true)
    })

    it('should throw error if bad model provided', inject(($exceptionHandler) => {
      // TODO: uncomment after anugular fix
      // expect(() => create(validHTML, 'false')).toThrow(new Error('ngModel must be of boolean type'))
      create(validHTML, 'false')
      expect($exceptionHandler.errors.length).toBeGreaterThan(0)
    }))
  })
})
