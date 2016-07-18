describe('Testing Controller: proSummaryConversationModalController', () => {

  var proSummaryConversationModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-summary-conversation-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proSummaryConversationModalController = $controller('proSummaryConversationModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proSummaryConversationModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proSummaryConversationModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})
