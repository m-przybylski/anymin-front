function filesApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/files', null, {
    'get':    {method: 'GET', isArray: false}
  })
}

function filesTokenApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/files/:token', {token: '@token'}, {
    'get':    {method: 'GET', isArray: false},
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'update': {method: 'PUT'},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
  })
}

function filesGetTokenApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/files/token', null, {
    'get':    {method: 'GET', isArray: false}
  })
}

function filesUploadApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/files/:token/upload', {token: '@token'}, {
    'save':    {method: 'POST'}
  })
}

// function files($resource, CommonSettingsService) {
//   return $resource(CommonSettingsService.get('apiUrl') + '/files/:token/download/:width/:height" + ', null, {
//     'save':    {method: 'POST'}
//   })
// }

angular.module('profitelo.api.files', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('FilesApi', filesApi)
.factory('FilesTokenApi', filesTokenApi)
.factory('FilesGetTokenApi', filesTokenApi)
.factory('FilesUploadApi', filesUploadApi)

// Depricated in new version (it will has sizes of downloaded files in meta properties of object)
// .factory('FilesDownloadApi', filesDownloadApi)
