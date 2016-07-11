describe('Unit tests: search-result>', () => {
  describe('Testing Controller: SearchResultController', () => {

    var $scope
    var SearchResultController

    beforeEach(() => {
      module('profitelo.controller.search-result')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        SearchResultController = $controller('SearchResultController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        })
      })
    })

    it('should exsist', ()=> {
      expect(!!SearchResultController).toBe(true)
    })

  })
})