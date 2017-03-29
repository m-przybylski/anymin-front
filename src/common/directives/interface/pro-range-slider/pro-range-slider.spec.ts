namespace profitelo.directives.interface.proRangeSlider {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.interface.pro-range-slider', () => {
    return describe('for interface.pro-range-slider directive >', () => {

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      let validHTML = '<pro-range-slider max-value="max" min-value="min"></pro-range-slider>'

      beforeEach(() => {

        angular.mock.module('profitelo.directives.interface.pro-range-slider')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $httpBackend: ng.IHttpBackendService) => {
          rootScope = $rootScope.$new()
          compile = $compile

          $httpBackend.when('GET', require("../../../templates/range-slider/range-slider.tpl.pug")).respond(200, "")
        })
      })

      function create(html: string, min: number, max: number) {
        scope = rootScope.$new()
        scope.min = min
        scope.max = max
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        let el = create(validHTML, 0, 100)
        expect(el.html()).toBeDefined(true)
      })

    })
  })
}
