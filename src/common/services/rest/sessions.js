angular.module('profitelo.services.rest.sessions', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('SessionsRestService', SessionsRestService);

function SessionsRestService($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/sessions', null, {
    'get': {
      method: 'GET',
      isArray: false
    },
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'update': {method: 'PUT'},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
  });
}
