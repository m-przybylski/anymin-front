function profilesApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/profiles', null, {
    'get':    {method: 'GET', isArray: false},
    'query':  {method: 'GET', isArray: true},
    'update': {method: 'PUT'}
  })
}

function profilesExpertApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/profiles/:expertId', null, {
    'get':    {method: 'GET', isArray: false},
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'update': {method: 'PUT'},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
  })
}

function profilesNewApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/profiles/new', null, {
    'get':    {method: 'GET', isArray: false}
  })
}

angular.module('profitelo.api.profiles', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('ProfilesApi', profilesApi)
.factory('ProfilesExpertApi', profilesExpertApi)
.factory('ProfilesNewApi', profilesNewApi)
