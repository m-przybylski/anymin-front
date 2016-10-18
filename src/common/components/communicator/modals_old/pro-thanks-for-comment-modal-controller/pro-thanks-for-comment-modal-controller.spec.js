describe('Testing Controller: proThanksForCommentModalController', () => {

  var proThanksForCommentModalController
  var scope
  var _state
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-thanks-for-comment-modal-controller')
    inject(($rootScope, $controller, _$state_) => {

      scope = $rootScope.$new()
      _state = _$state_
      proThanksForCommentModalController = $controller('proThanksForCommentModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        '$state': _state
      })

    })
  })

  it('should exists', () => {
    return expect(!!proThanksForCommentModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proThanksForCommentModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})
