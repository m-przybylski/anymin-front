describe('Unit tests: settingsController >', () => {
  describe('Testing Controller: settingsController', () => {

    let settingsController

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.settings')
      angular.mock.module('ui.router')
      inject(($rootScope, $controller, _$state_) => {
        settingsController = $controller('settingsController', {
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
