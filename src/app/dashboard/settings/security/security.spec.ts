import {DashboardSettingsSecurityController} from "./security"
import * as angular from "angular"
  import ITimeConstant = profitelo.constants.time.ITimeConstant

  describe('Unit tests: dashboardSettingsSecurityController >', () => {
    describe('Testing Controller: dashboardSettingsSecurityController', () => {

      let dashboardSettingsSecurityController: DashboardSettingsSecurityController

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL')
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings.security')
        angular.mock.module('ui.router')
        angular.mock.module('profitelo.constants.time')
        inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService,
                timeConstant: ITimeConstant) => {
          dashboardSettingsSecurityController = $controller<DashboardSettingsSecurityController>('dashboardSettingsSecurityController', {
            $state: _$state_,
            $scope: $rootScope.$new(),
            sessionsData: [],
            timeConstant: timeConstant,
            user: {
            }
          })
        })
      })

      it('should exists', () => {
        expect(!!dashboardSettingsSecurityController).toBe(true)
      })
    })
  })
