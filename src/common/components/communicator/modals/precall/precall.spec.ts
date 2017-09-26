import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ViewsApi} from 'profitelo-api-ng/api/api'
import modalsModule from '../../../../services/modals/modals'
import {ModalsService} from '../../../../services/modals/modals.service'
import {IPrecallModalControllerScope, PrecallModalController} from './precall.controller'
import precallModalModule from './precall'
import {ClientCallService} from '../../call-services/client-call.service'
import {PaymentsApiMock, FinancesApiMock} from 'profitelo-api-ng/api/api'

describe('Testing Controller: precallModalController', () => {

  let precallModalController: PrecallModalController
  let scope: IPrecallModalControllerScope
  let PaymentsApiMock: PaymentsApiMock
  let FinancesApiMock: FinancesApiMock
  let $state: ng.ui.IStateService
  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

  const clientCallService: ClientCallService = {
  } as ClientCallService

  beforeEach(() => {
    angular.mock.module(precallModalModule)
    angular.mock.module(modalsModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('clientCallService', clientCallService)
  }))

  beforeEach(() => {
    angular.mock.module(modalsModule)

    inject(($rootScope: IRootScopeService,
            $controller: ng.IControllerService,
            _$httpBackend_: ng.IHttpBackendService,
            _ViewsApi_: ViewsApi,
            _modalsService_: ModalsService,
            $q: ng.IQService,
            _FinancesApiMock_: FinancesApiMock,
            _PaymentsApiMock_: PaymentsApiMock
            ) => {

      scope = <IPrecallModalControllerScope>$rootScope.$new()
      PaymentsApiMock = _PaymentsApiMock_
      FinancesApiMock = _FinancesApiMock_
      $state = <ng.ui.IStateService>{
        go: (_to: string): ng.IPromise<{}> => $q.resolve({})
      }

      precallModalController = $controller<PrecallModalController>('precallModalController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        ViewsApi: _ViewsApi_,
        modalsService: _modalsService_,
        clientCallService: clientCallService,
        $state: $state
      })
    })

    PaymentsApiMock.getCreditCardsRoute(500)
    FinancesApiMock.getClientBalanceRoute(200, {
      amount: 6000,
      currency: 'PLN'
    })
    precallModalController.$onInit()
  })

  it('should exists', () => {
    expect(!!precallModalController).toBe(true)
  })

  it('should close Precall modal', () => {
    precallModalController.onModalClose()
    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should open Add-payment-method modal and close Precall modal',
    inject((modalsService: ModalsService) => {

    spyOn(modalsService, 'createAddPaymentMethodControllerModal')
    precallModalController.addNewPaymentMethod()

    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(modalsService.createAddPaymentMethodControllerModal)
    .toHaveBeenCalledWith(precallModalController.onModalClose)
  }))

  it('should redirect to app.charge-account state and close Precall modal', () => {
    spyOn($state, 'go')
    precallModalController.showChargeAccountModal()
    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect($state.go).toHaveBeenCalledWith('app.charge-account')
  })

  it('should redirect to app.charge-account state and close Precall modal', () => {
    spyOn($state, 'go')
    precallModalController.showChargeAccountModal()
    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect($state.go).toHaveBeenCalledWith('app.charge-account')
  })

  it('should valid price', () => {
    precallModalController.isPrepaid = true
    precallModalController.onPriceChange('sda')
    expect(precallModalController.isPriceInputValid).toBe(false)
  })

})
