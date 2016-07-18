describe('Testing Controller: proThanksForVoteModalController', () => {

  var proThanksForVoteModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-thanks-for-vote-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proThanksForVoteModalController = $controller('proThanksForVoteModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proThanksForVoteModalController).toBe(true)
  })


})
