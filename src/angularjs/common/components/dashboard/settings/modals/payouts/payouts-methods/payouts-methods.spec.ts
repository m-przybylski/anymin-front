import * as angular from 'angular'
import {PayoutsMethodsModalController, IPayoutsModalControllerScope} from './payouts-methods.controller'
import {PayoutsMethodsModalService} from './payouts-methods.service'
import SpyObj = jasmine.SpyObj
import {default as payoutsMethodsModalModule} from './payouts-methods'
import {IRootScopeService} from '../../../../../../services/root-scope/root-scope.service';

describe('Testing Controller: PayoutsMethodsModalController', () => {

  let controller: PayoutsMethodsModalController
  let scope: IPayoutsModalControllerScope
  let injectors = {}

  const $uibModalInstance = {
    dismiss: (): void => {},
    close: (): void => {}
  }
  const payoutsMethodsModalService: SpyObj<PayoutsMethodsModalService> =
    jasmine.createSpyObj<PayoutsMethodsModalService>('payoutsMethodsModalService', ['putPayoutMethod'])

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module(payoutsMethodsModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
  }))

  beforeEach(() => {

    inject(($rootScope: IRootScopeService,
            $controller: ng.IControllerService) => {

      scope = <IPayoutsModalControllerScope>$rootScope.$new()
      injectors = {
        $uibModalInstance,
        payoutsMethodsModalService,
        $scope: scope
      }

      controller = $controller<PayoutsMethodsModalController>('payoutsMethodsModalController', injectors)
    })
  })

  it('should exists', () => {
    expect(!!controller).toBe(true)
  })

  it('should email be valid',  () => {
    controller.payPalEmail = 'test@test.com'
    expect(controller.isPayPalEmailValid()).toBe(true)
  })

  it('should bank account number valid', () => {
    controller.bankAccountNumber = '12312312312312312312312312'
    expect(controller.isBankAccountNumberValid()).toBe(true)
  })

  it('should close modal', () => {
    spyOn($uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should choose payout paypal method', () => {
    controller.choosePayoutPaypalMethod()
    expect(controller.payoutMethod).toBe('paypalAccount')
  })

  it('should choose payout bank method', () => {
    controller.choosePayoutBankMethod()
    expect(controller.payoutMethod).toBe('bankAccount')
  })

  it('should add pay pal account', inject(($q: ng.IQService, $controller: ng.IControllerService) => {
    spyOn($uibModalInstance, 'dismiss')
    scope.onModalCloseCallback = (): void => {}
    payoutsMethodsModalService.putPayoutMethod.and.callFake(() => $q.resolve({}))
    controller = $controller<PayoutsMethodsModalController>('payoutsMethodsModalController', {
      $uibModalInstance,
      payoutsMethodsModalService,
      $scope: scope
    })
    controller.addPayPalAccount()
    scope.$apply()
    expect($uibModalInstance.dismiss).toHaveBeenCalled()
  }))

})
