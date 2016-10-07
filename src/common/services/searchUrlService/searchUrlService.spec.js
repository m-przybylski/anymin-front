describe('Unit testing: profitelo.services.search-url >', () => {
  describe('for searchUrlService service >', () => {

    let searchService, httpBackend, SearchApiDef, CategoryApiDef, searchUrlService, $rootScope

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', '')
    }))

    beforeEach(() => {
      module('profitelo.services.search')
      module('profitelo.services.search-url')
      module('profitelo.swaggerResources.definitions')
      module('profitelo.services.categories')

      inject(($injector) => {
        searchUrlService = $injector.get('searchUrlService')
        searchService = $injector.get('searchService')
        httpBackend = $injector.get('$httpBackend')
        CategoryApiDef = $injector.get('CategoryApiDef')
        SearchApiDef = $injector.get('SearchApiDef')
        $rootScope = $injector.get('$rootScope')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

  })
})
