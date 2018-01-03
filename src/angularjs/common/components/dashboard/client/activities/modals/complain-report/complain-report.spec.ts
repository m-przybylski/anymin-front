namespace profitelo.components.dashboard.client.activities.modals.complainReport {
  
  describe('Testing Controller: clientComplainReportController', () => {

    let clientComplainReportController: any
    let scope: any
    const uibModalInstance = {
      dismiss: (): void => {

      },
      close: (): void => {

      }
    }

    beforeEach(() => {
      angular.mock.module('profitelo.components.dashboard.client.activities.modals.complain-report')
      inject(($rootScope: any, $controller: ng.IControllerService) => {

        scope = $rootScope.$new()
        scope.disconnectCall = (): void => {
        }

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
}
