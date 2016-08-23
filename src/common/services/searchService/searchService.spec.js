describe('Unit testing: profitelo.services.search >', () => {
  describe('for searchService service >', () => {

    let searchService, httpBackend, SearchApiDef, CategoryApiDef, $scope, $rootScope

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', '')
    }))

    beforeEach(() => {
      module('profitelo.services.search')
      module('profitelo.swaggerResources.definitions')
      module('profitelo.services.categories')

      inject(($injector) => {
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

    it('should return default search parameter', () => {
      let observer = { callback: () => {} }
      spyOn(observer, 'callback')

      searchService.onQueryParamsChange($rootScope, (params) => {
        observer.callback(angular.extend({}, params))
      })

      $rootScope.$digest()

      expect(observer.callback).toHaveBeenCalledWith({
        q: undefined,
        tagId: undefined,
        category: undefined,
        profileType: undefined,
        onlyAvailable: false,
        sortBy: 'top',
        language: undefined,
        offset: 0,
        limit: 42,
        minPrice: 0,
        maxPrice: 100
      })
    })

    it('should set search parameters', () => {
      httpBackend.whenRoute(SearchApiDef.search.method, SearchApiDef.search.url).respond(200, {})

      let observer = { callback: () => {} }
      spyOn(observer, 'callback')

      searchService.setSearchQueryParams({
        q: 'query 123',
        tagId: '23',
        category: '34',
        profileType: 'EXP',
        onlyAvailable: 'false',
        sortBy: 'price',
        language: 'pl',
        offset: '143',
        limit: '43',
        minPrice: '5',
        maxPrice: '10'
      })

      searchService.onQueryParamsChange($rootScope, (params) => {
        observer.callback(angular.extend({}, params))
      })

      $rootScope.$digest()
      httpBackend.flush()

      expect(observer.callback).toHaveBeenCalledWith({
        q: 'query 123',
        tagId: '23',
        category: '34',
        profileType: 'EXP',
        onlyAvailable: false,
        sortBy: 'price',
        language: 'pl',
        offset: 143,
        limit: 43,
        minPrice: 5,
        maxPrice: 10
      })
    })

    it('should set default parameters instead of incorrect ones', () => {
      httpBackend.whenRoute(SearchApiDef.search.method, SearchApiDef.search.url).respond(200, {})

      let observer = { callback: () => {} }
      spyOn(observer, 'callback')

      searchService.setSearchQueryParams({
        q: null,
        tagId: 23,
        category: 34,
        profileType: 'BAD',
        onlyAvailable: 'not true',
        sortBy: 'whatever',
        language: 'klingon',
        offset: '-5',
        limit: 'fourty four',
        minPrice: 5.99,
        maxPrice: '-210'
      })

      searchService.onQueryParamsChange($rootScope, (params) => {
        observer.callback(angular.extend({}, params))
      })

      $rootScope.$digest()
      httpBackend.flush()

      expect(observer.callback).toHaveBeenCalledWith({
        q: undefined,
        tagId: '23',
        category: '34',
        profileType: undefined,
        onlyAvailable: false,
        sortBy: 'top',
        language: undefined,
        offset: 0,
        limit: 42,
        minPrice: 5,
        maxPrice: 0
      })
    })

    it('should set implicit search parameters', () => {
      httpBackend.whenRoute(SearchApiDef.search.method, SearchApiDef.search.url).respond(200, {})
      httpBackend.when(CategoryApiDef.listCategories.method, CategoryApiDef.listCategories.url).respond(200, [{
        id: 42,
        parentCategoryId: null,
        slug: 'test-cat'
      }])

      let observer = { callback: () => {} }
      spyOn(observer, 'callback')

      searchService.setSearchQueryParams({
        categorySlug: 'test-cat'
      })

      searchService.onQueryParamsChange($rootScope, (params) => {
        observer.callback(angular.extend({}, params))
      })

      $rootScope.$digest()
      httpBackend.flush()

      expect(observer.callback).toHaveBeenCalledWith({
        q: undefined,
        tagId: undefined,
        category: '42',
        profileType: undefined,
        onlyAvailable: false,
        sortBy: 'top',
        language: undefined,
        offset: 0,
        limit: 42,
        minPrice: 0,
        maxPrice: 100
      })
    })

  })
})
