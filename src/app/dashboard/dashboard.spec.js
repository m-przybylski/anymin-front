describe('Unit tests: Dashboard >', () => {
  describe('Testing Controller: DashboardController', () => {

    let $scope
    let _DashboardController
    let _httpBackend
    let _state

    let _url = 'http://api.webpage.com'


    beforeEach(() => {
      module('profitelo.controller.dashboard')
      inject(($rootScope, $controller, $injector) => {

        _httpBackend = $injector.get('$httpBackend')
        _state = $injector.get('$state')

        $scope = $rootScope.$new()
        _DashboardController = $controller('DashboardController', {})
      })
    })

    it('should exists', () => {
      return expect(!!_DashboardController).toBe(true)
    })

    it('should toggle user switcher', () => {
      _DashboardController.switchUser = false
      _DashboardController.changeAccount()
      expect(_DashboardController.switchUser).toBeTruthy()
    })

    it('should toggle sidebar switcher', () => {
      _DashboardController.isSidebarOpen = false
      _DashboardController.toogleSidebar()
      expect(_DashboardController.isSidebarOpen).toBeTruthy()
    })

    it('should start logout action if not pending', () => {

      spyOn(_state, 'go')
      let session = _httpBackend.when('DELETE', _url + '/session')

      session.respond(200)

      _DashboardController.logout()
      _httpBackend.flush()
      expect(_state.go).toHaveBeenCalledWith('app.login.account')
    })

    it('should not start logout action if pending', () => {

      _DashboardController.isPending = true
      spyOn(_state, 'go')
      _DashboardController.logout()
      expect(_state.go).not.toHaveBeenCalledWith('app.login.account')
    })

  })
})
