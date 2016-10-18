describe('Testing Controller: proComplaintModalController', () => {

  var proComplaintModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-complaint-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proComplaintModalController = $controller('proComplaintModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proComplaintModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proComplaintModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})
