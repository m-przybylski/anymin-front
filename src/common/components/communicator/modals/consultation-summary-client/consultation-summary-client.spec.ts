describe('Testing Controller: consultationSummaryClientController', () => {

  var consultationSummaryController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(angular.mock.module(($provide) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
  angular.mock.module('profitelo.components.communicator.modals.consultation-summary-client')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      consultationSummaryController = $controller('consultationSummaryClientController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })
 
  it('should exists', () => {
    return expect(!!consultationSummaryController).toBe(true)
  })
})
