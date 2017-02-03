describe('Testing Controller: generalPhoneSettingsController', () => {

  var generalPhoneSettingsController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.dashboard.settings.modals.general.phone-settings')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      generalPhoneSettingsController = $controller('generalPhoneSettingsController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!generalPhoneSettingsController).toBe(true)
  })

})
