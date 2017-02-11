namespace profitelo.directives.scrollable {
  import IWindowService = profitelo.services.window.IWindowService
  import IStyleConstant = profitelo.constants.style.IStyleConstant
  describe('Unit testing: profitelo.directives.interface.scrollable', () => {
    return describe('for profitelo.directives.scrollable directive >', () => {

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      let timeout: ng.ITimeoutService
      let interval: ng.IIntervalService
      let window: IWindowService
      let styleConstant: IStyleConstant
      let validHTML = '<scrollable></scrollable>'

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.constants.style')
        angular.mock.module('profitelo.directives.interface.scrollable')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$timeout_: ng.ITimeoutService,
                _$interval_: ng.IIntervalService, _$window_: IWindowService, _styleConstant_: IStyleConstant) => {
          rootScope = $rootScope.$new()
          compile = $compile
          timeout = _$timeout_
          window = _$window_
          interval = _$interval_
          styleConstant = _styleConstant_
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

      it('should timeout', inject(() => {
        create(validHTML)
        timeout.flush()
      }))

      it('should timeout', inject(() => {
        create(validHTML)
        timeout.flush()
      }))

      it('should assignNewHeightConainer', inject(() => {
        create(validHTML)
      }))
    })
  })
}
