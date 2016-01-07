angular.module('profitelo.api.registration', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('RegistrationApi', RegistrationApi)

function RegistrationApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/registration/:token', {token: '@token'}, {
    'save':       {method: 'POST'},
    'checkToken': {method: 'GET'}
  })
}
