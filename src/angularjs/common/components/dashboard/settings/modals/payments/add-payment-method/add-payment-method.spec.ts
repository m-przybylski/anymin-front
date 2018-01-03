import * as angular from 'angular'


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

    inject(($rootScope: any, $controller: ng.IControllerService) => {

      scope = <IAddPaymentMethodControllerScope>$rootScope.$new()
      scope.callback = () => {}
      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      }

      controller = $controller<AddPaymentMethodController>('addPaymentMethodController', injectors)
    })
  })

  it('should exists', () => {
    expect(!!controller).toBe(true)
  })

  it('should load braintree form ', () => {
    controller.onLoad()
    expect(controller.onBraintreeFormLoad).toBe(true)
  })

  it('should call callback function on form succeed', () => {
    spyOn(scope, 'callback')
    controller.onFormSucceed()
    expect(scope.callback).toHaveBeenCalled()
  })

})
