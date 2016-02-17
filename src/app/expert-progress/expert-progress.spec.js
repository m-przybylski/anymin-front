describe('Unit tests: expert progress section >', () => {
  describe('Testing Controller: ExpertProgressController', () => {

    var $scope,
      HomeController,
      _accountSession

    beforeEach(() => {
      module('profitelo.controller.expert-progress')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        HomeController = $controller('ExpertProgressController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          AccountSession: _accountSession
        })
      })
    })


    it('should exists', () => {
      return expect(!!HomeController).toBe(true)
    })

  })
})
