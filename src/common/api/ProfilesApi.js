angular.module('profitelo.api.profiles', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('ProfilesApi', SessionsApi)

function SessionsApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/profiles/:profileId', null, {
    'get':    {method: 'GET', isArray: false},
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'update': {method: 'PUT'},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
  })
}
