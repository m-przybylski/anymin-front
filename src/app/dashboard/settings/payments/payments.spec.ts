import {DashboardSettingsPaymentsController} from './payments'
import * as angular from 'angular'
  describe('Unit tests: dashboardSettingsPaymentsController >', () => {
    describe('Testing Controller: dashboardSettingsPaymentsController', () => {

      let dashboardSettingsPaymentsController: DashboardSettingsPaymentsController

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl')
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings.payments')
        angular.mock.module('ui.router')
        inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          dashboardSettingsPaymentsController = $controller<DashboardSettingsPaymentsController>('dashboardSettingsPaymentsController', {
            $state: _$state_,
            $scope: $rootScope.$new(),
            user: {},
            getInvoiceData: {
              companyInfo: {
                companyName: 'asasas',
                address: {
                  street: 'sdasd'
                }
              }},
            modalsService: {}
          })
        })
      })

      it('should exists', () => {
        expect(!!dashboardSettingsPaymentsController).toBe(true)
      })
    })
  })
