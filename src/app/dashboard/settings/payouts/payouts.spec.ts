import * as angular from 'angular'
import {DashboardSettingsPayoutsController} from './payouts.controller'
import dashboardSettingsPayoutsModule from './payouts'
import {ModalsService} from '../../../../common/services/modals/modals.service'
import {PayoutsService} from './payouts.service'
import {TopAlertService} from '../../../../common/services/top-alert/top-alert.service'
import {ErrorHandlerService} from '../../../../common/services/error-handler/error-handler.service'
import SpyObj = jasmine.SpyObj

describe('Unit tests: dashboardSettingsPayoutsController >', () => {
  describe('Testing Controller: dashboardSettingsPayoutsController', () => {

    let dashboardSettingsPayoutsController: DashboardSettingsPayoutsController
    let rootScope: ng.IRootScopeService
    let log: ng.ILogService
    let topAlertService: TopAlertService
    let modalsService: ModalsService
    let errorHandler: ErrorHandlerService

    const payoutsService: SpyObj<PayoutsService> = jasmine.createSpyObj<PayoutsService>('payoutsService',
        ['getPayoutMethods', 'putPayoutMethod'])

    beforeEach(() => {
      angular.mock.module(dashboardSettingsPayoutsModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      inject(($rootScope: ng.IRootScopeService,
              $controller: ng.IControllerService,
              _modalsService_: ModalsService,
              _errorHandler_: ErrorHandlerService,
              $log: ng.ILogService,
              _topAlertService_: TopAlertService) => {
        log = $log
        modalsService = _modalsService_
        errorHandler = _errorHandler_
        rootScope = $rootScope.$new()
        topAlertService = _topAlertService_
        dashboardSettingsPayoutsController =
          $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
          payoutsService,
          topAlertService,
          modalsService,
          errorHandler,
          $scope: rootScope,
          $log: log
        })
      })
    })

    it('should exists', () => {
      expect(!!dashboardSettingsPayoutsController).toBe(true)
    })

    it('should open payouts method modal', () => {
      spyOn(modalsService, 'createPayoutsMethodControllerModal')
      dashboardSettingsPayoutsController.addPayoutMethod()
      expect(modalsService.createPayoutsMethodControllerModal).toHaveBeenCalled()
    })

    it('should delete payout method',
      inject(($q: ng.IQService, $controller: ng.IControllerService) => {
      spyOn(window, 'confirm').and.returnValue(true)
      spyOn(topAlertService, 'success')
      payoutsService.putPayoutMethod.and.callFake(() => $q.resolve({}))
      dashboardSettingsPayoutsController =
        $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
          modalsService,
          payoutsService,
          $scope: rootScope,
          $log: log
        })
      dashboardSettingsPayoutsController.deletePaymentMethod()
      rootScope.$apply()
      expect(topAlertService.success).toHaveBeenCalled()
    }))

    it('should show error when delete payout method fails',
      inject(($q: ng.IQService, $controller: ng.IControllerService) => {
      spyOn(window, 'confirm').and.returnValue(true)
      spyOn(errorHandler, 'handleServerError')
      payoutsService.putPayoutMethod.and.callFake(() => $q.reject())
      dashboardSettingsPayoutsController =
        $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
          modalsService,
          payoutsService,
          errorHandler,
          $scope: rootScope,
          $log: log
        })
      dashboardSettingsPayoutsController.deletePaymentMethod()
      rootScope.$apply()
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    }))

    it('should get paypal payout method', inject(($q: ng.IQService, $controller: ng.IControllerService) => {
      payoutsService.getPayoutMethods.and.callFake(() => $q.resolve({
        payPalAccount: {
          email: 'paypal@com.pl'
        }
      }))
      expect(dashboardSettingsPayoutsController.isLoading).toBe(true)
      dashboardSettingsPayoutsController =
        $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
          modalsService,
          payoutsService,
          $scope: rootScope,
          $log: log
        })
      dashboardSettingsPayoutsController.getPayoutMethods()
      rootScope.$apply()
      expect(dashboardSettingsPayoutsController.payPalAccount).toBe('paypal@com.pl')
      expect(dashboardSettingsPayoutsController.isAnyPayoutMethod).toBe(true)
      expect(dashboardSettingsPayoutsController.isLoading).toBe(false)
    }))

    it('should get bank payout method', inject(($q: ng.IQService, $controller: ng.IControllerService) => {
      payoutsService.getPayoutMethods.and.callFake(() => $q.resolve({
        bankAccount: {
          accountNumber: '12312312312312312312312312'
        }
      }))
      expect(dashboardSettingsPayoutsController.isLoading).toBe(true)
      dashboardSettingsPayoutsController =
        $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
          modalsService,
          payoutsService,
          $scope: rootScope,
          $log: log
        })
      dashboardSettingsPayoutsController.getPayoutMethods()
      rootScope.$apply()
      expect(dashboardSettingsPayoutsController.bankAccount).toBe('12312312312312312312312312')
      expect(dashboardSettingsPayoutsController.isAnyPayoutMethod).toBe(true)
      expect(dashboardSettingsPayoutsController.isLoading).toBe(false)
    }))

    it('should show error when get payout method fails',
      inject(($q: ng.IQService, $controller: ng.IControllerService) => {
      spyOn(log, 'error')
      payoutsService.getPayoutMethods.and.callFake(() => $q.reject({}))
      expect(dashboardSettingsPayoutsController.isLoading).toBe(true)
      expect(dashboardSettingsPayoutsController.isLoadingError).toBe(false)
      dashboardSettingsPayoutsController =
        $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
          modalsService,
          payoutsService,
          $scope: rootScope,
          $log: log
        })
      dashboardSettingsPayoutsController.getPayoutMethods()
      rootScope.$apply()
      expect(log.error).toHaveBeenCalled()
      expect(dashboardSettingsPayoutsController.isAnyPayoutMethod).toBe(false)
      expect(dashboardSettingsPayoutsController.isLoading).toBe(false)
      expect(dashboardSettingsPayoutsController.isLoadingError).toBe(true)
    }))

  })
})
