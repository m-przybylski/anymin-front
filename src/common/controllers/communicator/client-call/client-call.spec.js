describe('Testing Controller: clientCallController', () => {

  var clientCallController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.common.controller.communicator.client-call')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      clientCallController = $controller('clientCallController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })
 
  it('should exists', () => {
    return expect(!!clientCallController).toBe(true)
  })

  it('should have reject function', () => {
    spyOn(uibModalInstance, 'dismiss')

    scope.rejectCall()

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
