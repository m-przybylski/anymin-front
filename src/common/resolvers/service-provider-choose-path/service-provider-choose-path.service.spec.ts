namespace profitelo.resolvers.serviceProviderChoosePath {

  import IProfileApiMock = profitelo.api.IProfileApiMock
  import ISessionApiMock = profitelo.api.ISessionApiMock

  describe('Unit testing: profitelo.resolvers.service-provider-choose-path', () => {
    describe('for ServiceProviderChoosePathResolver service >', () => {

      let url = 'awesomeURL'
      let mockState: any
      let AppServiceProviderChoosePathResolver: IServiceProviderChoosePathService
      let _ProfileApiMock: IProfileApiMock
      let _SessionApiMock: ISessionApiMock
      let $httpBackend: ng.IHttpBackendService
      let _timeout: ng.ITimeoutService
      const userService = {
        getUser: () => {}
      }
      const user = {
        id: '123'
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.user')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', url)
        $provide.value('userService', userService)
      }))

      beforeEach(() => {

        mockState = {
          go: () => {
          }
        }

        angular.mock.module('profitelo.resolvers.service-provider-choose-path', ($provide: ng.auto.IProvideService) => {
          $provide.value('$state', mockState)
        })

        inject(($injector: ng.auto.IInjectorService, $q: ng.IQService) => {

          spyOn(userService, 'getUser').and.callFake(() => $q.resolve(user))
          AppServiceProviderChoosePathResolver =
            $injector.get<IServiceProviderChoosePathService>('ServiceProviderChoosePathResolver')
          _ProfileApiMock = $injector.get<IProfileApiMock>('ProfileApiMock')
          _SessionApiMock = $injector.get<ISessionApiMock>('SessionApiMock')
          _timeout = $injector.get('$timeout')
          $httpBackend = $injector.get('$httpBackend')
        })
      })

      it('should have resolve function', () => {
        expect(AppServiceProviderChoosePathResolver.resolve).toBeDefined()
      })

      it('should redirect to app.dashboard.client.activities', () => {
        spyOn(mockState, 'go')

        $httpBackend.when('GET', 'http://api.webpage.com/session').respond(200, {
          apiKey: '1234',
          accountId: ':profileId'
        })

        //FIXME
        _ProfileApiMock.getProfileRoute(200, user.id, <any>{})

        AppServiceProviderChoosePathResolver.resolve()
        $httpBackend.flush()
        expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')
      })

      it('should redirect to app.dashboard.service-provider.company-path', () => {
        spyOn(mockState, 'go')

        $httpBackend.when('GET', 'http://api.webpage.com/session').respond(200, {
          apiKey: '1234',
          accountId: ':profileId'
        })

        //FIXME
        _ProfileApiMock.getProfileRoute(200, user.id, <any>{
          expertDetails: null,
          organizataionDetails: {}
        })

        AppServiceProviderChoosePathResolver.resolve()
        $httpBackend.flush()
        expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')
      })

      it('should redirect to app.dashboard.service-provider.individual-path', () => {
        spyOn(mockState, 'go')

        $httpBackend.when('GET', 'http://api.webpage.com/session').respond(200, {
          apiKey: '1234',
          accountId: ':profileId'
        })

        //FIXME
        _ProfileApiMock.getProfileRoute(200, user.id, <any>{
          expertDetails: {},
          organizataionDetails: null
        })

        AppServiceProviderChoosePathResolver.resolve()
        $httpBackend.flush()
        expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')
      })

      it('should not get profile', () => {
        let spy = {
          spy: () => {
          }
        }

        spyOn(spy, 'spy')

        _SessionApiMock.checkRoute(200, <any>{
          apiKey: '1234'
        })

        //FIXME
        _ProfileApiMock.getProfileRoute(300, user.id)

        AppServiceProviderChoosePathResolver.resolve().then((res) => {
          expect(res).toBe(null)
          spy.spy()
        }, () => {
        })

        $httpBackend.flush()
        expect(spy.spy).toHaveBeenCalled()
      })
    })
  })
}
