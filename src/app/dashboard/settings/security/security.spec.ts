import {DashboardSettingsSecurityController} from './security'
import * as angular from 'angular'
import {ModalsService} from '../../../../common/services/modals/modals.service'

describe('Unit tests: dashboardSettingsSecurityController >', () => {
  describe('Testing Controller: dashboardSettingsSecurityController', () => {

    let dashboardSettingsSecurityController: DashboardSettingsSecurityController
    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.settings.security')
      angular.mock.module('ui.router')
      inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        dashboardSettingsSecurityController = $controller<DashboardSettingsSecurityController>('dashboardSettingsSecurityController', {
          $state: _$state_,
          $scope: $rootScope.$new(),
          sessionsData: [{
            lastActivityAt: new Date(),
            system: 'Windows',
            apiKey: 'kkkkklllaaaa'
          },
            {
              lastActivityAt: new Date(),
              system: 'Windows',
              apiKey: 'kkkkklllaaaa'
            },
            {
              lastActivityAt: new Date(),
              system: 'Windows',
              apiKey: 'kkkkklllaaaa'
            }],
          currentSession: {
            apiKey: 'someApiKey'
          }
        })
      })
    })

    it('should exists', () => {
      expect(!!dashboardSettingsSecurityController).toBe(true)
    })

    it('should open createSecurityChangePasswordSettingsModal', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createSecurityChangePasswordSettingsModal')
      dashboardSettingsSecurityController.openSecurityChangePasswordSettingsModal()
      expect(modalsService.createSecurityChangePasswordSettingsModal).toHaveBeenCalled()
    }))

    it('should open createSecurityPinSecuritySettingsModal', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createSecurityPinSecuritySettingsModal')
      dashboardSettingsSecurityController.openSecurityPinSecuritySettingsModal()
      expect(modalsService.createSecurityPinSecuritySettingsModal).toHaveBeenCalled()
    }))

    it('should apiKey be same as currentSession.apiKey', () => {
      expect(dashboardSettingsSecurityController.checkIsCurrentSession('someApiKey')).toBe(true)
    })

  })
})
