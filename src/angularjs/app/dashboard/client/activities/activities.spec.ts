import * as angular from 'angular';

import { DashboardClientActivitiesController } from './activities';
import { DashboardClientActivitiesService } from '../../../../common/services/dashboard-client-activites/dashboard-client-activities.service';
import { PromiseService } from '../../../../common/services/promise/promise.service';
import { GetClientActivity } from 'profitelo-api-ng/model/models';
import { IRootScopeService } from '../../../../common/services/root-scope/root-scope.service';
import { StateService, TransitionPromise } from '@uirouter/angularjs';
import loggerMockModule from '../../../../common/services/logger/logger.mock';

describe('Unit tests: DashboardClientActivitiesController >', () => {
  describe('Testing Controller: DashboardClientActivitiesController', () => {
    let dashboardClientActivitiesController: DashboardClientActivitiesController;

    const clientActivitiesService: DashboardClientActivitiesService = {} as DashboardClientActivitiesService;
    let $state: StateService;

    beforeEach(
      angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL');
      }),
    );

    beforeEach(() => {
      angular.mock.module(loggerMockModule);
      angular.mock.module('profitelo.controller.dashboard.client.activities');

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {
        $state = <StateService>{
          go: (_to: string): TransitionPromise => <any>Promise.resolve({}),
        };

        dashboardClientActivitiesController = $controller<DashboardClientActivitiesController>(
          'dashboardClientActivitiesController',
          {
            $state: $state,
            $scope: $rootScope.$new(),
            topAlertService: {},
            clientActivitiesService: clientActivitiesService,
            filtersData: {},
            errorHandler: {},
          },
        );
      });
    });

    it('should exists', () => {
      expect(!!DashboardClientActivitiesController).toBe(true);
    });

    it('should redirect to app.search-result', () => {
      spyOn($state, 'go');
      dashboardClientActivitiesController.searchForExpert();
      expect($state.go).toHaveBeenCalledWith('app.search-result');
    });

    it('should load more activities', inject((
      promiseService: PromiseService,
      dashboardClientActivitiesService: DashboardClientActivitiesService,
    ) => {
      dashboardClientActivitiesController.activities = [
        {
          id: 'sdsdf',
          accountId: 'id',
          activityType: GetClientActivity.ActivityTypeEnum.SERVICEUSAGEEVENT,
          initializedAt: new Date(),
        },
      ];
      spyOn(promiseService, 'setMinimalDelay').and.callThrough();
      spyOn(dashboardClientActivitiesService, 'getDashboardClientActivities').and.returnValue({
        activities: [
          {
            accountId: 'id',
            activityType: GetClientActivity.ActivityTypeEnum.SERVICEUSAGEEVENT,
            initializedAt: new Date(),
          },
        ],
        count: 1,
      });
      dashboardClientActivitiesController.loadMoreActivities();
      expect(promiseService.setMinimalDelay).toHaveBeenCalled();
      expect(dashboardClientActivitiesService.getDashboardClientActivities).toHaveBeenCalled();
    }));
  });
});
