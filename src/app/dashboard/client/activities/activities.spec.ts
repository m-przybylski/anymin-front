describe('Unit tests: DashboardClientActivitiesController >', () => {
  describe('Testing Controller: DashboardClientActivitiesController', () => {

    let DashboardClientActivitiesController

    const clientActivities = {
      activities: [],
      balance: {},
      expertServiceTuples: [],
      activityTypes: []
    }

    const clientActivitiesService = {
      onQueryParamsChange: _ => _,
      onActivitiesResults: _ => _,
      clearQueryParam: _ => _
    }

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.client.activities')

      inject(($rootScope, $controller, _$state_) => {
        DashboardClientActivitiesController = $controller('DashboardClientActivitiesController', {
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
