namespace profitelo.services.serviceProvider {
describe('Unit testing: profitelo.services.service-provider-service >', function() {
  describe('for serviceProviderService service >', function() {

    let serviceProviderService: IServiceProviderService

    beforeEach(function() {
    angular.mock.module('profitelo.services.service-provider')
    })


    beforeEach(inject(function($injector: ng.auto.IInjectorService) {
      serviceProviderService = $injector.get<IServiceProviderService>('serviceProviderService')
    }))


    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

  })
})}
