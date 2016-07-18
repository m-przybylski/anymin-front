describe('Testing Controller: proSwitchingConversationModalController', () => {

  var proSwitchingConversationModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-switching-conversation-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proSwitchingConversationModalController = $controller('proSwitchingConversationModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proSwitchingConversationModalController).toBe(true)
  })


})
