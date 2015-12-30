angular.module('profitelo.services.rest.accounts', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('AccountsRestService', AccountsRestService);

function AccountsRestService($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:telcoLogin', {telcoLogin: '@telcoLogin'}, {
    'get': {method: 'GET', isArray: false},
    'query': {method: 'GET', isArray: false}
  });
}
