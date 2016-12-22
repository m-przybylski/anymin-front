describe('Testing Controller: clientChargeDetailsController', () => {

  var clientChargeDetailsController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.dashboard.client.activities.modals.charge-details')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

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
