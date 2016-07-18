describe('Testing Controller: proClientAdviceOptionsModalController', () => {

  var proClientAdviceOptionsModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-client-advice-options-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proClientAdviceOptionsModalController = $controller('proClientAdviceOptionsModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proClientAdviceOptionsModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proClientAdviceOptionsModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})
