namespace app.dashboard.settings.security {
  describe('Unit tests: DashboardSettingsSecurityController >', () => {
    describe('Testing Controller: DashboardSettingsSecurityController', () => {

      let DashboardSettingsSecurityController

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings.security')

        inject(($controller: ng.IControllerService) => {
          DashboardSettingsSecurityController = $controller<DashboardSettingsSecurityController>('dashboardSettingsSecurityController', {})
        })
      })

      it('should exists', () => {
        expect(!!DashboardSettingsSecurityController).toBe(true)
      })

    })
  })
}
