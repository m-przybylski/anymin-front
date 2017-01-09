describe('Unit tests: ServiceProviderController >', () => {
  describe('Testing Controller: ServiceProviderController', () => {

    var ServiceProviderController

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.service-provider')
      inject(($rootScope, $controller) => {
        ServiceProviderController = $controller('ServiceProviderController', {
        })
      })
    })

    it('should exists', () => {
      return expect(!!ServiceProviderController).toBe(true)
    })

  })
})
