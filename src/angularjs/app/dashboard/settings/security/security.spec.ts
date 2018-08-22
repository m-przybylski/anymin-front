import { DashboardSettingsSecurityController } from './security';
import * as angular from 'angular';
import { StateService } from '@uirouter/angularjs';

describe('Unit tests: dashboardSettingsSecurityController >', () => {
  describe('Testing Controller: dashboardSettingsSecurityController', () => {
    let dashboardSettingsSecurityController: DashboardSettingsSecurityController;
    beforeEach(
      angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL');
      }),
    );

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.settings.security');
      angular.mock.module('ui.router');
      inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: StateService) => {
        dashboardSettingsSecurityController = $controller<DashboardSettingsSecurityController>(
          'dashboardSettingsSecurityController',
          {
            $state: _$state_,
            $scope: $rootScope.$new(),
            sessionsData: [
              {
                lastActivityAt: new Date(),
                system: 'Windows',
                apiKey: 'kkkkklllaaaa',
              },
              {
                lastActivityAt: new Date(),
                system: 'Windows',
                apiKey: 'kkkkklllaaaa',
              },
              {
                lastActivityAt: new Date(),
                system: 'Windows',
                apiKey: 'kkkkklllaaaa',
              },
            ],
            currentSession: {
              session: {
                apiKey: 'someApiKey',
              },
            },
          },
        );
      });
    });

    it('should exists', () => {
      expect(!!dashboardSettingsSecurityController).toBe(true);
    });

    it('should apiKey be same as currentSession.apiKey', () => {
      expect(dashboardSettingsSecurityController.checkIsCurrentSession('someApiKey')).toBe(true);
    });
  });
});
