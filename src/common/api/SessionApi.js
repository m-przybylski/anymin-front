function SessionApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/session', null, {
    'get':    {method: 'GET', isArray: false},
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'update': {method: 'PUT'},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
  })
}


angular.module('profitelo.api.session', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('SessionApi', SessionApi)
