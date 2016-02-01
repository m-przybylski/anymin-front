function RegistrationApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/registration/:token', {token: '@token'}, {
    'save':       {method: 'POST'},
    'checkToken': {method: 'GET'}
  })
}
function RegistrationCheckApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/registration/check/:email', {email: '@email'}, {
    'checkEmail': {method: 'GET'}
  })
}
angular.module('profitelo.api.registration', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('RegistrationApi', RegistrationApi)
.factory('RegistrationCheckApi', RegistrationCheckApi)
