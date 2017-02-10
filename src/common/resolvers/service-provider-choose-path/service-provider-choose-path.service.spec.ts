namespace profitelo.resolvers.serviceProviderChoosePath {
describe('Unit testing: profitelo.resolvers.service-provider-choose-path', () => {
  describe('for ServiceProviderChoosePathResolver service >', () => {

    let url = 'awesomeURL'
    let mockState: any
    let AppServiceProviderChoosePathResolver: IServiceProviderChoosePathService
    let _ProfileApiDef: any
    let $httpBackend: ng.IHttpBackendService
    let resourcesExpectations: any
    let _timeout: ng.ITimeoutService

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

    angular.mock.module('profitelo.swaggerResources.definitions')

    angular.mock.module('profitelo.resolvers.service-provider-choose-path', function($provide: ng.auto.IProvideService) {
        $provide.value('$state', mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppServiceProviderChoosePathResolver =
          $injector.get<IServiceProviderChoosePathService>('ServiceProviderChoosePathResolver')
        _ProfileApiDef = $injector.get('ProfileApiDef')
        _timeout = $injector.get('$timeout')
        $httpBackend = $injector.get('$httpBackend')
      })

      resourcesExpectations = {
        ProfileApi: {
          getProfile: $httpBackend.when(_ProfileApiDef.getProfile.method, _ProfileApiDef.getProfile.url)
        },
        User: {
          getStatus: $httpBackend.when('GET', 'http://api.webpage.com/session')
        }
      }
    })

    it('should have resolve function', () => {
      expect(AppServiceProviderChoosePathResolver.resolve).toBeDefined()
    })

    it('should redirect to app.dashboard.client.activities', () => {
      spyOn(mockState, 'go')
      resourcesExpectations.User.getStatus.respond(200, {
        apiKey: '1234',
        id: ':profileId'
      })
      resourcesExpectations.ProfileApi.getProfile.respond(200, {})

      AppServiceProviderChoosePathResolver.resolve()
      $httpBackend.flush()
      expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')
    })

    it('should redirect to app.dashboard.service-provider.company-path', () => {
      spyOn(mockState, 'go')
      resourcesExpectations.User.getStatus.respond(200, {
        apiKey: '1234',
        id: ':profileId'
      })
      resourcesExpectations.ProfileApi.getProfile.respond(200, {
        expertDetails: null,
        organizataionDetails: {}
      })

      AppServiceProviderChoosePathResolver.resolve()
      $httpBackend.flush()
      expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')
    })

    it('should redirect to app.dashboard.service-provider.individual-path', () => {
      spyOn(mockState, 'go')
      resourcesExpectations.User.getStatus.respond(200, {
        apiKey: '1234',
        id: ':profileId'
      })
      resourcesExpectations.ProfileApi.getProfile.respond(200, {
        expertDetails: {},
        organizataionDetails: null
      })

      AppServiceProviderChoosePathResolver.resolve()
      $httpBackend.flush()
      expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')
    })

    it('should not get profile', () => {
      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')
      resourcesExpectations.User.getStatus.respond(200, {
        apiKey: '1234',
        id: ':profileId'
      })
      resourcesExpectations.ProfileApi.getProfile.respond(300, {})

      AppServiceProviderChoosePathResolver.resolve().then((res)=> {
        expect(res).toBe(null)
        spy.spy()
      }, ()=> {
      })

      $httpBackend.flush()
      expect(spy.spy).toHaveBeenCalled()
    })
/*
    it('should redirect on error', () => {
      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')
      resourcesExpectations.User.getStatus.respond(500)

      service-provider-choose-path.resolve().then((res)=> {
      }, ()=> {
        spy.spy()
      })

      $httpBackend.flush()
      expect(spy.spy).toHaveBeenCalled()
    })
*/
  })
})}
