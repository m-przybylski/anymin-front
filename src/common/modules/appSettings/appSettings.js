angular.module('appSettings', [
])


.factory('AppSettingsService', AppSettingsService)




function AppSettingsService() {



  let _localSettings
  _localSettings = {
    emailPattern: "^([a-z0-9!#$%&'*+/=?^_`{|}~.-]+)@([a-z0-9-]+)\\.([a-zA-Z.]+)$",
    passwordPattern: '[a-zA-Z]{6,64}',
    pinPattern: '\\d{4}'
  }

  return {
    localSettings: _localSettings


  }
}