namespace profitelo.components.dashboard.client.activities.modals.chargeDetails {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Testing Controller: clientChargeDetailsController', () => {

    let clientChargeDetailsController: any
    let scope: any
    let uibModalInstance = {
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
        scope.$parent.financeActivityDetails = {
          financialOperation: {

          }
        }


        clientChargeDetailsController = $controller('clientChargeDetailsController', {
          '$scope': scope,
          '$uibModalInstance': uibModalInstance,
          '$state': {

          }
        })
      })
    })

    it('should exists', () => {
      return expect(!!clientChargeDetailsController).toBe(true)
    })

  })
}
