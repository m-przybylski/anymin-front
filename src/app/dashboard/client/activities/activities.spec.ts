namespace app.dashboard.client.activities {
  import IClientActivitiesService = profitelo.services.clientActivities.IClientActivitiesService
  import IClientActivities = profitelo.services.clientActivities.IClientActivities
  describe('Unit tests: DashboardClientActivitiesController >', () => {
    describe('Testing Controller: DashboardClientActivitiesController', () => {

      let DashboardClientActivitiesController: DashboardClientActivitiesController

      const clientActivities = {
        activities: [],
        balance: {},
        expertServiceTuples: [],
        activityTypes: []
      }

      const clientActivitiesService: IClientActivitiesService = {
        onQueryParamsChange: () => {
        },
        onActivitiesResults: () => {
        },
        clearQueryParam: () => {
        },
        getMoreResults: (_offset: number) => {
          return <ng.IPromise<any>>{}
        },
        setClientActivitiesParam: (_params: any) => {
          return <ng.IPromise<any>>{}
        },
        resolve: () => {
          return <ng.IPromise<IClientActivities>>{}
        }
      }

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.client.activities')

        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          DashboardClientActivitiesController =
            $controller<DashboardClientActivitiesController>('DashboardClientActivitiesController', {
              $state: _$state_,
              $scope: $rootScope.$new(),
              clientActivities: clientActivities,
              clientActivitiesService: clientActivitiesService
            })
        })
      })

      it('should exists', () => {
        expect(!!DashboardClientActivitiesController).toBe(true)
      })

    })
  })
}
