namespace profitelo.resolvers.companyProfile {
  import ICompanyProfileStateParams = profitelo.companyProfile.ICompanyProfileStateParams
  import IViewsApiMock = profitelo.api.IViewsApiMock
  describe('Unit testing: profitelo.resolvers.company-profile', () => {
    describe('for company-profile service >', () => {

      let AppCompanyProfileResolver: ICompanyProfileService
      let url = 'awesomeURL'
      let _timeout: ng.ITimeoutService
      let mockState: any
      let ViewsApiMock: IViewsApiMock
      let $httpBackend: ng.IHttpBackendService
      let stateParams: ICompanyProfileStateParams
      let mockResponse: any
      let log

      const primaryConsultationId = '111'

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {

        mockState = {
          go: () => {
          }
        }

        stateParams = {
          profileId: '1234567654321',
          primaryConsultationId: primaryConsultationId
        }

        mockResponse = {
          profile: {
            organizationDetails: {}
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

        angular.mock.module('profitelo.resolvers.company-profile', function ($provide: ng.auto.IProvideService) {
          $provide.value('$state', mockState)
        })

        inject(($injector: ng.auto.IInjectorService) => {
          AppCompanyProfileResolver = $injector.get<ICompanyProfileService>('CompanyProfileResolver')
          _timeout = $injector.get('$timeout')
          ViewsApiMock = $injector.get<IViewsApiMock>('ViewsApiMock')
          $httpBackend = $injector.get('$httpBackend')
          log = $injector.get('$log')

        })
      })

      it('should have resolve function', () => {
        expect(AppCompanyProfileResolver.resolve).toBeDefined()
      })

      it('should _handle company response error', () => {
        ViewsApiMock.getOrganizationProfileRoute(500, stateParams.profileId)

        const resolver: any = AppCompanyProfileResolver.resolve(stateParams)
        $httpBackend.flush()
        expect(resolver.$$state.value.status).toEqual(500)
      })

      it('should return sorted services ', () => {
        ViewsApiMock.getOrganizationProfileRoute(200, stateParams.profileId, mockResponse)

        const resolver: any = AppCompanyProfileResolver.resolve(stateParams)
        $httpBackend.flush()
        expect(resolver.$$state.value.services[0].id).toEqual(mockResponse.services[1].id)
      })

    })
  })
}
