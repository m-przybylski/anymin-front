import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import expertDashboardModule from './expert'
  describe('Unit tests: expertController >', () => {
    describe('Testing Controller: ExpertController', () => {

      let ExpertController: any

      beforeEach(() => {
        angular.mock.module(expertDashboardModule)
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          ExpertController = $controller('ExpertController', {
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

