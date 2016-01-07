angular.module('profitelo.api.accountsStatus', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('AccountsStatusApi', AccountsStatusApi)

function AccountsStatusApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:telcoLogin/status', {telcoLogin: '@telcoLogin'}, {
    'get': {method: 'GET', isArray: false},
    'query': {method: 'GET', isArray: false}
    // /accounts/{accountId}/status
  })
}
