import * as angular from "angular"
import {PayoutsPayPalController, IPayoutsPayPalControllerScope} from "./payouts-pay-pal"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService

describe('Testing Controller: PayoutsPayPalController', () => {

  let controller: PayoutsPayPalController
  let scope: IPayoutsPayPalControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.modals.payouts.payouts-pay-pal')

    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IPayoutsPayPalControllerScope>$rootScope.$new()
      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      }

      controller = $controller<PayoutsPayPalController>('payoutsPayPalController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })
})
