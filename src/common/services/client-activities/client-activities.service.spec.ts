import * as angular from 'angular'
import {ClientActivitiesService} from './client-activities.service'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ViewsApi} from 'profitelo-api-ng/api/api'

describe('Unit testing: profitelo.services.client-activities-service >', () => {
  describe('for profitelo.services.client-activities-service >', () => {

    let clientActivitiesService: ClientActivitiesService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('commonConfig')
      angular.mock.module('profitelo.services.client-activities-service')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      clientActivitiesService = $injector.get<ClientActivitiesService>('clientActivitiesService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should authenticate', inject(($q: ng.IQService, $rootScope: IRootScopeService, ViewsApi: ViewsApi) => {

      ViewsApi.getDashboardClientActivitiesRoute = () => {
        return $q.resolve({})
      }

      spyOn(ViewsApi, 'getDashboardClientActivitiesRoute').and.callThrough()
      clientActivitiesService.resolve()
      $rootScope.$digest()
      expect(ViewsApi.getDashboardClientActivitiesRoute).toHaveBeenCalled()
    }))

    it('setClientActivitiesParam', () => {
      const filterObject = {
        offset: 0,
        limit: 11
      }

      clientActivitiesService.setClientActivitiesParam(filterObject)
    })

    it('should clearQueryParam', () => {
      let queryParams = {
        fieldName: 'undefined'
      }

      spyOn(queryParams, 'fieldName')

      clientActivitiesService.clearQueryParam()

      expect(clientActivitiesService.clearQueryParam).toBeDefined()
    })

    it('should getMoreResults', () => {
      clientActivitiesService.getMoreResults(1)
    })
  })
})
