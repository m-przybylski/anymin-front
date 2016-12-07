describe('Unit testing: profitelo.services.resolvers.app-company-profile-resolver', () => {
  describe('for AppCompanyProfileResolver service >', () => {

    let AppCompanyProfileResolver
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

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

      stateParams = {
        contactId: '1234567654321',
        primaryConsultationId: primaryConsultationId
      }

      mockResponse = {
        profile: {
          organizationDetails: {

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

      module('profitelo.swaggerResources.definitions')
      module('profitelo.services.resolvers.app-company-profile-resolver', function($provide) {
        $provide.value('$state',  mockState)
      })

      inject(($injector) => {
        AppCompanyProfileResolver = $injector.get('AppCompanyProfileResolver')
        _timeout = $injector.get('$timeout')
        ViewsApiDef = $injector.get('ViewsApiDef')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')

      })

      resourcesExpectations = {
        ProfileApiDef: {
          getOrganizationProfile: $httpBackend.when(ViewsApiDef.getOrganizationProfile.method,
            ViewsApiDef.getOrganizationProfile.url.replace(':profileId', stateParams.contactId))
        }
      }
    })

    it('should have resolve function', () => {
      expect(AppCompanyProfileResolver.resolve).toBeDefined()
    })

    it('should _handle company response error', () => {

      resourcesExpectations.ProfileApiDef.getOrganizationProfile.respond(500)

      const resolver = AppCompanyProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.status).toEqual(500)
    })

    it('should return sorted services ', () => {
      resourcesExpectations.ProfileApiDef.getOrganizationProfile.respond(200, mockResponse)

      const resolver = AppCompanyProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.services[0].id).toEqual(mockResponse.services[1].id)
    })

  })
})