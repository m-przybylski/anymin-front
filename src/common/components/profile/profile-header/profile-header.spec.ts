import * as angular from 'angular'
import profileHeaderModule from './profile-header'
import {ProfileHeaderComponentController} from './profile-header.controller'

describe('Unit testing: profitelo.components.interface.user-avatar', () => {
  return describe('for user-avatar component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let injectors: any
    let component: ProfileHeaderComponentController
    beforeEach(() => {
      angular.mock.module(profileHeaderModule)
    })

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        injectors = {

        }

        component = $componentController<ProfileHeaderComponentController, {}>('profileHeader', injectors, {
        })

      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
