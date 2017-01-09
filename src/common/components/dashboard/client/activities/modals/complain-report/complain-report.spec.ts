describe('Testing Controller: clientComplainReportController', () => {

  var clientComplainReportController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.dashboard.client.activities.modals.complain-report')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      clientComplainReportController = $controller('clientComplainReportController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!clientComplainReportController).toBe(true)
  })

})
