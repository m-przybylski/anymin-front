describe('Testing Controller: proExpertNoAvailableModalController', () => {

  var proExpertNoAvailableModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-expert-no-available-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proExpertNoAvailableModalController = $controller('proExpertNoAvailableModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proExpertNoAvailableModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proExpertNoAvailableModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})
