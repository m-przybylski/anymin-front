import * as angular from 'angular'
import { DashboardSettingsPayoutsController } from './payouts.controller'
import dashboardSettingsPayoutsModule from './payouts'
import { ModalsService } from '../../../../common/services/modals/modals.service'
import { PayoutsService } from './payouts.service'
import { TopAlertService } from '../../../../common/services/top-alert/top-alert.service'
import SpyObj = jasmine.SpyObj

describe('Unit tests: dashboardSettingsPayoutsController >', () => {
  describe('Testing Controller: dashboardSettingsPayoutsController', () => {

    let dashboardSettingsPayoutsController: DashboardSettingsPayoutsController
    const payoutsService: SpyObj<PayoutsService> = jasmine.createSpyObj<PayoutsService>('payoutsService',
      ['getPayoutMethods', 'putPayoutMethod'])
    const modalsService: SpyObj<ModalsService> = jasmine.createSpyObj<ModalsService>('modalsService',
      ['createConfirmAlertModal'])
    beforeEach(() => {
      angular.mock.module(dashboardSettingsPayoutsModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      inject(($rootScope: ng.IRootScopeService,
              $controller: ng.IControllerService,
              _modalsService_: ModalsService) => {
        dashboardSettingsPayoutsController =
          $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
            payoutsService,
            $scope: $rootScope.$new(),
            modalsService: _modalsService_
          })
      })
    })

    it('should exists', () => {
      expect(!!dashboardSettingsPayoutsController).toBe(true)
    })

    it('should open payouts method modal', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createPayoutsMethodControllerModal')
      dashboardSettingsPayoutsController.addPayoutMethod()
      expect(modalsService.createPayoutsMethodControllerModal).toHaveBeenCalled()
    }))

    it('should delete payout method',
      inject(($q: ng.IQService, $controller: ng.IControllerService, topAlertService: TopAlertService,
              $rootScope: ng.IRootScopeService) => {
        spyOn(topAlertService, 'success')
        payoutsService.putPayoutMethod.and.callFake(() => $q.resolve({}))
        modalsService.createConfirmAlertModal.and.callFake((_msg: string, cb: () => void) => {
          cb();
        });
        dashboardSettingsPayoutsController =
          $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
            payoutsService,
            modalsService
          })
        dashboardSettingsPayoutsController.deletePaymentMethod()
        $rootScope.$apply()
        expect(topAlertService.success).toHaveBeenCalled()
      }))

    it('should get paypal payout method',
      inject(($q: ng.IQService, $controller: ng.IControllerService, $rootScope: ng.IRootScopeService) => {
        payoutsService.getPayoutMethods.and.callFake(() => $q.resolve({
          payPalAccount: {
            email: 'paypal@com.pl'
          }
        }))
        dashboardSettingsPayoutsController =
          $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
            payoutsService,
          })
        dashboardSettingsPayoutsController.getPayoutMethods()
        expect(dashboardSettingsPayoutsController.isLoading).toBe(true)
        $rootScope.$apply()
        expect(dashboardSettingsPayoutsController.payPalAccountEmail).toBe('paypal@com.pl')
        expect(dashboardSettingsPayoutsController.isAnyPayoutMethod).toBe(true)
        expect(dashboardSettingsPayoutsController.isLoading).toBe(false)
      }))

    it('should get bank payout method',
      inject(($q: ng.IQService, $controller: ng.IControllerService, $rootScope: ng.IRootScopeService) => {
        payoutsService.getPayoutMethods.and.callFake(() => $q.resolve({
          bankAccount: {
            accountNumber: '12312312312312312312312312'
          }
        }))
        dashboardSettingsPayoutsController =
          $controller<DashboardSettingsPayoutsController>('dashboardSettingsPayoutsController', {
            payoutsService,
          })
        dashboardSettingsPayoutsController.getPayoutMethods()
        expect(dashboardSettingsPayoutsController.isLoading).toBe(true)
        $rootScope.$apply()
        expect(dashboardSettingsPayoutsController.bankAccountNumber).toBe('12312312312312312312312312')
        expect(dashboardSettingsPayoutsController.isAnyPayoutMethod).toBe(true)
        expect(dashboardSettingsPayoutsController.isLoading).toBe(false)
      }))

  })
})
