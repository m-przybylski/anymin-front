function service(searchService) {

  const _defaultQueryParams = {}
  searchService.defineQueryProperties(_defaultQueryParams)
  console.log(_defaultQueryParams)


  const _parseParamsForUrl = (rawParams) => {
    const result = {}
    angular.forEach(Object.keys(_defaultQueryParams), (fieldName) => {
      if (fieldName !== 'offset' && fieldName !== 'limit' && rawParams.hasOwnProperty(fieldName) &&
        rawParams[fieldName] !== _defaultQueryParams[fieldName]) {
        result[fieldName] = rawParams[fieldName]
      }
    })
    return result
  }

  return {
    parseParamsForUrl: _parseParamsForUrl
  }
}


angular.module('profitelo.services.search-url', [
  'profitelo.swaggerResources',
]).service('searchUrlService', service)
