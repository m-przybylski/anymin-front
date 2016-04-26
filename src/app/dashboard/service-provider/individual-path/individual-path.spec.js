describe('Unit tests: IndividualPathController >', () => {
  describe('Testing Controller: IndividualPathController', () => {

    let IndividualPathController
    let _serviceProviderStateService

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.individual-path')
      inject(($rootScope, $controller, _serviceProviderStateService_) => {
        IndividualPathController = $controller('IndividualPathController', {
          serviceProviderStateService: _serviceProviderStateService_
        })
        
        _serviceProviderStateService = _serviceProviderStateService_
        
      })
    })

    it('should exists', () => {
      return expect(!!IndividualPathController).toBe(true)
    })

  })
})
