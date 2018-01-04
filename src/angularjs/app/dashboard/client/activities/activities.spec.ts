import * as angular from 'angular'

import {DashboardClientActivitiesController} from './activities'
import {DashboardActivitiesService} from '../../../../common/services/dashboard-activites/dashboard-activities.service'
import {PromiseService} from '../../../../common/services/promise/promise.service'
import {GetActivity} from 'profitelo-api-ng/model/models';
import {ErrorHandlerService} from '../../../../common/services/error-handler/error-handler.service'
import {IRootScopeService} from '../../../../common/services/root-scope/root-scope.service';

describe('Unit tests: DashboardClientActivitiesController >', () => {
  describe('Testing Controller: DashboardClientActivitiesController', () => {

    let dashboardClientActivitiesController: DashboardClientActivitiesController

    const clientActivitiesService: DashboardActivitiesService = {
    } as DashboardActivitiesService
    let $state: ng.ui.IStateService
    let errorHandler: ErrorHandlerService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.client.activities')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
              $q: ng.IQService) => {

        $state = <ng.ui.IStateService>{
          go: (_to: string): ng.IPromise<{}> => $q.resolve({})
        }

        dashboardClientActivitiesController =
          $controller<DashboardClientActivitiesController>('dashboardClientActivitiesController', {
            $state: $state,
            $scope: $rootScope.$new(),
            topAlertService: {

            },
            clientActivitiesService: clientActivitiesService,
            filtersData: {},
            errorHandler
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

    it('should load more activities',
      inject((promiseService: PromiseService, dashboardActivitiesService: DashboardActivitiesService) => {
      dashboardClientActivitiesController.activities = [{
          accountId: 'id',
          activityType: GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT,
          accountType: GetActivity.AccountTypeEnum.CLIENT,
          createdAt: new Date()
      }]
      spyOn(promiseService, 'setMinimalDelay').and.callThrough()
      spyOn(dashboardActivitiesService, 'getDashboardActivities').and.returnValue({
        activities: [{
          accountId: 'id',
          activityType: GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT,
          accountType: GetActivity.AccountTypeEnum.CLIENT,
          createdAt: new Date()
        }],
        count: 1
      })
      dashboardClientActivitiesController.loadMoreActivities()
      expect(promiseService.setMinimalDelay).toHaveBeenCalled()
      expect(dashboardActivitiesService.getDashboardActivities).toHaveBeenCalled()
    }))

  })
})
