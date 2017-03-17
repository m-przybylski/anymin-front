namespace profitelo.directives.passwordStrengthBar {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.password-strength-bar', () => {
    return describe('for password-strength-bar directive >', () => {

      let compile: any = null
      let scope: any = null
      let validHTML = '<password-strength-bar data-current-class="currentClass"></password-strength-bar>'


      beforeEach(() => {

        angular.mock.module('profitelo.directives.password-strength-bar')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          scope = $rootScope.$new()
          compile = $compile
          scope.currentClass = 0
        })

      })

      function create(html: string) {
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

      it('should change progressBar class', () => {
        let el = create(validHTML)
        let isoScope = el.isolateScope()


        isoScope.currentClass = -1
        scope.$apply()
        expect($(el.html()).find('.start').length).toEqual(1)

        isoScope.currentClass = 0
        scope.$apply()
        expect($(el.html()).find('.start').length).toEqual(1)

        isoScope.currentClass = 1
        scope.$apply()
        expect($(el.html()).find('.very-weak').length).toEqual(1)

        isoScope.currentClass = 2
        scope.$apply()
        expect($(el.html()).find('.weak').length).toEqual(1)

        isoScope.currentClass = 3
        scope.$apply()
        expect($(el.html()).find('.strong').length).toEqual(1)

        isoScope.currentClass = 4
        scope.$apply()
        expect($(el.html()).find('.very-strong').length).toEqual(1)

        isoScope.currentClass = 5
        scope.$apply()
        expect($(el.html()).find('.very-strong').length).toEqual(1)


      })

    })
  })
}
