namespace profitelo.components.dashboard.client.activities.modals.consultationDetails {
import IUrlService = profitelo.services.helper.IUrlService
  describe('Testing Controller: clientConsultationDetails', () => {

  var clientConsultationDetails: any
  var scope: any
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details')
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            _urlService_: IUrlService, _ViewsApi_: any) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      clientConsultationDetails = $controller('clientConsultationDetails', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'httpBackend': _$httpBackend_,
        'urlService': _urlService_,
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

}
