describe('Testing Controller: proInvitationAcceptanceBoxModalController', () => {

  var proInvitationAcceptanceBoxModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.dashboard.invitation.pro-invitation-acceptance-box-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proInvitationAcceptanceBoxModalController = $controller('proInvitationAcceptanceBoxModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proInvitationAcceptanceBoxModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proInvitationAcceptanceBoxModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

  it('should have submitReasonForm function', () => {

    spyOn(uibModalInstance, 'dismiss')

    scope.$parent = {
      vm: {
        postEmploymentsReject: () => {

        }
      }
    }

    proInvitationAcceptanceBoxModalController.submitReasonForm()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })




})
