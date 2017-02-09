namespace profitelo.app.dashboard.settings {
  describe('Unit tests: settingsController >', () => {
    describe('Testing Controller: settingsController', () => {

      let settingsController: SettingsController

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings')
        angular.mock.module('ui.router')
        inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          settingsController = $controller<SettingsController>('settingsController', {
            $state: _$state_,
            $scope: $rootScope.$new()
          })
        })
      })

      it('should exists', () => {
        expect(!!settingsController).toBe(true)
      })
    })
  })
}
