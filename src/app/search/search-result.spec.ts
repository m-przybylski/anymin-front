describe('Unit tests: search-result>', () => {
  describe('Testing Controller: SearchResultController', () => {

    let $scope
    let SearchResultController
    let location
    let searchUrlService
    let state

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', '')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.search-result')
    angular.mock.module('profitelo.services.search')
      
      inject(($rootScope, $controller, $state, $location, $timeout, searchService) => {
        $scope = $rootScope.$new()
        location = {
          search: () => {
            return {}
          }
        }

        state = {
          current: {
            name: 'app.search-result'
          },
          go: () => {
            return null
          }
        }

        searchService = {
          onSearchResults: (_$scope, cb) => {
            cb()
          },

          setSearchQueryParams: (params) => {
            
          },
          
          onQueryParamsChange: (scope, cb) => {
            cb(angular.extend(location.search(), {q: 'prawo'}))
          }
        }

        searchUrlService = {
          parseParamsForUrl: () => {
            
          }
        }

        SearchResultController = $controller('SearchResultController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: state,
          $timeout: $timeout,
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