angular.module('profitelo.api.accountsSession', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('AccountsSessionApi', AccountsSessionApi)

function AccountsSessionApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:telcoLogin/session', {telcoLogin: '@telcoLogin'}, {
    'get': {method: 'GET', isArray: false},
    'query': {method: 'GET', isArray: false}
    // /accounts/{accountId}/status
  })
}
