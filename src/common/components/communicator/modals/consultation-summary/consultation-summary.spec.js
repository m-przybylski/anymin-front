describe('Testing Controller: consultationSummaryController', () => {

  var consultationSummaryController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.consultation-summary')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      consultationSummaryController = $controller('consultationSummaryController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })
 
  it('should exists', () => {
    return expect(!!consultationSummaryController).toBe(true)
  })
})
