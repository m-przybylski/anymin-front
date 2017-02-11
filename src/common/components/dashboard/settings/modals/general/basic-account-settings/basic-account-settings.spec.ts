namespace profitelo.components.dashboard.settings.modals.general.basicAccountSettings {

  import BasicAccountSettingsController = profitelo.components.dashboard.settings.modals.general.basicAccountSettings.BasicAccountSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  class File {
    constructor() {}
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

    const User = {
      getData: () => {
        return {
          isAnonymous: false,
          nickname: 'Heniek',
          avatar: '78ijn567uejwewewe3'
        }
      }
    }

    beforeEach(() => {
      originalFile = window.File
      window.File = File
    })

    afterEach(() => {
      window.File = originalFile
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', "awsomeUrl")
    }))

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.basic-account-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _AccountApi_: any) => {

        scope = <IBasicAccountSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          AccountApi: _AccountApi_,
          User: User,
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
