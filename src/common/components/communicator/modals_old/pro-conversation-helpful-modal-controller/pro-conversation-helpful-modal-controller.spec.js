describe('Testing Controller: proConversationHelpfulModalController', () => {

  var proConversationHelpfulModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-conversation-helpful-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proConversationHelpfulModalController = $controller('proConversationHelpfulModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proConversationHelpfulModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proConversationHelpfulModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})
