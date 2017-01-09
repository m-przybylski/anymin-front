describe('Unit testing: profitelo.services.service-provider-state >', function() {
  describe('for serviceProviderStateService service >', function() {

    let serviceProviderStateService

    beforeEach(function() {
    angular.mock.module('profitelo.services.service-provider-state')
    })


    beforeEach(inject(function($injector) {
      serviceProviderStateService = $injector.get('serviceProviderStateService')
    }))


    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

  })
})
