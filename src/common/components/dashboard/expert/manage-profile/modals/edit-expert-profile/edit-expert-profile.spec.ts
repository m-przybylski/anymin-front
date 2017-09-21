import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import manageProfileEditProfileModule from './edit-expert-profile'
import {EditExpertProfileController, IEditExpertProfileScope} from './edit-expert-profile.controller'
import {ProfileApi} from 'profitelo-api-ng/api/api';
describe('Testing Controller: editExpertProfileController', () => {

  let editExpertProfileController: EditExpertProfileController
  let scope: IEditExpertProfileScope
  let ProfileApi: ProfileApi
  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

    }
  }

  beforeEach(() => {
    angular.mock.module(manageProfileEditProfileModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('topAlertService', {})
  }))

  beforeEach(() => {
    inject(($rootScope: IRootScopeService,
            $controller: ng.IControllerService,
            _ProfileApi_: ProfileApi) => {

      ProfileApi = _ProfileApi_

      scope = <IEditExpertProfileScope>$rootScope.$new()

      editExpertProfileController = $controller(EditExpertProfileController, {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'ProfileApi': ProfileApi
      })
    })
  })

  it('should exists', () => {
    return expect(!!editExpertProfileController).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    editExpertProfileController.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should not save profile ', () => {
    editExpertProfileController.profileName = 'a'
    editExpertProfileController.saveChanges()
    expect(editExpertProfileController.isSubmitted).toBe(true)
  })

  it('should save expert profile', inject(($q: ng.IQService) => {
    spyOn(ProfileApi, 'patchProfileRoute').and.callFake(() => $q.resolve({}))
    editExpertProfileController.profileName = 'SomeName'
    editExpertProfileController.profileAvatarToken = 'someToken'
    editExpertProfileController.profileDescription = 'someDescription someDescription someDescription someDescription'
    scope.profile = {
      name: 'name',
      avatar: 'avatar',
      description: 'someDescription someDescription someDescription someDescription',
      files: [{
        token: 'token',
        previews: ['prev']
      }],
      links: ['link']
    }
    const updatedProfile = {
      expertDetails: {
        name: 'SomeName',
        avatar: 'someToken',
        description: 'someDescription someDescription someDescription someDescription',
        files: [],
        links: []
      }
    }
    const status: boolean = true
    editExpertProfileController.onUploadingFile(status)
    editExpertProfileController.saveChanges()
    expect(editExpertProfileController.isSubmitted).toBe(false)
    expect(ProfileApi.patchProfileRoute).toHaveBeenCalledWith(updatedProfile)
  }))

  it('should save organization profile', inject(($q: ng.IQService) => {
    spyOn(ProfileApi, 'patchProfileRoute').and.callFake(() => $q.resolve({}))
    editExpertProfileController.profileName = 'SomeName'
    editExpertProfileController.profileAvatarToken = 'someToken'
    editExpertProfileController.profileDescription = 'someDescription someDescription someDescription someDescription'
    scope.profile = {
      name: 'name',
      logo: 'avatar',
      description: 'someDescription someDescription someDescription someDescription',
      files: [{
        token: 'token',
        previews: ['prev']
      }],
      links: ['link']
    }
    const updatedProfile = {
      organizationDetails: {
        name: 'SomeName',
        logo: 'someToken',
        description: 'someDescription someDescription someDescription someDescription',
        files: [],
        links: []
      }
    }
    const status: boolean = true
    editExpertProfileController.onUploadingFile(status)
    editExpertProfileController.saveChanges()
    expect(editExpertProfileController.isSubmitted).toBe(false)
    expect(ProfileApi.patchProfileRoute).toHaveBeenCalledWith(updatedProfile)
  }))

})
