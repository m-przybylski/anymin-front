angular.module('profitelo.services.rest.accounts', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('AccountsRestService', AccountsRestService);

function AccountsRestService($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/accounts/:id', {id: '@id'}, {
  });
}
