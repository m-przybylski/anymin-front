namespace profitelo.dashboard.settings.payouts {
  describe('Unit tests: dashboardSettingsPayoutsController >', () => {
    describe('Testing Controller: dashboardSettingsPayoutsController', () => {

      let dashboardSettingsPayoutsController: DashboardSettingsPayoutsController

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings.payouts')
        angular.mock.module('ui.router')
        inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          dashboardSettingsPayoutsController = $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
            $state: _$state_,
            $scope: $rootScope.$new()
          })
        })
      })

      it('should exists', () => {
        expect(!!dashboardSettingsPayoutsController).toBe(true)
      })
    })
  })
}
