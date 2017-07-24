namespace profitelo.components.interface.preloader {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.interface.preloader', () => {
    return describe('for preloader component >', () => {

      const url = 'awesomUrl/'

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      const validHTML = '<preloader data-is-loading= "true"></preloader>'
      let _timeout: ng.ITimeoutService
      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
        $provide.value('apiUrl', url)
      }))

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.interface.preloader')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, $timeout: ng.ITimeoutService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
          _timeout = $timeout
        })

        component = componentController('preloader', {$element: create(validHTML), $scope: scope}, {})

      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })
    })
  })
}
