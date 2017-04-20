import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {DashboardSettingsNotificationsController} from './notifications.controller'
import dashboardSettingsNotificationsModule from './notifications'

describe('Unit tests: dashboardSettingsNotifications >', () => {
  describe('Testing Controller: dashboardSettingsNotifications', () => {

    let dashboardSettingsNotificationsController: DashboardSettingsNotificationsController

    beforeEach(() => {
      angular.mock.module(dashboardSettingsNotificationsModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        dashboardSettingsNotificationsController =
          $controller(DashboardSettingsNotificationsController, {
            $state: _$state_,
            $scope: $rootScope.$new()
          })
      })
    })

    it('should exists', () => {
      expect(!!DashboardSettingsNotificationsController).toBe(true)
    })

  })
})
