namespace profitelo.resolvers.companyProfile {
import ICompanyProfileStateParams = profitelo.companyProfile.ICompanyProfileStateParams
  describe('Unit testing: profitelo.resolvers.company-profile', () => {
  describe('for company-profile service >', () => {

    let AppCompanyProfileResolver: ICompanyProfileService
    let url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    let mockState: any
    let resourcesExpectations: any
    let ViewsApiDef: any
    let $httpBackend: ng.IHttpBackendService
    let stateParams: ICompanyProfileStateParams
    let mockResponse: any
    let log

    const primaryConsultationId = '111'

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
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

    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.resolvers.company-profile', function($provide: ng.auto.IProvideService) {
        $provide.value('$state',  mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppCompanyProfileResolver = $injector.get<ICompanyProfileService>('CompanyProfileResolver')
        _timeout = $injector.get('$timeout')
        ViewsApiDef = $injector.get('ViewsApiDef')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')

      })

      resourcesExpectations = {
        ProfileApiDef: {
          getOrganizationProfile: $httpBackend.when(ViewsApiDef.getOrganizationProfile.method,
            ViewsApiDef.getOrganizationProfile.url.replace(':profileId', stateParams.profileId))
        }
      }
    })

    it('should have resolve function', () => {
      expect(AppCompanyProfileResolver.resolve).toBeDefined()
    })

    it('should _handle company response error', () => {

      resourcesExpectations.ProfileApiDef.getOrganizationProfile.respond(500)

      const resolver: any = AppCompanyProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.status).toEqual(500)
    })

    it('should return sorted services ', () => {
      resourcesExpectations.ProfileApiDef.getOrganizationProfile.respond(200, mockResponse)

      const resolver: any = AppCompanyProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.services[0].id).toEqual(mockResponse.services[1].id)
    })

  })
})}
