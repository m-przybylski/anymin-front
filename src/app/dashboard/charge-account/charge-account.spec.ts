import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SmoothScrollingService} from '../../../common/services/smooth-scrolling/smooth-scrolling.service'
import {IWindowService} from '../../../common/services/window/window.service'
import './charge-account'
describe('Unit tests: profitelo.controller.dashboard.charge-account >', () => {
  describe('Testing Controller: chargeAccountController', () => {

    let chargeAccountController: any
    let _scope: any
    let url = 'awesomeUrl'
    let _timeout: ng.ITimeoutService
    let _window: IWindowService
    let _smoothScrollingService: SmoothScrollingService
    let _httpBackend: ng.IHttpBackendService
    let _controller: any

    function createController(controller: any, paymentsOptions: any, paymentsLinks: any, financeBalance: any) {

      chargeAccountController = controller('chargeAccountController', {
        $scope: _scope,
        paymentsOptions: paymentsOptions,
        paymentsLinks: paymentsLinks,
        financeBalance: financeBalance,
        $timeout: _timeout,
        smoothScrollingService: _smoothScrollingService
      })
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.charge-account')
      angular.mock.module('profitelo.services.smooth-scrolling')

      inject(($rootScope: IRootScopeService, $httpBackend: ng.IHttpBackendService, $controller: ng.IControllerService,
              $timeout: ng.ITimeoutService, $window: IWindowService, smoothScrollingService: SmoothScrollingService) => {

        _scope = $rootScope.$new()
        _httpBackend = $httpBackend
        _window = $window
        _timeout = $timeout
        _controller = $controller
        _smoothScrollingService = smoothScrollingService

        createController(_controller, {
          lastPayment: {
            amount: {amount: '123'},
            payload: {firstName: 'asas', lastName: 'asasas', email: 'asasas'}
          }, minimalPayment: {amount: 1000}
        }, {}, {})

      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should exsist', () => {
      expect(!!chargeAccountController).toBe(true)
    })

    it('should call smoothScrollingService on minimal-payment validation error', () => {
      spyOn(_smoothScrollingService, 'simpleScrollTo')

      chargeAccountController.amountModel.cashAmount.amount = 2000
      chargeAccountController.validAction()
      expect(_smoothScrollingService.simpleScrollTo).not.toHaveBeenCalled()

      chargeAccountController.amountModel.cashAmount.amount = 2
      chargeAccountController.validAction()
      expect(_smoothScrollingService.simpleScrollTo).toHaveBeenCalled()
    })

    it('should call smoothScrollingService. on scrollHandler', () => {
      spyOn(_smoothScrollingService, 'scrollTo')

      chargeAccountController.currentSection = 1
      chargeAccountController.scrollHandler()
      _timeout.flush()
      expect(_smoothScrollingService.scrollTo).toHaveBeenCalled()

      chargeAccountController.scrollHandler('2')
      expect(_smoothScrollingService.scrollTo).toHaveBeenCalledWith('2')
    })

  })
})
