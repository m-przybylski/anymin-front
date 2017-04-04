import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {DashboardExpertActivitiesController} from './activities.controller'
import dashboardExpertActivitiesModule from './activities'



describe('Unit tests: DashboardExpertActivitiesController >', () => {
  describe('Testing Controller: DashboardExpertActivitiesController', () => {

    let DashboardExpertActivitiesController: DashboardExpertActivitiesController

    const expertActivities = {
      activities: []
    }

    beforeEach(() => {
      angular.mock.module(dashboardExpertActivitiesModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        DashboardExpertActivitiesController =
          $controller<DashboardExpertActivitiesController>('DashboardExpertActivitiesController', {
            $state: _$state_,
            $scope: $rootScope.$new(),
            expertActivities: expertActivities,
          })
      })
    })

    it('should exists', () => {
      expect(!!DashboardExpertActivitiesController).toBe(true)
    })

  })
})
