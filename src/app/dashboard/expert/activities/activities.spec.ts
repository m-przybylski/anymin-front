import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {DashboardExpertActivitiesController} from './activities.controller'
import dashboardExpertActivitiesModule from './activities'

describe('Unit tests: dashboardExpertActivities >', () => {
  describe('Testing Controller: dashboardExpertActivities', () => {

    let DashboardExpertActivitiesController: DashboardExpertActivitiesController

    const expertActivities = {
      activities: []
    }

    beforeEach(() => {
      angular.mock.module(dashboardExpertActivitiesModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        DashboardExpertActivitiesController =
          $controller<DashboardExpertActivitiesController>('dashboardExpertActivities', {
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
