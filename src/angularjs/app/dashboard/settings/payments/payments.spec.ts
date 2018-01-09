import {DashboardSettingsPaymentsController, default as paymentsSettingsModule} from './payments'
import {AccountApiMock, PaymentsApiMock, FinancesApi, FinancesApiMock} from 'profitelo-api-ng/api/api'
import * as angular from 'angular'
import {StateService} from '@uirouter/angularjs'
import {ModalsService} from '../../../../common/services/modals/modals.service'

describe('Unit tests: dashboardSettingsPaymentsController >', () => {
  describe('Testing Controller: dashboardSettingsPaymentsController', () => {

    let dashboardSettingsPaymentsController: DashboardSettingsPaymentsController
    let AccountApiMock: AccountApiMock
    let PaymentsApiMock: PaymentsApiMock
    let FinancesApiMock: FinancesApiMock
    let httpBackend: ng.IHttpBackendService
    let modalsService: ModalsService
    let state: StateService
    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('modalsService', ModalsService)
    }))

    beforeEach(() => {
      angular.mock.module(paymentsSettingsModule)
      angular.mock.module('ui.router')
      inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _modalsService_: ModalsService,
              _AccountApiMock_: AccountApiMock, _$state_: StateService, _FinancesApi_: FinancesApi,
              _FinancesApiMock_: FinancesApiMock, $httpBackend: ng.IHttpBackendService,
              _PaymentsApiMock_: PaymentsApiMock) => {
        modalsService = _modalsService_
        state = _$state_
        dashboardSettingsPaymentsController =
          $controller<DashboardSettingsPaymentsController>('dashboardSettingsPaymentsController', {
            $state: state,
            $scope: $rootScope.$new(),
            FinancesApi: _FinancesApi_,
            user: {},
            modalsService: modalsService,
            getInvoiceData: {
              companyName: 'asasas',
              address: {
                street: 'sdasd'
              }
            }
          },)
        PaymentsApiMock = _PaymentsApiMock_
        AccountApiMock = _AccountApiMock_
        FinancesApiMock = _FinancesApiMock_
        httpBackend = $httpBackend
      })
      PaymentsApiMock.getCreditCardsRoute(500)
      FinancesApiMock.getClientBalanceRoute(200, {
        amount: 2000,
        currency: 'PLN'
      })
      httpBackend.flush()

    })

    it('should exists', () => {
      expect(!!dashboardSettingsPaymentsController).toBe(true)
    })

    it('should redirect on first time', () => {
      spyOn(state, 'go')
      dashboardSettingsPaymentsController.addFirstTimePaymentMethod()
      expect(state.go).toHaveBeenCalled()
    })

  })
})
