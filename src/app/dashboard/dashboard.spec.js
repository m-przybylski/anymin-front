describe('Unit tests: Dashboard >', () => {
  describe('Testing Controller: DashboardController', () => {

    let _DashboardController
    let _scope
    beforeEach(() => {
      module('profitelo.controller.dashboard')
      inject(($rootScope, $controller) => {

        _DashboardController = $controller('DashboardController', {
          '$rootScope': $rootScope,
          '$scope': _scope,
          'userProfile': {},
          '$state': {
            current: {
              data: {
                showMenu: true
              }  
            }
          }
        })
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
    

  })
})
