describe('Testing Controller: generalCountrySettingsController', () => {

  var generalCountrySettingsController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.dashboard.settings.modals.general.country-settings')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.disconnectCall = () => {}

      generalCountrySettingsController = $controller('generalCountrySettingsController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!generalCountrySettingsController).toBe(true)
  })

})
