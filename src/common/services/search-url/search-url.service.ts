import ISearchQueryParams = profitelo.services.search.ISearchQueryParams
import ISearchService = profitelo.services.search.ISearchService

namespace profitelo.services.searchUrl {

  export interface ISearchUrlService {
    parseParamsForUrl(rawParams: Object): ISearchQueryParams
  }

  class SearchUrlService implements ISearchUrlService {

    private defaultQueryParams: ISearchQueryParams

    constructor(searchService: ISearchService) {
      this.defaultQueryParams = {}
      searchService.defineQueryProperties(this.defaultQueryParams)
    }

    public parseParamsForUrl = (rawParams) => {
      const result = {}
      angular.forEach(Object.keys(this.defaultQueryParams), (fieldName) => {
        if (fieldName !== 'offset' && fieldName !== 'limit' && rawParams.hasOwnProperty(fieldName) &&
          rawParams[fieldName] !== this.defaultQueryParams[fieldName]) {
          result[fieldName] = rawParams[fieldName]
        }
      })
      return result
    }
  }

  angular.module('profitelo.services.search-url', [
    'profitelo.swaggerResources'
  ]).service('searchUrlService', SearchUrlService)
}


