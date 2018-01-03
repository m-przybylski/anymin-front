import * as angular from 'angular'
import userAvatarModule from './user-avatar'
import {UserAvatarComponentController} from './user-avatar.controller'

describe('Unit testing: profitelo.components.interface.user-avatar', () => {
  return describe('for user-avatar component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: UserAvatarComponentController
    let injectors: any
    beforeEach(() => {
      angular.mock.module(userAvatarModule)
    })

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        injectors = {
          urlService: {
            resolveFileUrl: (token: string): string => {
              return 'http://profiteloIsThebest.profitelo.pl' + token
            }
          }
        }

      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should compile the component with image', inject(($componentController: ng.IComponentControllerService) => {
      component = $componentController<UserAvatarComponentController, {}>('userAvatar', injectors, {
        imageToken: 'sdsdsdsd'
      })
      component.$onInit()
      expect(component.profileImageUrl).toBe('http://profiteloIsThebest.profitelo.pl' + component.imageToken)
    }))

    it('should compile the component without image', inject(($componentController: ng.IComponentControllerService) => {
      component = $componentController<UserAvatarComponentController, {}>('userAvatar', injectors, {
        imageToken: ''
      })
      component.$onInit()
      expect(component.profileImageUrl).toBe('/assets/images/no-avatar.jpg')
    }))

  })
})
