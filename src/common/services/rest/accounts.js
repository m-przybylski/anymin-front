angular.module('profitelo.services.rest.accounts', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('AccountsRestService', AccountsRestService);

function AccountsRestService($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:telcoLogin', {telcoLogin: '@telcoLogin'}, {
    'get': {method: 'GET', isArray: true},
    'getById': {
      method: 'GET',
      params: {
        telcoLogin: '@telcoLogin'
      },
      isObject: true
    },
    'saveById':   {method: 'POST'},
    'queryById':  {method: 'GET', isArray: true},
    'updateById': {method: 'PUT'},
    'removeById': {
      method: 'DELETE',
      params: {
        telcoLogin: '@telcoLogin'
      }
    },
    'deleteById': {method: 'DELETE'}
  });
}
