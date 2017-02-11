namespace profitelo.search {
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ISearchUrlService = profitelo.services.searchUrl.ISearchUrlService
  import ISearchService = profitelo.services.search.ISearchService
  describe('Unit tests: search-result>', () => {
  describe('Testing Controller: SearchResultController', () => {

    let $scope: any
    let SearchResultController: any
    let location: ng.ILocationService
    let searchUrlService: ISearchUrlService
    let state: ng.ui.IStateService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', '')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.search-result')
    angular.mock.module('profitelo.services.search')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $timeout: ng.ITimeoutService,
              searchService: ISearchService) => {
        $scope = $rootScope.$new()
        location = <ng.ILocationService>{
          search: () => {
            return {}
          }
        }

        state = <ng.ui.IStateService>{
          current: {
            name: 'app.search-result'
          },
          go: (_x: any) => {
            return {}
          }
        }

        searchService = <ISearchService>{
          onSearchResults: (_$scope, cb: Function) => {
            cb()
          },

          setSearchQueryParams: (_params) => {

          },

          onQueryParamsChange: (_scope, cb) => {
            cb(angular.extend(location.search(), {q: 'prawo'}))
          }
        }

        searchUrlService = <ISearchUrlService> {
          parseParamsForUrl: () => {
            return {}
          }
        }

        SearchResultController = $controller('SearchResultController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: state,
          $$timeout: $timeout,
          searchService: searchService,
          $location: location,
          searchUrlService: searchUrlService
        })


      })
    })

    it('should exsist', ()=> {
      expect(!!SearchResultController).toBe(true)
    })

    it('should loade more on click', ()=> {
      SearchResultController.searchResults = {
        count: 10,
        results:  [
          {},
          {}
        ]
      }
      SearchResultController.loadMoreOnClick()
      expect(SearchResultController.isLoadMoreLoading).toBe(true)
      expect(SearchResultController.isLoadMoreError).toBe(false)
    })

    it('should loade more on scroll', ()=> {
      SearchResultController.searchResults = {
        count: 10,
        results:  [
          {},
          {}
        ]
      }
      SearchResultController.loadMoreOnScroll()
      expect(SearchResultController.isLoadMoreLoading).toBe(true)
      expect(SearchResultController.isLoadMoreError).toBe(false)
    })
  })
})
}
