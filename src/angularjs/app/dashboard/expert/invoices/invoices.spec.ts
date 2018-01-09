import * as angular from 'angular'

import dashboardExpertInvoicesModule from './invoices'
import {DashboardExpertInvoicesController} from './invoices.controller';
import {IRootScopeService} from '../../../../common/services/root-scope/root-scope.service';
import {StateService} from '@uirouter/angularjs'

describe('Unit tests: dashboardExpertInvoicesController >', () => {
  describe('Testing Controller: dashboardExpertInvoicesController', () => {

    let dashboardExpertInvoicesController: DashboardExpertInvoicesController

    beforeEach(() => {
      angular.mock.module(dashboardExpertInvoicesModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: StateService) => {
        dashboardExpertInvoicesController =
          $controller(DashboardExpertInvoicesController, {
            $state: _$state_,
            $scope: $rootScope.$new(),
          })
      })
    })

    it('should exists', () => {
      expect(!!DashboardExpertInvoicesController).toBe(true)
    })

  })
})
