import * as angular from 'angular'
import './login'
import {IRootScopeService} from '../../common/services/root-scope/root-scope.service';
import {StateService} from '@uirouter/angularjs'

describe('Unit tests: login>', () => {
  describe('Testing Controller: LoginController', () => {

    let $scope: any
    let LoginController: any

    beforeEach(() => {
      angular.mock.module('profitelo.controller.login')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $state: StateService) => {
        $scope = $rootScope.$new()
        LoginController = $controller('LoginController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        })
      })
    })

    it('should exsist', () => {
      expect(!!LoginController).toBe(true)
    })

  })
})
