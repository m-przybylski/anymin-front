describe('Unit testing: profitelo.services.communicator >', () => {
  describe('for profitelo.services.communicator >', () => {

    let communicatorService
    const session = {
      chat: {
        onError: _ => _,
        onConnect: _ => _,
        onStatusChange: _ => _,
        onCall: _ => _,
        onRoom: _ => _,
        connect: _ => _
      }
    }
    const config = {}
    const services = [
      {
        serviceId: '1'
      },
      {
        serviceId: '2'
      }
    ]

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      module('profitelo.services.communicator')
    })

    beforeEach(inject(($injector) => {
      communicatorService = $injector.get('communicatorService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should authenticate', inject(($q, $rootScope, RatelApi, ServiceApi, ratelSdk) => {

      RatelApi.getRatelAuthConfig = () => { return {$promise: $q.resolve(config)} }
      ServiceApi.getProfileServices = () => { return {$promise: $q.resolve(services)} }
      ratelSdk.withSignedAuth = () => $q.resolve(session)

      spyOn(RatelApi, 'getRatelAuthConfig').and.callThrough()
      spyOn(ServiceApi, 'getProfileServices').and.callThrough()
      spyOn(ratelSdk, 'withSignedAuth').and.callThrough()

      communicatorService.authenticate()
      $rootScope.$digest()

      expect(RatelApi.getRatelAuthConfig).toHaveBeenCalled()
      expect(ServiceApi.getProfileServices).toHaveBeenCalled()
      expect(ratelSdk.withSignedAuth).toHaveBeenCalled()

      expect(communicatorService.getClientSession()).toEqual(session)
    }))
  })
})
