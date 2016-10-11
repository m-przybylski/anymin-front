describe('Unit tests: search-result>', () => {
  describe('Testing Controller: SearchResultController', () => {

    var $scope
    var SearchResultController

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', '')
    }))

    beforeEach(() => {
      module('profitelo.controller.search-result')
      module('profitelo.services.search')
      module('profitelo.services.search-url')
      inject(($rootScope, $controller, $state, $location, $timeout, _searchService_, _searchUrlService_) => {
        $scope = $rootScope.$new()

        SearchResultController = $controller('SearchResultController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          $timeout: $timeout,
          searchService: _searchService_,
          $location: $location,
          searchUrlService: _searchUrlService_
        })
      })
    })

    it('should exsist', ()=> {
      expect(!!SearchResultController).toBe(true)
    })

  })
})