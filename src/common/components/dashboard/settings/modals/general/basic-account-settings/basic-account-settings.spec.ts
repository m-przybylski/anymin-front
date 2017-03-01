namespace profitelo.components.dashboard.settings.modals.general.basicAccountSettings {

  import BasicAccountSettingsController = profitelo.components.dashboard.settings.modals.general.basicAccountSettings.BasicAccountSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IAccountApi = profitelo.api.IAccountApi

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
      getUser: () => {}
    }

    beforeEach(() => {
      angular.mock.module('profitelo.services.user')
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', "awsomeUrl")
      $provide.value('userService', userService)
    }))

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.basic-account-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _AccountApi_: IAccountApi, $q: ng.IQService) => {

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

    it('should verifyCode', () => {
      const imagePath = 'string'
      const file: any = new File()
      const cb = () => {
      }
      scope.addPhoto(imagePath, file, cb)

      expect(scope.isUserUploadImage).toBeTruthy()
    })
  })
}
