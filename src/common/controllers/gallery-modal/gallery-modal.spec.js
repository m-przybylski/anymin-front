describe('Testing Controller: galleryModelController', () => {

  var galleryModelController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.common.controller.gallery-modal')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      galleryModelController = $controller('galleryModelController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!galleryModelController).toBe(true)
  })


})
