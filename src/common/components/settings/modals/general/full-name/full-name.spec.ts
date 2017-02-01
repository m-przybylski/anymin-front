describe('Testing Controller: settingsGeneralFullNameController', () => {

  var settingsGeneralFullNameController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.settings.modals.general.full-name')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      settingsGeneralFullNameController = $controller('settingsGeneralFullNameController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!settingsGeneralFullNameController).toBe(true)
  })

})
