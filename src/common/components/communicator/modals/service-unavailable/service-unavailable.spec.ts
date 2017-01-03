describe('Testing Controller: unavailableServiceController', () => {

  var unavailableExpertController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.communicator.modals.service-unavailable')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      scope.confirm = _ => _

      unavailableExpertController = $controller('unavailableServiceController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!unavailableExpertController).toBe(true)
  })
})
