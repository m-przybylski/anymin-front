import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import expertDashboardModule from './expert'
import {ExpertController} from './expert.controller'

  describe('Unit tests: expertDashboard >', () => {
    describe('Testing Controller: expertDashboard', () => {

      let ExpertController: ExpertController

      beforeEach(() => {
        angular.mock.module(expertDashboardModule)
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          ExpertController = $controller('expertDashboard', {
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

