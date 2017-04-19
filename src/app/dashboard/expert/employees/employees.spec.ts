import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import dashboardExpertEmployeesModule from './employees'
import {DashboardExpertEmployeesController} from './employees.controller';

describe('Unit tests: dashboardExpertEmployeesController >', () => {
  describe('Testing Controller: dashboardExpertEmployeesController', () => {

    let DashboardExpertEmployeesController: DashboardExpertEmployeesController

    const expertEmployees = {
      employees: []
    }

    beforeEach(() => {
      angular.mock.module(dashboardExpertEmployeesModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        DashboardExpertEmployeesController =
          $controller<DashboardExpertEmployeesController>('dashboardExpertEmployeesController', {
            $state: _$state_,
            $scope: $rootScope.$new(),
            expertEmployees: expertEmployees
          })
      })
    })

    it('should exists', () => {
      expect(!!DashboardExpertEmployeesController).toBe(true)
    })

  })
})
