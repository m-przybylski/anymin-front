describe('Unit testing:profitelo.components.pro-search-dropdown', () => {
  return describe('for pro-search-dropdown >', () => {

    let element
    let rootScope
    let compile
    let scope
    let state
    let componentController
    let component
    let validHTML = '<pro-search-dropdown></pro-search-dropdown>'
    let httpBackend
    let SearchApiDef
    let CategoryApiDef

    function create(html) {
      rootScope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(rootScope)
      rootScope.$digest()
      return compiledElement
    }

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', '')
      $provide.value('translateFilter', (x) => { return x })
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.pro-search-dropdown')
      module('profitelo.swaggerResources.definitions')

      inject(($rootScope, $compile, $injector, _$componentController_) => {
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
      httpBackend.whenRoute(SearchApiDef.searchSuggestions.method, SearchApiDef.searchSuggestions.url).respond(200, {})
      httpBackend.when(CategoryApiDef.listCategories.method, CategoryApiDef.listCategories.url).respond(200, [])
      component.ngModel = 'foo'
      rootScope.$digest()

      expect(component.suggestions.primary).toEqual('')
    })

  })
})

