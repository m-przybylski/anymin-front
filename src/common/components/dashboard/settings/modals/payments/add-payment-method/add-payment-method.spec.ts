import * as angular from 'angular'

import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {AddPaymentMethodController, IAddPaymentMethodControllerScope} from './add-payment-method'

describe('Testing Controller: AddPaymentMethodController', () => {

  let controller: AddPaymentMethodController
  let scope: IAddPaymentMethodControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.modals.payments.add-payment-method')

    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IAddPaymentMethodControllerScope>$rootScope.$new()
      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      }

      controller = $controller<AddPaymentMethodController>('addPaymentMethodController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })
})
