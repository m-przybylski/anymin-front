describe('Unit tests: DashboardStartController >', () => {
  describe('Testing Controller: DashboardStartController', () => {

    var $scope
    var DashboardStartController

    beforeEach(() => {
      module('profitelo.controller.dashboard.start')
      inject(($rootScope, $controller, _$state_, _User_) => {
        $scope = $rootScope.$new()
        DashboardStartController = $controller('DashboardStartController', {
          $state: _$state_,
          User: _User_
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardStartController).toBe(true)
    })

  })
})
