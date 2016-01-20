function accountsApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:telcoLogin', {telcoLogin: '@telcoLogin'}, {
    'get': {method: 'GET', isArray: true},
    'query': {method: 'GET', isArray: false}
  // /accounts/{accountId}/status
  })
}

function accountsStatusApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:telcoLogin/status', {telcoLogin: '@telcoLogin'}, {
    'get': {method: 'GET', isArray: false},
    'query': {method: 'GET', isArray: false}
    // /accounts/{accountId}/status
  })
}

angular.module('profitelo.api.accounts', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('AccountsApi', accountsApi)
.factory('AccountsStatusApi', accountsStatusApi)
