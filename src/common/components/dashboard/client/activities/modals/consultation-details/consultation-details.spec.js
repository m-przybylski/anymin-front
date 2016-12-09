describe('Testing Controller: clientConsultationDetails', () => {

  var clientConsultationDetails
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.dashboard.client.activities.modals.consultation-details')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      clientConsultationDetails = $controller('clientConsultationDetails', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!clientConsultationDetails).toBe(true)
  })

})
