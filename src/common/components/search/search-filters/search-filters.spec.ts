namespace profitelo.components.search.searchFilters {


  import ISearchService = profitelo.services.search.ISearchService
  describe('Unit testing: profitelo.components.search.searchFilters', () => {
    return describe('for Search Filters component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: SearchFiltersComponentController
      let timeout: ng.ITimeoutService
      let searchService = {
        getAvailableOptions: {},
        onQueryParamsChange: () => {}
      }
      const validHTML: string = '<search-filters search-results="searchResults" set-search-params="setSearchParams"></search-filters>'

      const bindings: ISearchFiltersComponentBindings = {
        searchResults: [{}],
        setSearchParams: () => {}
      }

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl/')
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.search.searchFilters')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService, $q: ng.IQService,
                $timeout: ng.ITimeoutService) => {

          rootScope = $rootScope.$new()
          compile = $compile
          timeout = $timeout
          const injectors = {
            searchService: searchService
          }

          spyOn(searchService, "getAvailableOptions").and.callFake(() => {
            let deferred = $q.defer()
            deferred.resolve({
              language: [{ name: 'asas', value: 'asas' }],
              sortBy: ['jhjhj'],
              category: [{ name: 'asas', value: 'asas' }],
              profileType: [{ name: 'asas', value: 'asas' }]
            })
            return deferred.promise
          })

          spyOn(searchService, "onQueryParamsChange").and.callFake(() => {
            let deferred = $q.defer()
            deferred.resolve({
            })
            return deferred.promise
          })

          component = $componentController<SearchFiltersComponentController, ISearchFiltersComponentBindings>(
            'searchFilters', injectors, bindings
          )
        })
      })

      function create(html: string, bindings: ISearchFiltersComponentBindings): JQuery {
        const parentScope: ng.IScope = rootScope.$new()
        const parentBoundScope = angular.extend(parentScope, bindings)
        const elem: JQuery = angular.element(html)
        const compiledElement: JQuery = compile(elem)(parentBoundScope)
        parentBoundScope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', inject((searchService: ISearchService, $q: ng.IQService) => {

        spyOn(searchService, 'getAvailableOptions').and.callFake(() => {
          let deferred = $q.defer()
          deferred.resolve({
            language: [{ name: 'asas', value: 'asas' }],
            sortBy: ['jhjhj'],
            category: [{ name: 'asas', value: 'asas' }],
            profileType: [{ name: 'asas', value: 'asas' }]
          })
          return deferred.promise
        })

        spyOn(searchService, 'onQueryParamsChange').and.callFake((_scope: ng.IScope, callback: (results: any) => void ) => {
          return callback({language: [{ name: 'asas', value: 'asas' }],
            sortBy: ['jhjhj'],
            category: [{ name: 'asas', value: 'asas' }],
            onlyAvailable: true,
            maxPrice: '100',
            profileType: [{ name: 'asas', value: 'asas' }]})
        })

        const el: JQuery = create(validHTML, bindings)
        expect(el.html()).toBeDefined(true)
        timeout.flush()
      }))

      it('should change activity status', inject(() => {
        component.onActivityStatusChange(true)
        expect(searchService.onQueryParamsChange).toHaveBeenCalled()
      }))

      it('should change price range', inject(() => {
        component.onPriceRangeBarUpdate(20, 40, 'as')
        expect(searchService.onQueryParamsChange).toHaveBeenCalled()
      }))

      it('should update sort type', inject(() => {
        component.updateSortTypeParam('asdasd')
        expect(searchService.onQueryParamsChange).toHaveBeenCalled()
      }))

      it('should update language type', inject(() => {
        component.updateLanguageTypeParam('asdasd')
        expect(searchService.onQueryParamsChange).toHaveBeenCalled()
      }))

      it('should update list type', inject(() => {
        component.updateTypeListTypeParam('asdasd')
        expect(searchService.onQueryParamsChange).toHaveBeenCalled()
      }))

      it('should update category type', inject(() => {
        component.updateCategoryTypeParam('asdasd')
        expect(searchService.onQueryParamsChange).toHaveBeenCalled()
      }))


    })
  })
}
