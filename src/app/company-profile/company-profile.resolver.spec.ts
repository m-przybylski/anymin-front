import * as angular from 'angular'
import {ICompanyProfileStateParams, default as companyProfilePageModule} from './company-profile'
import {ViewsApiMock} from 'profitelo-api-ng/api/api'
import {CompanyProfileResolver} from './company-profile.resolver'

describe('Unit testing: profitelo.resolvers.company-profile', () => {
  describe('for company-profile service >', () => {

    let AppCompanyProfileResolver: CompanyProfileResolver
    let url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    let mockState: any
    let ViewsApiMock: ViewsApiMock
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

      angular.mock.module(companyProfilePageModule, function ($provide: ng.auto.IProvideService) {
        $provide.value('$state', mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppCompanyProfileResolver = $injector.get<CompanyProfileResolver>('CompanyProfileResolver')
        _timeout = $injector.get('$timeout')
        ViewsApiMock = $injector.get<ViewsApiMock>('ViewsApiMock')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')

      })
    })

    it('should have resolve function', () => {
      expect(AppCompanyProfileResolver.resolve).toBeDefined()
    })

    it('should _handle company response error', () => {
      ViewsApiMock.getWebOrganizationProfileRoute(500, stateParams.profileId)

      const resolver: any = AppCompanyProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.status).toEqual(500)
    })

    it('should return sorted services ', () => {
      ViewsApiMock.getWebOrganizationProfileRoute(200, stateParams.profileId, mockResponse)

      const resolver: any = AppCompanyProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.services[0].id).toEqual(mockResponse.services[1].id)
    })

  })
})
