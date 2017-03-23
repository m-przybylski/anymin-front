import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit tests: expertController >', () => {
    describe('Testing Controller: ExpertController', () => {

      let ExpertController: any

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.expert')
        angular.mock.module('ui.router')
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

