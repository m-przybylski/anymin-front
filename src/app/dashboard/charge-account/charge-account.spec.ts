describe('Unit tests: profitelo.controller.dashboard.charge-account >', () => {
  describe('Testing Controller: chargeAccountController', () => {

    

    var chargeAccountController
    let _scope
    let url = 'awesomeUrl'
    let _timeout
    let _window
    let _smoothScrolling
    let resourcesExpectations
    let _httpBackend
    let _controller

    function createController(controller, paymentsOptions, paymentsLinks, financeBalance) {
      
      chargeAccountController = controller('chargeAccountController', {
        $scope: _scope,
        paymentsOptions: paymentsOptions,
        paymentsLinks: paymentsLinks,
        financeBalance: financeBalance,
        $timeout: _timeout
      })
    }

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.charge-account')
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('templates-module')
      inject(($rootScope, $httpBackend, $controller, $injector, $timeout, $window, smoothScrolling) => {

        _scope = $rootScope.$new()
        _httpBackend = $httpBackend
        _window = $window
        _timeout = $timeout
        _controller = $controller
        _smoothScrolling = smoothScrolling

        createController(_controller, {lastPayment: {amount: { amount: '123'}, payload: {firstName: 'asas', lastName: 'asasas', email: 'asasas'}}, minimalPayment: {amount:1000}}, {}, {})
        
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should exsist', ()=> {
      expect(!!chargeAccountController).toBe(true)
    })

    it('should call smoothScrolling on minimal-payment validation error', () => {
      spyOn(_smoothScrolling, 'simpleScrollTo')

      chargeAccountController.amountModel.cashAmount.amount = 2000
      chargeAccountController.validAction()
      expect(_smoothScrolling.simpleScrollTo).not.toHaveBeenCalled()

      chargeAccountController.amountModel.cashAmount.amount = 2
      chargeAccountController.validAction()
      expect(_smoothScrolling.simpleScrollTo).toHaveBeenCalled()
    })

    it('should call smoothScrolling. on scrollHandler', ()=> {
      spyOn(_smoothScrolling, 'scrollTo')
      
      chargeAccountController.currentSection = 1
      chargeAccountController.scrollHandler()
      _timeout.flush()
      expect(_smoothScrolling.scrollTo).toHaveBeenCalled()
      
      chargeAccountController.scrollHandler('2')
      expect(_smoothScrolling.scrollTo).toHaveBeenCalledWith('2')
    })

  })
})
