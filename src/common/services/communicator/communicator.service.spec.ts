namespace profitelo.services.communicator {
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.services.communicator >', () => {
  describe('for profitelo.services.communicator >', () => {

    let communicatorService: ICommunicatorService
    const session = {
      chat: {
        onError: () => {},
        onConnect: () => {},
        onStatusUpdate: () => {},
        onDisconnect: () => {},
        onCall: () => {},
        onRoom: () => {},
        onBotUpdate: () => {},
        onHeartbeat: () => {},
        connect: () => {}
      }
    }
    const config = {}
    const profilesWithServices = [{
      services: [
        {
          id: '1'
        },
        {
          id: '2'
        }
      ]
    }]

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('commonConfig')
      angular.mock.module('profitelo.services.communicator')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      communicatorService = $injector.get<ICommunicatorService>('communicatorService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should authenticate', inject(($q: ng.IQService, $rootScope: IRootScopeService, RatelApi: any, ProfileApi: any,
                                      ratelSdk: any) => {

      RatelApi.getRatelAuthConfig = () => {
        return {
          $promise: $q.resolve({
            toJSON: () => config
          })
        }
      }

      ProfileApi.getEmployersProfilesWithServices = () => {
        return {$promise: $q.resolve(profilesWithServices)}
      }
      ratelSdk.withSignedAuth = () => $q.resolve(session)

      spyOn(RatelApi, 'getRatelAuthConfig').and.callThrough()
      spyOn(ProfileApi, 'getEmployersProfilesWithServices').and.callThrough()
      spyOn(ratelSdk, 'withSignedAuth').and.callThrough()

      communicatorService.authenticate()
      $rootScope.$digest()

      expect(RatelApi.getRatelAuthConfig).toHaveBeenCalled()
      expect(ProfileApi.getEmployersProfilesWithServices).toHaveBeenCalled()
      expect(ratelSdk.withSignedAuth).toHaveBeenCalled()

      expect(communicatorService.getClientSession()).toEqual(session)
    }))
  })
})
}
