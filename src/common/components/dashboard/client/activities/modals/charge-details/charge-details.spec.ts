namespace profitelo.components.dashboard.client.activities.modals.chargeDetails {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Testing Controller: clientChargeDetailsController', () => {

    var clientChargeDetailsController: any
    var scope: any
    var uibModalInstance = {
      dismiss: () => {

      },
      close: () => {

      }
    }

    beforeEach(() => {
      angular.mock.module('profitelo.components.dashboard.client.activities.modals.charge-details')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = $rootScope.$new()
        scope.disconnectCall = () => {
        }

        clientChargeDetailsController = $controller('clientChargeDetailsController', {
          '$scope': scope,
          '$uibModalInstance': uibModalInstance
        })
      })
    })

    it('should exists', () => {
      return expect(!!clientChargeDetailsController).toBe(true)
    })

  })
}
