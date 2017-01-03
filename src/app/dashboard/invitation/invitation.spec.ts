describe('Unit tests: profitelo.controller.dashboard.invitation >', () => {
  describe('Testing Controller: InvitationController', () => {

    let scope,
      InvitationController


    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.invitation')
      inject(($rootScope, $controller) => {
        scope = $rootScope.$new()


        InvitationController = $controller('InvitationController', {
          $rootScope: $rootScope,
          $scope: scope,
          pendingInvitations: {
            organizationDetails: {
              logoUrl: ''
            }
          },
          companyLogo: ''
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