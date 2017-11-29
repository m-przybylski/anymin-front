import * as angular from 'angular'
import {PayoutsApiMock, PayoutsApi} from 'profitelo-api-ng/api/api'
import {DashboardSettingsPayoutsController} from './payouts.controller'
import dashboardSettingsPayoutsModule from './payouts'
  describe('Unit tests: dashboardSettingsPayoutsController >', () => {
    describe('Testing Controller: dashboardSettingsPayoutsController', () => {

      let dashboardSettingsPayoutsController: DashboardSettingsPayoutsController
      let PayoutsApiMock: PayoutsApiMock
      let state: ng.ui.IStateService
      let rootScope: ng.IScope
      let httpBackend: ng.IHttpBackendService
      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl')
      }))

      beforeEach(() => {
        angular.mock.module(dashboardSettingsPayoutsModule)
        angular.mock.module('ui.router')
        inject(($rootScope: ng.IRootScopeService, _PayoutsApiMock_: PayoutsApiMock,
                _PayoutsApi_: PayoutsApi, $controller: ng.IControllerService,
                _$state_: ng.ui.IStateService, $httpBackend: ng.IHttpBackendService) => {
          state = _$state_
          httpBackend = $httpBackend
          rootScope = $rootScope.$new()
          dashboardSettingsPayoutsController = $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
            $state: state,
            $scope: rootScope,
            PayoutsApi: _PayoutsApi_,
            payoutsMethods: [{
              payPalAccount: {
                email: 'MockEmail',
                isDefault: true
              }
            }],
            modalsService: {
              createPayoutsMethodControllerModal: (): boolean => {
                return true
              }
            }
          })
          PayoutsApiMock =  _PayoutsApiMock_
        })
      })

      it('should exists', () => {
        expect(!!dashboardSettingsPayoutsController).toBe(true)
      })

      it('should delete payment method', () => {
        spyOn(state, 'reload')
        PayoutsApiMock.putPayoutMethodRoute(200, {})
        dashboardSettingsPayoutsController.deletePaymentMethod()
        httpBackend.flush()
        expect(state.reload).toHaveBeenCalled()
      })

      it('should throw error on delete payment method', () => {
        PayoutsApiMock.putPayoutMethodRoute(500)
        expect(() => {
          dashboardSettingsPayoutsController.deletePaymentMethod()
          httpBackend.flush()
          rootScope.$digest()}).toThrowError()
      })
    })
  })
