import * as angular from 'angular'
import { DashboardProfileActivitiesService } from './dashboard-profile-activities.service'
import { ViewsApiMock } from 'profitelo-api-ng/api/api'
import dashboardActivitiesModule from './dashboard-profile-activites'
import { PayoutsApiMock } from 'profitelo-api-ng/api/api'
import loggerMockModule from '../logger/logger.mock';

describe('Unit testing: profitelo.services.expertActivitiesService >', () => {
  describe('for profitelo.services.expertActivitiesService >', () => {

    let dashboardActivitiesService: DashboardProfileActivitiesService
    let rootScope: ng.IRootScopeService
    let ViewsApiMock: ViewsApiMock

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesome')
    }))

    beforeEach(() => {
      angular.mock.module(dashboardActivitiesModule)
      angular.mock.module(loggerMockModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('ViewsApi', ViewsApiMock)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService) => {
      dashboardActivitiesService = $injector.get<DashboardProfileActivitiesService>('dashboardProfileActivitiesService')
      rootScope = $rootScope
      ViewsApiMock = $injector.get<ViewsApiMock>('ViewsApiMock')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should call PayoutsApi Method get payouts methods', (done) => {
      inject((PayoutsApiMock: PayoutsApiMock, $httpBackend: ng.IHttpBackendService) => {
        const mockResponse = {payPalAccount: {email: 'profitelo@anymind.com'}}
        PayoutsApiMock.getPayoutMethodsRoute(200, mockResponse)
        dashboardActivitiesService.getPayoutMethods().then((response) => {
          expect(response).toEqual(mockResponse)
          done()
        })
        $httpBackend.flush()
      })
    })

  })
})
