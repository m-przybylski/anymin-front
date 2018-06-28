// tslint:disable:newline-before-return
import { SearchQueryParams } from './search-query-params';
import {
  GetSearchRequestResult, PostSuggestTags, PostSearchRequest,
  GetSuggestedQueries, PostSuggestQueries, GetSuggestedTags
} from 'profitelo-api-ng/model/models';
import { SearchApi } from 'profitelo-api-ng/api/api';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
// tslint:disable:member-ordering
export class SearchService {

  private static readonly suggestedTagsCounter = 20;
  private static readonly suggestedQueriesCounter = 5;

  public static $inject = ['SearchApi', 'errorHandler'];

    constructor(private SearchApi: SearchApi, private errorHandler: ErrorHandlerService) {
  }

  public search = (queryParams: SearchQueryParams): ng.IPromise<GetSearchRequestResult[]> => {
    const promise = this.SearchApi.postSearchRoute(this.generatePostSearchRequest(queryParams));
    promise.catch(this.errorHandler.handleServerError);
    return promise;
  }

  public querySuggestions = (queryParam: string): ng.IPromise<void | GetSuggestedQueries> => {
    const params: PostSuggestQueries = {
      query: queryParam,
      count: SearchService.suggestedQueriesCounter
    };
    return this.SearchApi.postQueriesSuggestionsRoute(params)
    .catch(this.errorHandler.handleServerError);
  }

  public querySuggestedTags = (
    query: string,
    tags: string[] = [],
    count = SearchService.suggestedTagsCounter): ng.IPromise<GetSuggestedTags> => {

      const params: PostSuggestTags = {
      query,
      tags,
      count
    };
    const promise = this.SearchApi.postTagsSuggestionsRoute(params);
    promise.catch(this.errorHandler.handleServerError);
    return promise;
  }

  public loadMore = (queryParams: SearchQueryParams): ng.IPromise<GetSearchRequestResult[]> => {
    queryParams.setOffset(queryParams.getOffset() + queryParams.getCount());
    const promise = this.SearchApi.postSearchRoute(this.generatePostSearchRequest(queryParams));
    promise.catch((error) => {
      this.handleLoadMoreError(queryParams, error);
    });
    return promise;
  }

  private handleLoadMoreError = (queryParams: SearchQueryParams, _error: Error): void => {
    queryParams.setOffset(queryParams.getOffset() - queryParams.getCount());
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
