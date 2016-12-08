describe('Unit tests: DashboardClientActivitiesController >', () => {
  describe('Testing Controller: DashboardClientActivitiesController', () => {

    var $scope
    var DashboardClientActivitiesController

    beforeEach(() => {
      module('profitelo.controller.dashboard.client.activities')
      inject(($rootScope, $controller, _$state_, _User_) => {
        $scope = $rootScope.$new()
        DashboardClientActivitiesController = $controller('DashboardClientActivitiesController', {
          $state: _$state_,
          User: _User_
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientActivitiesController).toBe(true)
    })

  })
})
