describe('Unit tests: ServiceProviderController >', () => {
  describe('Testing Controller: ServiceProviderController', () => {

    var ServiceProviderController: any

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.service-provider')
      inject(($controller: ng.IControllerService) => {
        ServiceProviderController = $controller('ServiceProviderController', {
        })
      })
    })

    it('should exists', () => {
      return expect(!!ServiceProviderController).toBe(true)
    })

  })
})
