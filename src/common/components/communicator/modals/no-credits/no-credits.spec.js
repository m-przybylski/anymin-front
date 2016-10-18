describe('Testing Controller: noCreditsController', () => {

  var noCreditsController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.no-credits')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      noCreditsController = $controller('noCreditsController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!noCreditsController).toBe(true)
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
