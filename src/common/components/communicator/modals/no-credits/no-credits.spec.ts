namespace profitelo.components.communicator.modals.noCredits {
  describe('Testing Controller: noCreditsController', () => {

    let noCreditsController: NoCreditsController
    let scope: INoCreditsControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

    beforeEach(() => {
      angular.mock.module('profitelo.components.communicator.modals.no-credits')
      inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

        scope = <INoCreditsControllerScope>$rootScope.$new()
        scope.$parent = <INoCreditsControllerParentScope>$rootScope.$new()

        noCreditsController = $controller<NoCreditsController>('noCreditsController', {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        })
      })
    })

    it('should exists', () => {
      return expect(!!noCreditsController).toBe(true)
    })
  })
}
