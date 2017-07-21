import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {BasicAccountSettingsController, IBasicAccountSettingsControllerScope} from './basic-account-settings'
import userModule from '../../../../../../services/user/user'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {FileTypeChecker} from '../../../../../../classes/file-type-checker'

class File {
  constructor() {
  }
}

interface Window {
  File: any
}

declare const window: Window

describe('Testing Controller: basicAccountSettingsController', () => {

  let controller: BasicAccountSettingsController
  let scope: IBasicAccountSettingsControllerScope
  let originalFile: any

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  const uploaderFactory = {
    getInstance: () => {
    },
    collectionTypes: {
      avatar: {}
    }
  }

  beforeEach(() => {
    originalFile = window.File
    window.File = File
  })

  afterEach(() => {
    window.File = originalFile
  })

  const userService = {
    getUser: () => {
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
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _AccountApi_: AccountApi, $q: ng.IQService) => {

      spyOn(userService, 'getUser').and.callFake(() => $q.resolve({
        settings: {
          isAnonymous: false,
          nickname: 'Heniek'
        }
      }))

      scope = <IBasicAccountSettingsControllerScope>$rootScope.$new()

      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        AccountApi: _AccountApi_,
        userService: userService,
        uploaderFactory: uploaderFactory
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
    const file: any = new File()
    const cb = () => {
    }
    spyOn(FileTypeChecker, 'isFileFormatValid').and.returnValue(true)
    scope.addPhoto(imagePath, file, cb)

    expect(scope.isUserUploadImage).toBeTruthy()
  })
})
