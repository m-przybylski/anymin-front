angular.module('profitelo.api.registration', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('RegistrationApi', RegistrationApi)

function RegistrationApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/registration', {}, {
    'save':   {method: 'POST'}
  })
}
