namespace profitelo.directives.interface.proInputPassword {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.interface.pro-input-password', () => {
    return describe('for interface.pro-input-password directive >', () => {

      const _placeholder = 'PLACEHOLDER'

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      const validHTML = '<pro-input-password data-label="LABEL" data-placeholder="' + _placeholder + '"  required auto-focus></pro-input-password>'

      beforeEach(() => {

        angular.mock.module('profitelo.directives.interface.pro-input-password')

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
        const addonInput = '<pro-input-password data-addon-text="RANDOM-TEXT"></pro-input-password>'
        const el = create(addonInput)
        expect(el.html()).toBeDefined(true)
      })

      // it('should focus input', () => {
      //   let el = create(validHTML)
      //   let isoScope = el.isolateScope()
      //   spyOn(isoScope, 'focusInput').and.callThrough()
      //   $(el).find('input').trigger('click')
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

      it('should change input type to text if visibility toggle clicked', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope()
        el.find('.input-group-addon.active-addon').click()

        expect(isoScope.inputType).toEqual('text')

      })

      it('should change back to input password to text if visibility toggle clicked twice', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope()
        el.find('.input-group-addon.active-addon').click()

        expect(isoScope.inputType).toEqual('text')

        el.find('.input-group-addon.active-addon').click()

        expect(isoScope.inputType).toEqual('password')

      })

    })
  })
}
