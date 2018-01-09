import * as angular from 'angular'

import {DashboardSettingsNotificationsController} from './notifications.controller'
import dashboardSettingsNotificationsModule from './notifications'
import {IRootScopeService} from '../../../../common/services/root-scope/root-scope.service';
import {StateService} from '@uirouter/angularjs'

describe('Unit tests: dashboardSettingsNotifications >', () => {
  describe('Testing Controller: dashboardSettingsNotifications', () => {

    let dashboardSettingsNotificationsController: DashboardSettingsNotificationsController

    beforeEach(() => {
      angular.mock.module(dashboardSettingsNotificationsModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: StateService) => {
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
