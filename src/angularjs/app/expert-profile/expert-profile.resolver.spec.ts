import * as angular from 'angular'
import {IExpertProfileStateParams, default as expertProfilePageModule} from './expert-profile'
import {ExpertProfileResolver} from './expert-profile.resolver'
import {ViewsApiMock} from 'profitelo-api-ng/api/api'
import {GetExpertProfile} from 'profitelo-api-ng/model/models'

describe('Unit testing: profitelo.resolvers.expert-profile', () => {
  describe('for ExpertProfileResolver service >', () => {

    let AppExpertProfileResolver: ExpertProfileResolver
    const url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    let ViewsApiMock: ViewsApiMock
    let $httpBackend: ng.IHttpBackendService
    let stateParams: IExpertProfileStateParams

    const primaryConsultationId = '111'

    const mockResponse = {
      profile: {
        id: '123',
        isActive: false,
        expertDetails: {
          name: 'name',
          files: [],
          links: [],
          languages: []
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

    const mockState = {
      go: (): void => {
      }
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      stateParams = {
        profileId: '1234567654321',
        primaryConsultationId: primaryConsultationId
      }

      angular.mock.module(expertProfilePageModule, function ($provide: ng.auto.IProvideService): void {
        $provide.value('$state', mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppExpertProfileResolver = $injector.get<ExpertProfileResolver>('ExpertProfileResolver')
        _timeout = $injector.get('$timeout')
        ViewsApiMock = $injector.get<ViewsApiMock>('ViewsApiMock')
        $httpBackend = $injector.get('$httpBackend')
      })
    })

    it('should have resolve function', () => {
      expect(AppExpertProfileResolver.resolve).toBeDefined()
    })

    it('should _handle experts response error', () => {
      ViewsApiMock.getWebExpertProfileRoute(500, stateParams.profileId)

      const resolver: any = AppExpertProfileResolver.resolve(stateParams)
      $httpBackend.flush()
      expect(resolver.$$state.value.status).toEqual(500)
    })

    it('should return sorted services ', inject(($rootScope: ng.IRootScopeService) => {
      // FIXME type
      ViewsApiMock.getWebExpertProfileRoute(200, stateParams.profileId, <any>mockResponse)

      let profile: GetExpertProfile | null = null

      AppExpertProfileResolver.resolve(stateParams).then((res) => {
        profile = res
      })

      $httpBackend.flush()
      $rootScope.$apply()
      expect(profile).not.toBe(null)
      expect(profile!.services[0].service.id).toEqual(mockResponse.services[1].service.id)
    }))

  })
})
