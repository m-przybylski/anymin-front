describe('Testing Controller: proNoCreditsModalController', () => {

  var proNoCreditsModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-no-credits-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proNoCreditsModalController = $controller('proNoCreditsModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proNoCreditsModalController).toBe(true)
  })
  
  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proNoCreditsModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})
