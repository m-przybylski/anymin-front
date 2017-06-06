import * as angular from 'angular'
import {ProfileHeaderEditComponentController} from './profile-header-edit.controller'
import profileHeaderEditModule from './profile-header-edit'

describe('Unit testing: profitelo.components.profile.profile-header-edit', () => {
  return describe('for profile-header-edit component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let injectors: Object
    let component: ProfileHeaderEditComponentController

    beforeEach(() => {
      angular.mock.module(profileHeaderEditModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        injectors = {}

        component = $componentController<ProfileHeaderEditComponentController, {}>('profileHeaderEdit', injectors, {
        })

      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
