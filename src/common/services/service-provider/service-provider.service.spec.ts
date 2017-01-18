describe('Unit testing: profitelo.services.service-provider-service >', function() {
  describe('for serviceProviderService service >', function() {

    let serviceProviderService

    beforeEach(function() {
    angular.mock.module('profitelo.services.service-provider')
    })


    beforeEach(inject(function($injector) {
      serviceProviderService = $injector.get('serviceProviderService')
    }))


    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

  })
})