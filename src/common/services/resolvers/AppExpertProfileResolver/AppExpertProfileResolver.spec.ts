describe('Unit testing: profitelo.services.resolvers.app-expert-profile-resolver', () => {
  describe('for AppExpertProfileResolver service >', () => {

    let AppExpertProfileResolver
    let url = 'awesomeURL'
    let _timeout
    let mockState
    let resourcesExpectations
    let ViewsApiDef
    let $httpBackend
    let stateParams
    let mockResponse
    let log

    const primaryConsultationId = '111'

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

      stateParams = {
        profileId: '1234567654321',
        primaryConsultationId: primaryConsultationId
      }

      mockResponse = {
        profile: {
          expertDetails: {

          }
        },
        services: [{
          service: {
            id: '232'
          },
          tags: ['halina', 'pranie']
        }, {
          service: {
            id: primaryConsultationId
          },
          tags: ['halina', 'pranie']
        }]
      }

    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.services.resolvers.app-expert-profile-resolver', function($provide) {
        $provide.value('$state',  mockState)
      })

      inject(($injector) => {
        AppExpertProfileResolver = $injector.get('AppExpertProfileResolver')
        _timeout = $injector.get('$timeout')
        ViewsApiDef = $injector.get('ViewsApiDef')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')
      })

      resourcesExpectations = {
        ViewsApiDef: {
          getExpertProfile: $httpBackend.when(ViewsApiDef.getExpertProfile.method,
            ViewsApiDef.getExpertProfile.url.replace(':profileId', stateParams.profileId))
        }
      }
    })

    it('should have resolve function', () => {
      expect(AppExpertProfileResolver.resolve).toBeDefined()
    })

    it('should _handle experts response error', () => {
      resourcesExpectations.ViewsApiDef.getExpertProfile.respond(500)

      const resolver = AppExpertProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.status).toEqual(500)
    })
    
    it('should return sorted services ', () => {
      resourcesExpectations.ViewsApiDef.getExpertProfile.respond(200, mockResponse)
    
      const resolver = AppExpertProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.services[0].id).toEqual(mockResponse.services[1].id)
    })

  })
})