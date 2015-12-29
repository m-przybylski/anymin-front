angular.module('profitelo.services.rest.sessions', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('SessionsRestService', SessionsRestService);

function SessionsRestService($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/sessions', null, {
    'get':    {
      method: 'GET',
      isObject: true,
      interceptor: {
        response: function (data) {
          return data;
        },
        responseError: function (data) {
          return data;
        }
      }
    },
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'update': {method: 'PUT'},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
  });
}
