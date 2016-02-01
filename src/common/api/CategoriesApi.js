function categoriesApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/categories/:id', {id: '@id'}, {
    'get': {method: 'GET', isArray: true}
  })
}

function categoriesSubcategoriesApi($resource, CommonSettingsService) {
  return $resource(CommonSettingsService.get('apiUrl') + '/categories/:id/subcategories', {id: '@id'}, {
    'get': {method: 'GET', isArray: true}
  })
}

angular.module('profitelo.api.categories', [
  'ngResource',
  'profitelo.services.commonSettings'
])
.factory('CategoriesApi', categoriesApi)
.factory('CategoriesSubcategoriesApi', categoriesSubcategoriesApi)
