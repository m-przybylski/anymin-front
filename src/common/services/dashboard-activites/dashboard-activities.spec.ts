import * as angular from 'angular'
import {DashboardActivitiesService} from './dashboard-activities.service'
import {ViewsApiMock} from 'profitelo-api-ng/api/api'
import dashboardActivitiesModule from './dashboard-activites'

describe('Unit testing: profitelo.services.expertActivitiesService >', () => {
  describe('for profitelo.services.expertActivitiesService >', () => {

    let dashboardActivitiesService: DashboardActivitiesService
    let rootScope: ng.IRootScopeService
    let ViewsApiMock: ViewsApiMock
    let httpBackend: ng.IHttpBackendService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesome')
    }))

    beforeEach(() => {
      angular.mock.module(dashboardActivitiesModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('ViewsApi', ViewsApiMock)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService,
                       $httpBackend: ng.IHttpBackendService) => {
      dashboardActivitiesService = $injector.get<DashboardActivitiesService>('dashboardActivitiesService')
      rootScope = $rootScope
      httpBackend = $httpBackend
      ViewsApiMock = $injector.get<ViewsApiMock>('ViewsApiMock')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
