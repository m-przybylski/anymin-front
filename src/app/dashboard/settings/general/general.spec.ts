describe('Unit tests: DashboardSettingsGeneralController >', () => {
  describe('Testing Controller: DashboardClientActivitiesController', () => {

    let DashboardSettingsGeneralController

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.settings.general')

      inject(($rootScope, $controller, _$state_) => {
        DashboardSettingsGeneralController = $controller('DashboardSettingsGeneralController', {
          $state: _$state_,
          $scope: $rootScope.$new()
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardSettingsGeneralController).toBe(true)
    })

  })
})
