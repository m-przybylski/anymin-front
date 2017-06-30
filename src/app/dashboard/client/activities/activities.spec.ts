import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {DashboardClientActivitiesController} from './activities'
import {DashboardActivitiesService} from '../../../../common/services/dashboard-activites/dashboard-activities.service'

describe('Unit tests: DashboardClientActivitiesController >', () => {
  describe('Testing Controller: DashboardClientActivitiesController', () => {

    let dashboardClientActivitiesController: DashboardClientActivitiesController

    const clientActivitiesService: DashboardActivitiesService = {
    } as DashboardActivitiesService
    let $state: ng.ui.IStateService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.client.activities')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
              $q: ng.IQService) => {

        $state = <ng.ui.IStateService>{
          go: (_to: string) => $q.resolve({})
        }

        dashboardClientActivitiesController =
          $controller<DashboardClientActivitiesController>('dashboardClientActivitiesController', {
            $state: $state,
            $scope: $rootScope.$new(),
            topAlertService: {

            },
            clientActivitiesService: clientActivitiesService,
            filtersData: {}
          })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientActivitiesController).toBe(true)
    })

    it('should redirect to app.search-result', () => {
      spyOn($state, 'go')
      dashboardClientActivitiesController.searchForExpert()
      expect($state.go).toHaveBeenCalledWith('app.search-result')
    })

  })
})
