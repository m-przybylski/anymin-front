import * as angular from 'angular'
import {SettingsController} from './settings'
import './settings'
import {StateService} from '@uirouter/angularjs'

describe('Unit tests: settingsController >', () => {
  describe('Testing Controller: settingsController', () => {

    let settingsController: SettingsController

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.settings')
      angular.mock.module('ui.router')
      inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: StateService) => {
        settingsController = $controller<SettingsController>('settingsController', {
          $state: _$state_,
          $scope: $rootScope.$new()
        })
      })
    })

    it('should exists', () => {
      expect(!!settingsController).toBe(true)
    })
  })
})
