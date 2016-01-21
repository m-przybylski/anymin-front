function accountsApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:id', {id: '@id'}, {
    'getAccount': {method: 'GET', isArray: true},
    'query': {method: 'GET', isArray: false},
    'update': {method: 'PUT', isArray: false}
  })
}

function accountsStatusApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:id/status', {id: '@id'}, {
    'get': {method: 'GET', isArray: false},
    'query': {method: 'GET', isArray: false}
  })
}

angular.module('profitelo.api.accounts', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('AccountsApi', accountsApi)
.factory('AccountsStatusApi', accountsStatusApi)
