describe('Unit tests: clientController >', () => {
  describe('Testing Controller: clientController', () => {

    let clientController

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.client')
      angular.mock.module('ui.router')
      inject(($rootScope, $controller, _$state_) => {
        clientController = $controller('clientController', {
          $state: _$state_,
          $scope: $rootScope.$new()
        })
      })
    })

    it('should exists', () => {
      expect(!!clientController).toBe(true)
    })
  })
})
