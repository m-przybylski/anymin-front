import * as angular from 'angular'
import profileHeaderModule from './profile-header'
import {ProfileHeaderComponentController} from './profile-header.controller'

describe('Unit testing: profitelo.components.profile.profile-header', () => {
  return describe('for profile-header component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let injectors: any
    let component: ProfileHeaderComponentController

    const userService = {
      getUser: (): void => {
      }
    }

    beforeEach(() => {
      angular.mock.module(profileHeaderModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, $q: ng.IQService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        injectors = {
          userService: userService,
        }

        spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))

        component = $componentController<ProfileHeaderComponentController, {}>('profileHeader', injectors, {
        })

      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
