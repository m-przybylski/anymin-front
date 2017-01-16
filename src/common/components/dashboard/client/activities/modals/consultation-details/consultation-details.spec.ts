describe('Testing Controller: clientConsultationDetails', () => {

  var clientConsultationDetails
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
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details')
    inject(($rootScope, $controller, _$httpBackend_, _HelperService_, _ViewsApi_) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      clientConsultationDetails = $controller('clientConsultationDetails', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'httpBackend': _$httpBackend_,
        'HelperService': _HelperService_,
        'ViewsApi': _ViewsApi_
      })
    })
  })

  it('should exists', () => {
    return expect(!!clientConsultationDetails).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    scope.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})

