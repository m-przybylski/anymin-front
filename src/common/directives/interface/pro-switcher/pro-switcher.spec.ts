namespace profitelo.directives.interface.proSwitcher {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.interface.pro-input-switcher', () => {
    return describe('for interface.pro-input-switcher directive >', () => {

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      const validHTML = '<pro-switcher ng-model="isChecked" data-label="LABEL" id data-name="NAME" ></pro-switcher>'

      beforeEach(() => {

        angular.mock.module('profitelo.directives.interface.pro-switcher')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          rootScope = $rootScope.$new()
          compile = $compile
        })
      })

      function create(html: string, isChecked: boolean): JQuery {
        scope = rootScope.$new()

        scope.isChecked = isChecked

        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        const el = create(validHTML, true)
        expect(el.html()).toBeDefined(true)
      })

      it('should be isChecked after click in checkbox', () => {
        const el = create(validHTML, false)
        const isoScope = el.isolateScope()
        $(el).find('.checkbox-switcher').triggerHandler('click')
        expect(isoScope.ngModel).toEqual(true)
      })

      it('should throw error if bad model provided', inject(() => {
        expect(() => {
          create(validHTML, <any>'false')
        }).toThrow(new Error('ngModel must be of boolean type'))
      }))
    })
  })
}
