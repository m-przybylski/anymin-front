namespace profitelo.services.communicator {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IRatelApi = profitelo.api.IRatelApi
  import IProfileApi = profitelo.api.IProfileApi

  describe('Unit testing: profitelo.services.communicator >', () => {
    describe('for profitelo.services.communicator >', () => {

      let communicatorService: ICommunicatorService
      const session = {
        chat: {
          onError: () => {
          },
          onConnect: () => {
          },
          onStatusUpdate: () => {
          },
          onDisconnect: () => {
          },
          onCall: () => {
          },
          onRoom: () => {
          },
          onBotUpdate: () => {
          },
          onHeartbeat: () => {
          },
          connect: () => {
          }
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

      const userService = {
        getUser: () => {}
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.user')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL')
        $provide.value('userService', userService)
      }))

      beforeEach(() => {
        angular.mock.module('commonConfig')
        angular.mock.module('profitelo.services.communicator')
      })

      beforeEach(inject(($injector: ng.auto.IInjectorService, $q: ng.IQService) => {
        spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))
        communicatorService = $injector.get<ICommunicatorService>('communicatorService')
      }))

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })

      it('should authenticate', inject(($q: ng.IQService, $rootScope: IRootScopeService, RatelApi: IRatelApi,
                                        ProfileApi: IProfileApi, ratelSdk: any) => {

        RatelApi.getRatelAuthConfigRoute = (_x: string) => {
          return $q.resolve(config)
        }

        ProfileApi.getEmployersProfilesWithServicesRoute = () => {
          return $q.resolve(profilesWithServices)
        }
        ratelSdk.withSignedAuth = () => $q.resolve(session)

        spyOn(RatelApi, 'getRatelAuthConfigRoute').and.callThrough()
        spyOn(ProfileApi, 'getEmployersProfilesWithServicesRoute').and.callThrough()
        spyOn(ratelSdk, 'withSignedAuth').and.callThrough()

        communicatorService.authenticate()
        $rootScope.$digest()

        expect(RatelApi.getRatelAuthConfigRoute).toHaveBeenCalled()
        expect(ProfileApi.getEmployersProfilesWithServicesRoute).toHaveBeenCalled()
        expect(ratelSdk.withSignedAuth).toHaveBeenCalled()

        expect(communicatorService.getClientSession()).toEqual(session)
      }))
    })
  })
}
