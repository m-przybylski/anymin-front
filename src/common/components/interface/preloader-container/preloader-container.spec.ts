namespace profitelo.components.interface.preloaderContainer {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.interface.preloader-container', () => {
    return describe('for preloaderContainer component >', () => {

      const url = 'awesomUrl/'

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let validHTML = '<preloader-container data-is-loading="vm.isLoadMoreLoading" data-is-error="vm.isLoadMoreError"' +
        'data-error-fn="vm.loadMoreOnClick" data-error-message="SEARCH.PRELOADER_CONTAINER.ERROR_MESSAGE"></preloader-container>'

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      function create(html: string) {
        scope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.interface.preloader-container')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
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
        let el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })
    })
  })
}
