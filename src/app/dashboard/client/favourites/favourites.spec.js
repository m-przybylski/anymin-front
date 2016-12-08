describe('Unit tests: DashboardClientFavouritesController >', () => {
  describe('Testing Controller: DashboardClientFavouritesController', () => {

    var $scope
    var DashboardClientFavouritesController

    beforeEach(() => {
      module('profitelo.controller.dashboard.client.favourites')
      inject(($rootScope, $controller, _$state_) => {
        $scope = $rootScope.$new()
        DashboardClientFavouritesController = $controller('DashboardClientFavouritesController', {
          $state: _$state_
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientFavouritesController).toBe(true)
    })

  })
})
