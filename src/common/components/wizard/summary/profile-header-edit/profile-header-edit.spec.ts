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

        component = $componentController<ProfileHeaderEditComponentController, {}>('profileHeaderEdit', injectors, {})

      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should delete profile', () => {
      component.onDelete = (): void => {}
      spyOn(window, 'confirm').and.returnValue(true)
      spyOn(component, 'onDelete')
      component.deleteProfile()
      expect(component.onDelete).toHaveBeenCalled()
    })

    it('should edit profile', () => {
      component.onEdit = (): void => {}
      spyOn(component, 'onEdit')
      component.editProfile()
      expect(component.onEdit).toHaveBeenCalled()
    })

    it('should onDelete to be undefined', () => {
      component.deleteProfile()
      expect(component.onDelete).toBeUndefined()
    })

    it('should onEdit to be undefined', () => {
      component.editProfile()
      expect(component.onEdit).toBeUndefined()
    })

    it('should not add employee', inject(($componentController: ng.IComponentControllerService) => {
      component = $componentController<ProfileHeaderEditComponentController, {}>('profileHeaderEdit', injectors, {
        profileDetails: {
          name: 'name',
          avatar: 'avatar',
          description: 'description',
          languages: ['pl'],
          files: [{
            token: 'token',
            previews: ['prev']
          }],
          links: ['link-1']
        }
      })
      component.$onInit()
      expect(component.documents).toEqual(component.profileDetails!.files)
    }))

  })
})
