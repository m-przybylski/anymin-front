namespace profitelo.services.search {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ISearchApiMock = profitelo.api.ISearchApiMock
  import ICategoryApiMock = profitelo.api.ICategoryApiMock
  import ICategoryService = profitelo.services.categoryService.ICategoryService

  describe('Unit testing: profitelo.services.search >', () => {
    describe('for searchService service >', () => {

      let searchService: ISearchService
      let httpBackend: any
      let SearchApiMock: ISearchApiMock
      let CategoryApiMock: ICategoryApiMock
      let $rootScope: IRootScopeService
      let SearchApiDef: any
      let CategoryApiDef: any

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL')
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.services.search')
        angular.mock.module('profitelo.swaggerResources.definitions')
        angular.mock.module('profitelo.services.categories')

        inject(($injector: ng.auto.IInjectorService) => {
          searchService = $injector.get<ISearchService>('searchService')
          httpBackend = $injector.get<ng.IHttpBackendService>('$httpBackend')
          CategoryApiMock = $injector.get<ICategoryApiMock>('CategoryApiMock')
          SearchApiMock = $injector.get<ISearchApiMock>('SearchApiMock')
          $rootScope = $injector.get<IRootScopeService>('$rootScope')
          CategoryApiDef = $injector.get('CategoryApiDef')
          SearchApiDef = $injector.get('SearchApiDef')
        })

      })

      it('should exist', () => {
        expect(true).toBeTruthy()
      })

      it('should return default search parameter', () => {
        let observer = {
          callback: (_: any) => {
          }
        }
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
          limit: 20,
          minPrice: 0,
          maxPrice: 100
        })
      })

      it('should set search parameters', () => {

        const params = {
          q: 'query',
          tagId: '23',
          category: '34',
          profileType: 'EXP',
          onlyAvailable: false,
          sortBy: 'price',
          language: 'pl',
          offset: 143,
          limit: 20,
          minPrice: 5,
          maxPrice: 10
        }

        //FIXME replace with SearchMock when queryparams will work
        httpBackend.whenRoute('GET', 'awesomeURL/search?').respond(200, {})

        let observer = {
          callback: (_: any) => {
          }
        }
        spyOn(observer, 'callback')

        searchService.setSearchQueryParams(params)

        searchService.onQueryParamsChange($rootScope, (params) => {
          observer.callback(angular.extend({}, params))
        })

        $rootScope.$digest()
        httpBackend.flush()

        expect(observer.callback).toHaveBeenCalledWith({
          q: 'query',
          tagId: '23',
          category: '34',
          profileType: 'EXP',
          onlyAvailable: false,
          sortBy: 'price',
          language: 'pl',
          offset: 143,
          limit: 20,
          minPrice: 5,
          maxPrice: 10
        })
      })

      it('should set default parameters instead of incorrect ones', () => {
        const params = {
          q: undefined,
          tagId: '23',
          category: '34',
          profileType: 'BAD',
          onlyAvailable: false,
          sortBy: 'whatever',
          language: 'klingon',
          offset: -5,
          limit: 20,
          minPrice: 5.99,
          maxPrice: -210
        }
        //FIXME replace with SearchMock when queryparams will work
        httpBackend.whenRoute('GET', 'awesomeURL/search?').respond(200, {})

        const observer = {
          callback: (_: any) => {
          }
        }
        spyOn(observer, 'callback')

        searchService.setSearchQueryParams(params)

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
          limit: 20,
          minPrice: 5,
          maxPrice: 0
        })
      })

      it('should set implicit search parameters', inject((categoryService: ICategoryService, $q: ng.IQService) => {

        spyOn(categoryService, 'getCategoryBySlug').and.returnValue($q.resolve({id: '123'}))

        let observer = {
          callback: (_: any) => {
          }
        }
        spyOn(observer, 'callback')

        searchService.setSearchQueryParams({
          categorySlug: 'test-cat'
        })

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
          limit: 20,
          minPrice: 0,
          maxPrice: 100
        })
      }))

    })
  })
}
