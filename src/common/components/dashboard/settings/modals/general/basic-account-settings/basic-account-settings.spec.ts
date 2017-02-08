namespace profitelo.components.dashboard.settings.modals.general.basicAccountSettings {

  import BasicAccountSettingsController = profitelo.components.dashboard.settings.modals.general.basicAccountSettings.BasicAccountSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  interface IBasicAccountSettingsControllerScope extends ng.IScope {
    onModalClose: void
    addPhoto: void
    isUserUploadImage: boolean
  }

  describe('Testing Controller: basicAccountSettingsController', () => {


    let controller: BasicAccountSettingsController
    let scope: IBasicAccountSettingsControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);


    const uploaderFactory = {
      collectionTypes: {
        avatar: {}
      }
    }

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', "awsomeUrl")
    }))

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.basic-account-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _AccountApi_, _User_) => {

        scope = <IBasicAccountSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          AccountApi: _AccountApi_,
          User: _User_,
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
      scope.addPhoto(imagePath)

      expect(scope.isUserUploadImage).toBeTruthy()
    })
  })
}
