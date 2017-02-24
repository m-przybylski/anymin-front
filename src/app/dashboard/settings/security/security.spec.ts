namespace profitelo.dashboard.settings.security {
  describe('Unit tests: dashboardSettingsSecurityController >', () => {
    describe('Testing Controller: dashboardSettingsSecurityController', () => {

      let dashboardSettingsSecurityController: DashboardSettingsSecurityController

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings.security')
        angular.mock.module('ui.router')
        inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          dashboardSettingsSecurityController = $controller<DashboardSettingsSecurityController>('dashboardSettingsSecurityController', {
            $state: _$state_,
            $scope: $rootScope.$new(),
            User: {
              getData: () => ({
                account: {

                }
              })
            }
          })
        })
      })

      it('should exists', () => {
        expect(!!dashboardSettingsSecurityController).toBe(true)
      })
    })
  })
}
