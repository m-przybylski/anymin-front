describe('Testing Controller: consultationSummaryExpertController', () => {

  var consultationSummaryExpertController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.communicator.modals.consultation-summary-expert')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      consultationSummaryExpertController = $controller('consultationSummaryExpertController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })
 
  it('should exists', () => {
    return expect(!!consultationSummaryExpertController).toBe(true)
  })

})
