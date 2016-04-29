describe('Unit tests: CompanyPathController >', () => {
  describe('Testing Controller: CompanyPathController', () => {

    var CompanyPathController
    let _serviceProviderStateService

    
    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.company-path')
      inject(($rootScope, $controller, _serviceProviderStateService_) => {
        CompanyPathController = $controller('CompanyPathController', {
          serviceProviderStateService: _serviceProviderStateService_
        })

        _serviceProviderStateService = _serviceProviderStateService_
      })
    })

    it('should exists', () => {
      return expect(!!CompanyPathController).toBe(true)
    })

  })
})
