describe('Unit tests: DashboardSettingsSecurityController >', () => {
  describe('Testing Controller: DashboardSettingsSecurityController', () => {

    let DashboardSettingsSecurityController

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
    angular.mock.module('profitelo.controller.dashboard.settings.security')

      inject(($rootScope, $controller, _$state_) => {
        DashboardSettingsSecurityController = $controller('DashboardSettingsSecurityController', {
          $state: _$state_,
          $scope: $rootScope.$new(),
          clientActivities: clientActivities,
          clientActivitiesService: clientActivitiesService
        })
      })
    })

    it('should exists', () => {
      expect(!!DashboardSettingsSecurityController).toBe(true)
    })

  })
})
