import * as angular from "angular"
import "./login"

import IRootScopeService = profitelo.services.rootScope.IRootScopeService
describe('Unit tests: login>', () => {
  describe('Testing Controller: LoginController', () => {

    var $scope: any
    var LoginController: any

    beforeEach(() => {
      angular.mock.module('profitelo.controller.login')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $state: ng.ui.IStateService) => {
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
