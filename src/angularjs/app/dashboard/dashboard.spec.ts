import * as angular from 'angular'
import './dashboard'
import {IRootScopeService} from '../../common/services/root-scope/root-scope.service';

describe('Unit tests: Dashboard >', () => {
  describe('Testing Controller: DashboardController', () => {

    let _DashboardController: any
    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        _DashboardController = $controller('DashboardController', {
          $scope: $rootScope.$new()
        })
      })
    })

    it('should exists', () => {
      return expect(!!_DashboardController).toBe(true)
    })

  })
})
