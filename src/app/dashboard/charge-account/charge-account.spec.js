describe('Unit tests: profitelo.controller.dashboard.charge-account >', () => {
  describe('Testing Controller: chargeAccountController', () => {

    let scope,
      InvitationController


    beforeEach(() => {
      module('profitelo.controller.dashboard.charge-account')
      inject(($rootScope, $controller) => {
        scope = $rootScope.$new()


        InvitationController = $controller('chargeAccountController', {
          $rootScope: $rootScope,
          $scope: scope
        })

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
