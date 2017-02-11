namespace profitelo.services.searchUrl {

  import ISearchQueryParams = profitelo.services.search.ISearchQueryParams
  import ISearchService = profitelo.services.search.ISearchService

  export interface ISearchUrlService {
    parseParamsForUrl(rawParams: Object): {[key: string]: string}
  }

  class SearchUrlService implements ISearchUrlService {

    private defaultQueryParams: ISearchQueryParams

    constructor(searchService: ISearchService) {
      this.defaultQueryParams = {}
      searchService.defineQueryProperties(this.defaultQueryParams)
    }

    public parseParamsForUrl = (rawParams: any) => {
      const result: {
        [key: string]: string
      } = {}

      angular.forEach(Object.keys(this.defaultQueryParams), (fieldName) => {
        if (fieldName !== 'offset' && fieldName !== 'limit' && rawParams.hasOwnProperty(fieldName) &&
          rawParams[fieldName] !== (<any>this.defaultQueryParams)[fieldName]) {
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


