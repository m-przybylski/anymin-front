angular.module('profitelo.api.industry', [
  'ngResource',
  'profitelo.services.commonSettings'
])

.factory('IndustryApi', IndustryApi)

function IndustryApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/industries', {}, {
    'save':       {method: 'POST'},
    'get':        {method: 'GET'}
  })
}
