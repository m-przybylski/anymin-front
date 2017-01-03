describe('Testing Controller: noCreditsController', () => {

  var noCreditsController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.communicator.modals.no-credits')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      noCreditsController = $controller('noCreditsController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!noCreditsController).toBe(true)
  })
})
