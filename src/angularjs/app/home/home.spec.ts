import * as angular from 'angular'
import './home'
import {IRootScopeService} from '../../common/services/root-scope/root-scope.service';
import {StateService} from '@uirouter/angularjs'

describe('Unit tests: Home section >', () => {
  describe('Testing Controller: HomeController', () => {

    let $scope: ng.IScope
    let HomeController: any

    beforeEach(() => {
      angular.mock.module('profitelo.controller.home')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $state: StateService) => {
        $scope = $rootScope.$new()
        HomeController = $controller('HomeController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        })
      })
    })

    it('should exists', () => {
      return expect(!!HomeController).toBe(true)
    })

  })
})
