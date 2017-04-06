import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {DashboardExpertComplainsController} from './complains.controller'
import dashboardExpertComplainsModule from './complains'

describe('Unit tests: DashboardExpertComplainsController >', () => {
  describe('Testing Controller: DashboardExpertComplainsController', () => {

    let DashboardExpertComplainsController: DashboardExpertComplainsController

    const expertComplains = {
      complains: []
    }

    beforeEach(() => {
      angular.mock.module(dashboardExpertComplainsModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        DashboardExpertComplainsController =
          $controller<DashboardExpertComplainsController>('DashboardExpertComplainsController', {
            $state: _$state_,
            $scope: $rootScope.$new(),
            expertComplains: expertComplains,
          })
      })
    })

    it('should exists', () => {
      expect(!!DashboardExpertComplainsController).toBe(true)
    })

  })
})
