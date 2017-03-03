namespace profitelo.components.dashboard.settings.modals.payouts.payoutsPaypal {

  describe('Testing Controller: PayoutsPaypalController', () => {

    let controller: PayoutsPaypalController
    let scope: IPayoutsPaypalControllerControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.payouts.payouts-paypal')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <IPayoutsPaypalControllerControllerScope>$rootScope.$new()
        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        controller = $controller<PayoutsPaypalController>('payoutsPaypal', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })
  })
}
