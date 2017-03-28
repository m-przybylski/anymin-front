import * as angular from 'angular'
import {ISearchQueryParams, SearchService} from '../search/search.service'

export class SearchUrlService {

  private defaultQueryParams: ISearchQueryParams

  /* @ngInject */
  constructor(searchService: SearchService) {
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
