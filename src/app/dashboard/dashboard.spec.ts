describe('Unit tests: Dashboard >', () => {
  describe('Testing Controller: DashboardController', () => {

    let _DashboardController
    let _scope
    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard')
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

  })
})
