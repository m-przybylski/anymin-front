angular.module('profitelo.services.rest.registration', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('RegistrationRestService', AccountsRestService);

function AccountsRestService($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/registration', {}, {
    'save':   {method: 'POST'}
  });
}
