describe('Unit testing: profitelo.directives.search.search-filters', () => {
  return describe('for search-filters directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<search-filters data-model="model" data-set-search-params="callback" data-search-results="searchResults"></search-filters>'
    let _httpBackend = null
    let _CategoriesApiDef
    let resourcesExpectations
    const url = 'awesomeUrl'
    
    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))
    
    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.directives.search.search-filters')
    angular.mock.module('profitelo.services.search')

      inject(($rootScope, $compile, $injector) => {
        rootScope = $rootScope.$new()
        compile = $compile
        _httpBackend = $injector.get('$httpBackend')
        _CategoriesApiDef = $injector.get('CategoryApiDef')
      })

      resourcesExpectations = {
        CategoriesApi: {
          getCategories: _httpBackend.when(_CategoriesApiDef.listCategories.method, _CategoriesApiDef.listCategories.url)
        }
      }

      resourcesExpectations.CategoriesApi.getCategories.respond(200)
    })

    function create(html) {
      scope = rootScope.$new()
      scope.callback = () => {}
      scope.model = {
        sortBy: '',
        language: '',
        category: '',
        onlyAvailable: false,
        tags: [],
        minPrice: 0,
        maxPrice: 100
      }
      scope.searchResults = {}
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
  })
})