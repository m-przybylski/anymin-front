namespace profitelo.components.interface.preloaderContainer {
  
  describe('Unit testing: profitelo.components.interface.preloader-container', () => {
    return describe('for preloaderContainer component >', () => {

      const url = 'awesomUrl/'

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      const validHTML = '<preloader-container data-is-loading="vm.isLoadMoreLoading" data-is-error="vm.isLoadMoreError"' +
        'data-error-fn="vm.loadMoreOnClick" data-error-message="SEARCH.PRELOADER_CONTAINER.ERROR_MESSAGE"></preloader-container>'

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

        angular.mock.module('profitelo.components.interface.preloader-container')

        inject(($rootScope: any, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })

        component = componentController('preloaderContainer', {$element: create(validHTML), $scope: scope}, {})

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
