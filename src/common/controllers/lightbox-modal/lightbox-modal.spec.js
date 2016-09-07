describe('Testing Controller: LightboxModelController', () => {

  let LightboxModelController
  let scope
  let window
  let uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  let url = 'awesomeUrl/'

  beforeEach(module(function($provide) {
    $provide.value('apiUrl', url)
  }))

  beforeEach(() => {
    module('profitelo.common.controller.lightbox-modal'),
    module('profitelo.swaggerResources.definitions')
    inject(($rootScope, $controller, $window, $uibModalInstance, HelperService, _FilesApi_) => {

      scope = $rootScope.$new()
      uibModalInstance = $uibModalInstance
      LightboxModelController = $controller('LightboxModelController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        '$window' : $window,
        'HelperService' : HelperService,
        'FilesApi' : _FilesApi_
      })

    })
  })

})
