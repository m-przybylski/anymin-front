angular.module('profitelo.services.rest.accounts', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('AccountsRestService', AccountsRestService);

function AccountsRestService($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:id', {id: '@id'}, {
    'get':    {method: 'GET', isArray: true},
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'update': {method: 'PUT'},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
  });
}
