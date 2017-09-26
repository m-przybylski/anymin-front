import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import '../charge-account'
import chargeAccountModalModule from './charge-account'
import {SmoothScrollingService} from '../../../common/services/smooth-scrolling/smooth-scrolling.service'
import smoothScrollingModule from '../../../common/services/smooth-scrolling/smooth-scrolling'
import {IChargeAccountScope, ChargeAccountController} from './charge-account.controller'
import {keyboardCodes} from '../../../common/classes/keyboard'

describe('Unit tests: profitelo.controller.dashboard.charge-account >', (): void => {
  describe('Testing Controller: chargeAccountController', (): void => {

    let chargeAccountController: ChargeAccountController
    let scope: IChargeAccountScope
    const url = 'awesomeUrl'
    let timeout: ng.ITimeoutService
    let window: ng.IWindowService
    let smoothScrollingService: SmoothScrollingService
    let httpBackend: ng.IHttpBackendService
    let controller: ng.IControllerService
    let $state: ng.ui.IStateService

    const uibModalInstance = {
      dismiss: (): void => {

      },
      close: (): void => {

      }
    }

    function createController(controller: ng.IControllerService): void {

      chargeAccountController = <ChargeAccountController>controller('chargeAccountModal', {
        $scope: scope,
        $window: window,
        $timeout: timeout,
        $state: $state,
        smoothScrollingService,
        $uibModalInstance: uibModalInstance
      })
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService): void => {
      $provide.value('apiUrl', url)
    }))

    beforeEach((): void => {
      angular.mock.module(chargeAccountModalModule)
      angular.mock.module(smoothScrollingModule)

      inject(($rootScope: IRootScopeService, $httpBackend: ng.IHttpBackendService, $controller: ng.IControllerService,
              $timeout: ng.ITimeoutService, $window: ng.IWindowService, $q: ng.IQService,
              _smoothScrollingService_: SmoothScrollingService): void => {

        scope = $rootScope.$new()
        httpBackend = $httpBackend
        window = $window
        timeout = $timeout
        controller = $controller
        smoothScrollingService = _smoothScrollingService_
        $state = <ng.ui.IStateService>{
          go: (_to: string): ng.IPromise<{}> => $q.resolve({})
        }

        createController(controller)

      })
    })

    it('should have a dummy test', (): void => {
      expect(true).toBeTruthy()
    })

    it('should exsist', (): void => {
      expect(!!chargeAccountController).toBe(true)
    })

    it('should call smoothScrollingService on minimal-payment validation error', (): void => {
      spyOn(smoothScrollingService, 'simpleScrollTo')
      scope.paymentsOptions = {
        paymentCountryId: 'lp',
        countryISO: 'pl',
        minimalPayment: {
          amount: 2340,
          currency: 'PLN'
        },
        paymentOptions: [
          {
            amount: 2340,
            currency: 'PLN'
          }
        ],
        paymentSystems: [{
          id: 'id',
          slug: 'slug',
          desc: 'desc',
          updatedAt: new Date(),
          createdAt: new Date()
        }]
      }
      scope.creditCards = []

      chargeAccountController.$onInit()
      chargeAccountController.amountModel = {
        cashAmount: {
          amount: 2,
          currency: 'PLN'
        },
        amount: null
      }
      chargeAccountController.amounts = {
        minimalAmounts: {
          amount: 10,
          currency: 'PLN'
        },
        paymentOptions: [
          {
            amount: 10,
            currency: 'PLN'
          },
          {
            amount: 1000,
            currency: 'PLN'
          },
        ]
      }
      chargeAccountController.amountModel.cashAmount!.amount = 2000
      chargeAccountController.validAction()
      expect(smoothScrollingService.simpleScrollTo).not.toHaveBeenCalled()
    })

    it('should call smoothScrollingService. on scrollHandler', (): void => {
      spyOn(smoothScrollingService, 'scrollTo')

      chargeAccountController.currentSection = 1
      chargeAccountController.scrollHandler()
      timeout.flush()
      expect(smoothScrollingService.scrollTo).toHaveBeenCalled()

      chargeAccountController.scrollHandler(2)
      expect(smoothScrollingService.scrollTo).toHaveBeenCalledWith('2')
    })

    it('should close modal', (): void => {
      spyOn($state, 'go')
      chargeAccountController.onModalClose()
      expect($state.go).toHaveBeenCalledWith('app.dashboard.client.activities')
    })

    it('should close modal when ESC key is pressed', inject(() => {
      const event = jQuery.Event('keydown')
      spyOn(chargeAccountController, 'onModalClose')
      event.which = keyboardCodes.escape
      event.keyCode = keyboardCodes.escape
      angular.element(window).trigger(event)
      expect(chargeAccountController.onModalClose).toHaveBeenCalled()
    }))
  })
})
