describe('Unit tests: Dashboard >', () => {
  describe('Testing Controller: DashboardController', () => {

    var $scope
    var DashboardController

    beforeEach(() => {
      module('profitelo.controller.dashboard')
      inject(($rootScope, $controller) => {
        $scope = $rootScope.$new()
        DashboardController = $controller('DashboardController', {
        })
      })
    })

    it('should exists', () => {
      return expect(!!DashboardController).toBe(true)
    })

  })
})
