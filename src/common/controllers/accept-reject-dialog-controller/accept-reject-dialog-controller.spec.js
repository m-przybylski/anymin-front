describe('Testing Controller: acceptRejectDialogController', () => {

  var acceptRejectDialogController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.common.controller.accept-reject-dialog-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      acceptRejectDialogController = $controller('acceptRejectDialogController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!acceptRejectDialogController).toBe(true)
  })

  it('should have reject function', () => {

    spyOn(uibModalInstance, 'dismiss')

    scope.reject()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

  it('should have confirm function', () => {

    spyOn(uibModalInstance, 'close')

    scope.$parent = {
      vm: {}
    }

    scope.confirm()

    expect(uibModalInstance.close).toHaveBeenCalledWith('cancel')
  })


  it('should have call modalCallback if exists', () => {

    scope.$parent = {
      vm: {
        modalCallback: () => {

        }
      }
    }

    spyOn(scope.$parent.vm, 'modalCallback')

    scope.confirm()

    expect(scope.$parent.vm.modalCallback).toHaveBeenCalled()


  })



})
