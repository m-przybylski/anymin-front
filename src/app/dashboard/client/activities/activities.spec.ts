import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {DashboardClientActivitiesController} from './activities'
import {DashboardActivitiesService} from '../../../../common/services/dashboard-activites/dashboard-activities.service'

describe('Unit tests: DashboardClientActivitiesController >', () => {
  describe('Testing Controller: DashboardClientActivitiesController', () => {

    let dashboardClientActivitiesController: DashboardClientActivitiesController

    const clientActivitiesService: DashboardActivitiesService = {
    } as DashboardActivitiesService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))


    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.client.activities')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        dashboardClientActivitiesController =
          $controller<DashboardClientActivitiesController>('dashboardClientActivitiesController', {
            $state: _$state_,
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

  })
})
