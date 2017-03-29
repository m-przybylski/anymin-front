namespace profitelo.controllers.acceptRejectDialogController {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Testing Controller: acceptRejectDialogController', () => {

    let acceptRejectDialogController: any
    let scope: any
    let uibModalInstance = {
      dismiss: () => {

      },
      close: () => {

      }
    }

    beforeEach(() => {
      angular.mock.module('profitelo.common.controller.accept-reject-dialog-controller')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

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
}
