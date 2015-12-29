angular.module('profitelo.services.commonSettings', [])

.factory('CommonSettingsService', CommonSettingsService);

function CommonSettingsService() {
  var _settings = {
    apiUrl: 'http://api.profitelo.pl'
  }

  var api = {
    get: function (property) {
      return angular.copy(_settings[property])
    }
  }
  return api;
}
