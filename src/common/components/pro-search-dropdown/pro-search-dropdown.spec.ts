namespace profitelo.components.proSearchDropdown {
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
    let SearchApiDef: any
    let CategoryApiDef: any

    function create(html: string) {
      rootScope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(rootScope)
      rootScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', '')
      $provide.value('translateFilter', (x: any) => { return x })
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.pro-search-dropdown')
    angular.mock.module('profitelo.swaggerResources.definitions')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService, _$componentController_: ng.IComponentControllerService) => {
        rootScope = $rootScope
        componentController = _$componentController_
        scope = $rootScope.$new()
        compile = $compile
        state = $injector.get('$state')
        SearchApiDef = $injector.get('SearchApiDef')
        CategoryApiDef = $injector.get('CategoryApiDef')
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
      httpBackend.when(SearchApiDef.searchSuggestions.method, SearchApiDef.searchSuggestions.url).respond(200, {})
      httpBackend.when(CategoryApiDef.listCategories.method, CategoryApiDef.listCategories.url).respond(200, [])
      component.ngModel = 'foo'
      rootScope.$digest()

      expect(component.primarySuggestion).toEqual('')
    })

  })
})

}
