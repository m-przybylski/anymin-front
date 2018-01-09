import {DashboardSettingsGeneralController} from './general'
import * as angular from 'angular'
import {ModalsService} from '../../../../common/services/modals/modals.service'
import {StateService} from '@uirouter/angularjs'

describe('Unit tests: DashboardSettingsGeneralController >', () => {
  describe('Testing Controller: DashboardSettingsGeneralController', () => {

    let dashboardSettingsGeneralController: DashboardSettingsGeneralController
    let modalService: ModalsService
    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.settings.general')

      inject(($rootScope: ng.IScope, $controller: ng.IControllerService, _$state_: StateService,
              modalsService: ModalsService) => {
        modalService = modalsService
        dashboardSettingsGeneralController =
          $controller<DashboardSettingsGeneralController>('dashboardSettingsGeneralController', {
            modalsService: modalService,
            $state: _$state_,
            $scope: $rootScope.$new(),
            user: {
              settings: {
                nickname: '123'
              }
            }
          })
      })
    })

    it('should exists', () => {
      expect(!!dashboardSettingsGeneralController).toBe(true)
    })

    it('should open basic account settings modal', () => {
      spyOn(modalService, 'createBasicAccountSettingsModal')
      dashboardSettingsGeneralController.openBasicAccountSettingsModal()
      expect(modalService.createBasicAccountSettingsModal).toHaveBeenCalled()
    })

    it('should open phone settings modal', () => {
      spyOn(modalService, 'createGeneralPhoneSettingsModal')
      dashboardSettingsGeneralController.openGeneralPhoneSettingsModal()
      expect(modalService.createGeneralPhoneSettingsModal).toHaveBeenCalled()
    })

    it('should open email settings modal', () => {
      spyOn(modalService, 'createGeneralEmailSettingsModal')
      dashboardSettingsGeneralController.openGeneralEmailSettingsModal()
      expect(modalService.createGeneralEmailSettingsModal).toHaveBeenCalled()
    })

  })
})
