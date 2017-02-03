describe('Testing Controller: generalEmailSettingsController', () => {

  var generalEmailSettingsController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.dashboard.settings.modals.general.email-settings')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      generalEmailSettingsController = $controller('generalEmailSettingsController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!generalEmailSettingsController).toBe(true)
  })

})
