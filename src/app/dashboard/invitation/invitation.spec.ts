import * as angular from 'angular'
import './invitation'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit tests: profitelo.controller.dashboard.invitation >', () => {
  describe('Testing Controller: InvitationController', () => {

    let scope: any,
      InvitationController: any


    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.invitation')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {
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
