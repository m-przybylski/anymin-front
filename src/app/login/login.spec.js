describe('Unit tests: login>', () => {
  describe('Testing Controller: LoginController', () => {

    var $scope
    var LoginController

    beforeEach(() => {
      module('profitelo.controller.login')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        LoginController = $controller('LoginController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        })
      })
    })

    it('should exsist', ()=> {
      return expect(!!LoginController).toBe(true)
    })

  })
})
