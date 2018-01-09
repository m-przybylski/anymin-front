import * as angular from 'angular'

import expertDashboardModule from './expert'
import {ExpertController} from './expert.controller'
import {IRootScopeService} from '../../../common/services/root-scope/root-scope.service';
import {StateService} from '@uirouter/angularjs'

describe('Unit tests: expertDashboard >', () => {
  describe('Testing Controller: expertDashboard', () => {

    let ExpertController: ExpertController

    beforeEach(() => {
      angular.mock.module(expertDashboardModule)
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: StateService) => {
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
