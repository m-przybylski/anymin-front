describe('Unit testing: profitelo.services.communicator >', () => {
  describe('for profitelo.services.communicator >', () => {

    let communicatorService
    const session = {
      chat: {
        onError: _ => _,
        onConnect: _ => _,
        onStatusUpdate: _ => _,
        onDisconnect: _ => _,
        onCall: _ => _,
        onRoom: _ => _,
        onBotUpdate: _ => _,
        onHeartbeat: _ => _,
        connect: _ => _
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

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('commonConfig')
      angular.mock.module('profitelo.services.communicator')
    })

    beforeEach(inject(($injector) => {
      communicatorService = $injector.get('communicatorService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should authenticate', inject(($q, $rootScope, RatelApi, ProfileApi, ratelSdk) => {

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
