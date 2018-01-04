import * as angular from 'angular'

import {BasicAccountSettingsController, IBasicAccountSettingsControllerScope} from './basic-account-settings'
import userModule from '../../../../../../services/user/user'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {FileTypeChecker} from '../../../../../../classes/file-type-checker/file-type-checker'

describe('Testing Controller: basicAccountSettingsController', () => {

  let controller: BasicAccountSettingsController
  let scope: IBasicAccountSettingsControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  const uploaderFactory = {
    getInstance: (): void => {
    }
  }

  const userService = {
    getUser: (): void => {
    }
  }

  beforeEach(() => {
    angular.mock.module(userModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awsomeUrl')
    $provide.value('userService', userService)
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.modals.general.basic-account-settings')
    inject(($rootScope: any,
            $controller: ng.IControllerService,
            _AccountApi_: AccountApi,
            $q: ng.IQService) => {

      spyOn(userService, 'getUser').and.callFake(() => $q.resolve({
        settings: {
          isAnonymous: false,
          nickname: 'Heniek'
        }
      }))

      scope = <IBasicAccountSettingsControllerScope>$rootScope.$new()

      const injectors = {
        $uibModalInstance,
        uploaderFactory,
        userService,
        $scope: scope,
        AccountApi: _AccountApi_
      }

      controller = $controller<BasicAccountSettingsController>('basicAccountSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should uibModalInstance', () => {
    scope.onModalClose()
    expect($uibModalInstance.dismiss).toHaveBeenCalled()
  })

  it('should add photo', () => {
    const imagePath = 'string'
    const cb = (): void => {
    }
    spyOn(FileTypeChecker, 'isFileFormatValid').and.returnValue(true)
    scope.addPhoto(imagePath, <File>{size: 2000}, cb)

    expect(scope.isUserUploadImage).toBeTruthy()
  })

  it('should nick name be valid' , () => {
    scope.generalSettingsObject = {
      isNotAnonymous: false,
      nickname: 'someNickName'
    }
    expect(scope.isNicknameValid()).toEqual(true)
  })
})
