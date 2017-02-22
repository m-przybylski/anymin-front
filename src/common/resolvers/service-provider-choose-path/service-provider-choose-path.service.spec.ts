namespace profitelo.resolvers.serviceProviderChoosePath {
  import IProfileApiMock = profitelo.api.IProfileApiMock

  describe('Unit testing: profitelo.resolvers.service-provider-choose-path', () => {
    describe('for ServiceProviderChoosePathResolver service >', () => {

      let url = 'awesomeURL'
      let mockState: any
      let AppServiceProviderChoosePathResolver: IServiceProviderChoosePathService
      let _ProfileApiMock: IProfileApiMock
      let $httpBackend: ng.IHttpBackendService
      let _timeout: ng.ITimeoutService

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {

        mockState = {
          go: () => {
          }
        }

        angular.mock.module('profitelo.resolvers.service-provider-choose-path', ($provide: ng.auto.IProvideService) => {
          $provide.value('$state', mockState)
        })

        inject(($injector: ng.auto.IInjectorService) => {
          AppServiceProviderChoosePathResolver =
            $injector.get<IServiceProviderChoosePathService>('ServiceProviderChoosePathResolver')
          _ProfileApiMock = $injector.get<IProfileApiMock>('ProfileApiMock')
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
          id: ':profileId'
        })

        //FIXME
        _ProfileApiMock.getProfileRoute(200, ':profileId', <any>{})

        AppServiceProviderChoosePathResolver.resolve()
        $httpBackend.flush()
        expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')
      })

      it('should redirect to app.dashboard.service-provider.company-path', () => {
        spyOn(mockState, 'go')

        $httpBackend.when('GET', 'http://api.webpage.com/session').respond(200, {
          apiKey: '1234',
          id: ':profileId'
        })

        //FIXME
        _ProfileApiMock.getProfileRoute(200, ':profileId', <any>{
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
          id: ':profileId'
        })

        //FIXME
        _ProfileApiMock.getProfileRoute(200, ':profileId', <any>{
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
        $httpBackend.when('GET', 'http://api.webpage.com/session').respond(200, {
          apiKey: '1234',
          id: ':profileId'
        })

        //FIXME
        _ProfileApiMock.getProfileRoute(300, ':profileId')

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
