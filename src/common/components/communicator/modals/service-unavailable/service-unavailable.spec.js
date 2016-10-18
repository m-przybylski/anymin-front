describe('Testing Controller: unavailableServiceController', () => {

  var unavailableExpertController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.service-unavailable')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      unavailableExpertController = $controller('unavailableServiceController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!unavailableExpertController).toBe(true)
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
