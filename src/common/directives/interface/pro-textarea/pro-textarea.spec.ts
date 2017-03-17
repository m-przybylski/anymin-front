namespace profitelo.directives.interface.proTextarea {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Unit testing: profitelo.directives.interface.pro-textarea', () => {
    return describe('for interface.pro-textarea directive >', () => {

      let _placeholder = 'PLACEHOLDER'

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      let validHTML = '<pro-textarea data-name="name" data-default-value="defaultValue" data-maxlength="maxlength" data-label="LABEL" data-placeholder="' + _placeholder + '"  required auto-focus only-digits></pro-textarea>'

      beforeEach(() => {

        angular.mock.module('profitelo.directives.interface.pro-textarea')

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

      it('should focusInput', () => {
        let el = create(validHTML)
        let isoScope = el.isolateScope()

        const input = el.find('input')
        input.triggerHandler('focus')
        isoScope.focusInput()
      })

      it('should onFocusOut', () => {
        let el = create(validHTML)
        let isoScope = el.isolateScope()

        isoScope.onFocusOut()
        expect(isoScope.focus).toBeFalsy()
        expect(isoScope.onClick).toBeFalsy()
        expect(isoScope.placeholder).toEqual(_placeholder)
      })

      it('should onFocus', () => {
        let el = create(validHTML)
        let isoScope = el.isolateScope()

        isoScope.onFocus()
        expect(isoScope.focus).toBeTruthy()
        expect(isoScope.onClick).toBeTruthy()
        expect(isoScope.placeholder).toEqual('')
      })

      it('should onMouseover', () => {
        let el = create(validHTML)
        let isoScope = el.isolateScope()

        isoScope.onMouseover()
        expect(isoScope.focus).toBeTruthy()
      })

      it('should onMouseout', () => {
        let el = create(validHTML)
        let isoScope = el.isolateScope()

        isoScope.onClick = false
        isoScope.onMouseout()
        expect(isoScope.focus).toBeFalsy()
      })

    })
  })
}
