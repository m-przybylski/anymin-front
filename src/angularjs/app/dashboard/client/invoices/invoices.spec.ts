import * as angular from 'angular'

import DashboardClientInvoicesModule from './invoices'
import {DashboardClientInvoicesController} from './invoices.controller'
import {IRootScopeService} from '../../../../common/services/root-scope/root-scope.service';

describe('Unit tests: dashboardClientInvoicesController >', () => {
  describe('Testing Controller: dashboardClientInvoicesController', () => {

    let dashboardClientInvoicesController: DashboardClientInvoicesController

    beforeEach(() => {
      angular.mock.module(DashboardClientInvoicesModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        dashboardClientInvoicesController =
          $controller(DashboardClientInvoicesController, {
            $state: _$state_,
            $scope: $rootScope.$new(),
            getInvoiceData: {
              companyName: 'asasas',
              address: {
                street: 'sdasd'
              }
            }
          })
      })
    })

    it('should exists', () => {
      expect(!!DashboardClientInvoicesController).toBe(true)
    })

  })
})
