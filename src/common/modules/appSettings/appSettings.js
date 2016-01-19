angular.module('appSettings', [
])


.factory('AppSettingsService', AppSettingsService)




function AppSettingsService() {



  let _localSettings
  _localSettings = {
    emailPattern: "^([a-z0-9!#$%&'*+/=?^_`{|}~.-]+)@([a-z0-9-]+)\.([a-zA-Z.]+)$"
  }


  let
  api


  return api = {
    localSettings: _localSettings


  }
}