describe('Unit tests: profitelo.controller.dashboard.charge-account >', () => {
  describe('Testing Controller: chargeAccountController', () => {

    

    var InvitationController
    let _scope
    let url = 'awesomeUrl'
    let _timeout
    let _window
    let _smoothScrolling
    let resourcesExpectations
    let _httpBackend
    let _controller

    function createController(controller, paymentsOptions, paymentsLinks, financeBalance) {
      InvitationController = controller('chargeAccountController', {
        $scope: _scope,
        paymentsOptions: paymentsOptions,
        paymentsLinks: paymentsLinks,
        financeBalance: financeBalance,
        $timeout: _timeout,
        $window: _window,
        smoothScrolling: _smoothScrolling
      })
    }

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.dashboard.charge-account')
      module('profitelo.swaggerResources.definitions')
      module('templates-module')
      inject(($rootScope, $httpBackend, $controller, $injector, $timeout, $window) => {

        _scope = $rootScope.$new()
        _httpBackend = $httpBackend
        _window = $window
        _timeout = $timeout
        _controller = $controller


        createController(_controller, {lastPayment: null}, {}, {})
        
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should exsist', ()=> {
      expect(!!InvitationController).toBe(true)
    })

  })
})
