describe('Unit tests: DashboardSettingsSecurityController >', () => {
  describe('Testing Controller: DashboardSettingsSecurityController', () => {

    let DashboardSettingsSecurityController

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.settings.security')

      inject(($rootScope, $controller, _$state_) => {
        DashboardSettingsSecurityController = $controller('DashboardSettingsSecurityController', {
          $state: _$state_,
          $scope: $rootScope.$new()
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardSettingsSecurityController).toBe(true)
    })

  })
})
