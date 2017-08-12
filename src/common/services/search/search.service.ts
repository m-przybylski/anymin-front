import {SearchQueryParams} from './search-query-params'
import {
  GetSearchRequestResult, PostSuggestTags, PostSearchRequest,
  GetSuggestedQueries, PostSuggestQueries
} from 'profitelo-api-ng/model/models'
import {SearchApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../error-handler/error-handler.service'
export class SearchService {

  private static readonly suggestedTagsCounter: number = 20

  /* @ngInject */
  constructor(private SearchApi: SearchApi, private errorHandler: ErrorHandlerService) {
  }

  public search = (queryParams: SearchQueryParams): ng.IPromise<GetSearchRequestResult[]> =>
    this.SearchApi.postSearchRoute(this.generatePostSearchRequest(queryParams))
    .catch(this.errorHandler.handleServerError)

  public querySuggestions = (queryParam: string): ng.IPromise<GetSuggestedQueries> => {
    const params: PostSuggestQueries = {
      query: queryParam
    }
    return this.SearchApi.postQueriesSuggestionsRoute(params)
    .catch(this.errorHandler.handleServerError)
  }

  public querySuggestedTags = (
    query: string,
    tags: string[] = [],
    count: number = SearchService.suggestedTagsCounter): ng.IPromise<GetSuggestedQueries> => {

      const params: PostSuggestTags = {
      query,
      tags,
      count
    }
    return this.SearchApi.postTagsSuggestionsRoute(params)
    .catch(this.errorHandler.handleServerError)
  }

  public loadMore = (queryParams: SearchQueryParams): ng.IPromise<GetSearchRequestResult[]> => {
    queryParams.setOffset(queryParams.getOffset() + queryParams.getCount())
    return this.SearchApi.postSearchRoute(this.generatePostSearchRequest(queryParams))
    .catch((error) => {
      this.handleLoadMoreError(queryParams, error)
    })
  }

  private handleLoadMoreError = (queryParams: SearchQueryParams, _error: Error): void => {
    queryParams.setOffset(queryParams.getOffset() - queryParams.getCount())
  }

  private generatePostSearchRequest = (queryParams: SearchQueryParams): PostSearchRequest => ({
    query: queryParams.getQuery(),
    price: queryParams.getPrice(),
    languages: queryParams.getLanguages(),
    serviceType: queryParams.getServiceType(),
    tags: queryParams.getTags(),
    offset: queryParams.getOffset(),
    count: queryParams.getCount()
  })

}
