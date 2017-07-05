import {SearchQueryParams} from './search-query-params'
import {
  GetSearchQueryResult, PostSearchQuery, PostSuggestTags,
  GetSuggestedQueries, PostSuggestQueries
} from 'profitelo-api-ng/model/models'
import {SearchApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../error-handler/error-handler.service'
export class SearchService {

  private readonly count = 10

  /* @ngInject */
  constructor(private SearchApi: SearchApi, private errorHandler: ErrorHandlerService) {
  }

  public search = (queryParams: SearchQueryParams): ng.IPromise<GetSearchQueryResult[]> => {
    queryParams.setOffset(0)
    queryParams.setCount(this.count)
    return this.SearchApi.postSearchRoute(this.parseClassToQueryParamsObject(queryParams))
    .catch(this.errorHandler.handleServerError)
  }

  public querySuggestions = (queryParam: string): ng.IPromise<GetSuggestedQueries> => {
    const params: PostSuggestQueries = {
      query: queryParam
    }
    return this.SearchApi.postQueriesSuggestionsRoute(params)
    .catch(this.errorHandler.handleServerError)
  }

  public queryTags = (queryParams: SearchQueryParams): ng.IPromise<GetSuggestedQueries> => {
    const params: PostSuggestTags = {
      query: queryParams.getQuery(),
      tags: queryParams.getTags()
    }
    return this.SearchApi.postTagsSuggestionsRoute(params)
    .catch(this.errorHandler.handleServerError)
  }

  public loadMore = (queryParams: SearchQueryParams) => {
    queryParams.setCount(this.count)
    queryParams.setOffset(queryParams.getOffset() + queryParams.getCount())
    return this.SearchApi.postSearchRoute(this.parseClassToQueryParamsObject(queryParams))
    .catch(this.errorHandler.handleServerError)
  }

  private parseClassToQueryParamsObject = (queryParams: SearchQueryParams): PostSearchQuery => {
    return {
      query: queryParams.getQuery(),
      price: queryParams.getPrice(),
      languages: queryParams.getLanguages(),
      serviceType: queryParams.getServiceType(),
      tags: queryParams.getTags(),
      offset: queryParams.getOffset(),
      count: queryParams.getCount()
    }
  }

}
