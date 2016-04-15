angular.module('profitelo.services.commonSettings', [])

.factory('CommonSettingsService', CommonSettingsService)

function CommonSettingsService() {
  let _settings = {
    
  }

  let _localSettings = {
    emailPattern: "^([a-z0-9!#$%&'*+/=?^_`{|}~.-]+)@([a-z0-9-]+)\\.([a-zA-Z.]+)$",
    passwordPattern: '[a-zA-Z0-9]{6,64}',
    pinPattern: '\\d{4}'
  }

  return {
    get: function(property) {
      return angular.copy(_settings[property])
    },
    localSettings: _localSettings
  }


}
