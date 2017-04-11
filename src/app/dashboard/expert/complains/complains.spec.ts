import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import dashboardExpertComplainsModule from './complains'

describe('Unit tests: dashboardExpertComplains >', () => {
  describe('Testing Controller: dashboardExpertComplains', () => {

    let ExpertController: any

    beforeEach(() => {
      angular.mock.module(dashboardExpertComplainsModule)
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        ExpertController = $controller('dashboardExpertComplains', {
          $state: _$state_,
          $scope: $rootScope.$new()
        })
      })
    })

    it('should exists', () => {
      expect(!!ExpertController).toBe(true)
    })
  })
})

