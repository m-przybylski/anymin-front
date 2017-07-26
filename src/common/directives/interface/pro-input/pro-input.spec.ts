namespace profitelo.directives.interface.proInput {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.interface.pro-input', () => {
    return describe('for interface.pro-input directive >', () => {

      const _placeholder = 'PLACEHOLDER'

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      const validHTML = '<pro-input data-label="LABEL" data-placeholder="' + _placeholder + '"  required auto-focus only-digits></pro-input>'

      beforeEach(() => {

        angular.mock.module('profitelo.directives.interface.pro-input')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          rootScope = $rootScope.$new()
          compile = $compile
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

      it('should create element with text', () => {
        const addonInput = '<pro-input data-addon-text="RANDOM-TEXT"></pro-input>'
        const el = create(addonInput)
        expect(el.html()).toBeDefined(true)
      })
      //
      // it('should focus input', () => {
      //   let el = create(validHTML)
      //   let isoScope = el.isolateScope()
      //
      //   spyOn(isoScope, 'focusInput')
      //
      //   $(el).triggerHandler('click')
      //   expect(isoScope.focusInput).toHaveBeenCalled()
      // })

      it('should change focus param on mouseover', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope()
        $(el).trigger('mouseover')
        expect(isoScope.focus).toBeTruthy()
      })

      it('should change focus param on mouseout', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope()
        $(el).trigger('mouseout')
        expect(isoScope.focus).toBeFalsy()
      })

      it('should toggle flags on input focus', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope()
        el.find('input').triggerHandler('focus')

        expect(isoScope.focus).toBeTruthy()
        expect(isoScope.onClick).toBeTruthy()
        expect(isoScope.placeholder).toEqual('')

      })

      it('should toggle flags on input blur', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope()
        el.find('input').triggerHandler('focus')
        el.find('input').blur()

        expect(isoScope.focus).toBeFalsy()
        expect(isoScope.onClick).toBeFalsy()
        expect(isoScope.placeholder).toEqual(_placeholder)

      })

      it('should hide removal cross if noDelete in template is declared', () => {
        const noDeleteInput = '<pro-input data-addon-text="RANDOM-TEXT" noDelete></pro-input>'

        const el = create(noDeleteInput)

        const isoScope = el.isolateScope()

        expect(isoScope.hideCross()).toEqual(false)

      })

      it('should allow to press only numbers', () => {
        const el = create(validHTML)
        const triggerKeyDown = function (element: JQuery, keyCode: number): void {
          const e = angular.element.Event('keypress')
          e.which = keyCode
          element.trigger(e)
        }
        triggerKeyDown(el.find('input'), 60)
        expect(el.find('input').val()).toBe('')
        /*  Value will always be ''*/
      })

    })
  })
}
