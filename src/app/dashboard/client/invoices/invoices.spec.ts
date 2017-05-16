import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import DashboardClientInvoicesModule from './invoices'
import {DashboardClientInvoicesController} from './invoices.controller'

describe('Unit tests: dashboardExpertInvoicesController >', () => {
  describe('Testing Controller: dashboardExpertInvoicesController', () => {

    let dashboardExpertInvoicesController: DashboardClientInvoicesController

    beforeEach(() => {
      angular.mock.module(DashboardClientInvoicesModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        dashboardExpertInvoicesController =
          $controller(DashboardClientInvoicesController, {
            $state: _$state_,
            $scope: $rootScope.$new(),
          })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientInvoicesController).toBe(true)
    })

  })
})
