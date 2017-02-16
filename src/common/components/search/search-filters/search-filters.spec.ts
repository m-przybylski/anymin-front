namespace profitelo.components.search.searchFilters {


  import ISearchService = profitelo.services.search.ISearchService
  describe('Unit testing: profitelo.components.search.searchFilters', () => {
    return describe('for Search Filters component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: SearchFiltersComponentController
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
                $componentController: ng.IComponentControllerService, $q: ng.IQService) => {

          rootScope = $rootScope.$new()
          compile = $compile

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

        const el: JQuery = create(validHTML, bindings)
        expect(el.html()).toBeDefined(true)
      }))

    })
  })
}
