describe('Testing Controller: proConnectingSettingsModalController', () => {

  var proConnectingSettingsModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-connecting-settings-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proConnectingSettingsModalController = $controller('proConnectingSettingsModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proConnectingSettingsModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proConnectingSettingsModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})
