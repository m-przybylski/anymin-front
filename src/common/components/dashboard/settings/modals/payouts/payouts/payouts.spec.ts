import * as angular from 'angular'
import {PayoutsModalController, IPayoutsModalControllerScope} from './payouts.controller'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {PayoutsModalService} from './payouts.service'
import SpyObj = jasmine.SpyObj
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'
import payoutsModalModule from './payouts'

describe('Testing Controller: PayoutsModalController', () => {

  let controller: PayoutsModalController
  let scope: IPayoutsModalControllerScope
  let injectors = {}
  let errorHandler: ErrorHandlerService

  const $uibModalInstance = {
    dismiss: (): void => {},
    close: (): void => {}
  }
  const payoutsModalService: SpyObj<PayoutsModalService> =
    jasmine.createSpyObj<PayoutsModalService>('payoutsModalService', ['putPayoutMethod'])

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module(payoutsModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
  }))

  beforeEach(() => {

    inject(($rootScope: IRootScopeService,
            $controller: ng.IControllerService,
            _errorHandler_: ErrorHandlerService) => {

      scope = <IPayoutsModalControllerScope>$rootScope.$new()
      errorHandler = _errorHandler_
      injectors = {
        $uibModalInstance,
        errorHandler,
        payoutsModalService,
        $scope: scope
      }

      controller = $controller<PayoutsModalController>('payoutsModalController', injectors)
    })
  })

  it('should exists', () => {
    expect(!!controller).toBe(true)
  })

  it('should email be valid',  () => {
    controller.payPalEmail = 'test@test.com'
    expect(controller.isPayPalEmailValid()).toEqual(true)
  })

  it('should bank account number valid', () => {
    controller.bankAccountNumber = '12312312312312312312312312'
    expect(controller.isBankAccountNumberValid()).toEqual(true)
  })

  it('should close modal', () => {
    spyOn($uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should choose payout paypal method', () => {
    controller.choosePayoutPaypalMethod()
    expect(controller.isPayoutPaypalMethod).toBe(true)
    expect(controller.isPayoutBankMethod).toBe(false)
  })

  it('should choose payout bank method', () => {
    controller.choosePayoutBankMethod()
    expect(controller.isPayoutPaypalMethod).toBe(false)
    expect(controller.isPayoutBankMethod).toBe(true)
  })

  it('should add pay pal account', inject(($q: ng.IQService, $controller: ng.IControllerService) => {
    spyOn($uibModalInstance, 'dismiss')
    scope.onModalCloseCallback = (): void => {}
    payoutsModalService.putPayoutMethod.and.callFake(() => $q.resolve({}))
    controller = $controller<PayoutsModalController>('payoutsModalController', {
      $uibModalInstance,
      payoutsModalService,
      $scope: scope
    })
    controller.addPayPalAccount()
    scope.$apply()
    expect($uibModalInstance.dismiss).toHaveBeenCalled()
  }))

  it('should show error when add pay pal account fails',
    inject(($q: ng.IQService, $controller: ng.IControllerService) => {
    spyOn(errorHandler, 'handleServerError')
    payoutsModalService.putPayoutMethod.and.callFake(() => $q.reject())
    controller = $controller<PayoutsModalController>('payoutsModalController', {
      $uibModalInstance,
      payoutsModalService,
      $scope: scope
    })
    controller.addPayPalAccount()
    scope.$apply()
    expect(controller.isLoading).toBe(false)
    expect(errorHandler.handleServerError).toHaveBeenCalled()
  }))

})
