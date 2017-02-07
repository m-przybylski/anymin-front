namespace profitelo.components.communicator.modals.serviceUnavailable {

  describe('Testing Controller: unavailableServiceController', () => {

    let unavailableExpertController: UnavailableServiceController
    let scope: IUnavailableServiceControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

    beforeEach(() => {
      angular.mock.module('profitelo.components.communicator.modals.service-unavailable')

      inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

        scope = <IUnavailableServiceControllerScope>$rootScope.$new()
        scope.$parent = <IUnavailableServiceControllerParentScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        unavailableExpertController = $controller<UnavailableServiceController>(
          'unavailableServiceController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!unavailableExpertController).toBe(true)
    })
  })
}
