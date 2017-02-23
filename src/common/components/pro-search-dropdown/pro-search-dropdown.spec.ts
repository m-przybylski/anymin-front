namespace profitelo.components.proSearchDropdown {
  import ISearchApiMock = profitelo.api.ISearchApiMock
  import ICategoryApiMock = profitelo.api.ICategoryApiMock
  describe('Unit testing:profitelo.components.pro-search-dropdown', () => {
    return describe('for pro-search-dropdown >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let scope: any
      let state: any
      let componentController: any
      let component: any
      let validHTML = '<pro-search-dropdown data-mask-search="vm.interfaceController.hideSearchMask"></pro-search-dropdown>'
      let httpBackend: ng.IHttpBackendService
      let SearchApiMock: ISearchApiMock
      let CategoryApiMock: ICategoryApiMock

      function create(html: string) {
        rootScope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(rootScope)
        rootScope.$digest()
        return compiledElement
      }

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', '')
        $provide.value('translateFilter', (x: any) => {
          return x
        })
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.pro-search-dropdown')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService, _$componentController_: ng.IComponentControllerService) => {
          rootScope = $rootScope
          componentController = _$componentController_
          scope = $rootScope.$new()
          compile = $compile
          state = $injector.get('$state')
          SearchApiMock = $injector.get<ISearchApiMock>('SearchApiMock')
          CategoryApiMock = $injector.get<ICategoryApiMock>('CategoryApiMock')
          httpBackend = $injector.get('$httpBackend')
        })

        component = componentController('proSearchDropdown', {$element: create(validHTML), $scope: scope}, {})
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        let el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should watch query', () => {
        //FIXME type
        SearchApiMock.searchSuggestionsRoute(200, undefined, undefined, <any>{})
        CategoryApiMock.listCategoriesRoute(200, [])
        component.ngModel = 'foo'
        rootScope.$digest()

        expect(component.primarySuggestion).toEqual('')
      })

    })
  })

}
