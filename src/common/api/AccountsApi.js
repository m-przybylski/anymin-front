angular.module('profitelo.api.accounts', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('AccountsApi', AccountsApi)

function AccountsApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:id', {id: '@id'}, {
    'getAccount': {method: 'GET', isArray: true},
    'query': {method: 'GET', isArray: false}
  // /accounts/{accountId}/status
  })
}
