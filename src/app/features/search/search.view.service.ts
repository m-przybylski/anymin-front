import { Injectable } from '@angular/core';
import { GetSearchRequestResult, GetSuggestedTags, PostSuggestTags, SearchService } from '@anymind-ng/api';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Config } from 'config';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import * as fromRoot from '@platform/reducers';
import { Params } from '@angular/router';

export interface ISearchResults {
  suggestionTags: ReadonlyArray<string>;
  searchResultsConsultations: ReadonlyArray<GetSearchRequestResult>;
  currentQueryParams: Params;
}

@Injectable()
export class SearchViewService extends Logger {
  private readonly currency = 'PLN';

  constructor(
    private searchService: SearchService,
    private store: Store<fromRoot.IState>,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('SearchViewService'));
  }

  public sendQueryTagSuggestion(body: PostSuggestTags): Observable<GetSuggestedTags> {
    return this.searchService
      .postTagsSuggestionsRoute(body)
      .pipe(catchError(error => this.handleRequestError('Can not send tags suggestions: ', error)));
  }

  public getSearchResult(
    query: string,
    tags: ReadonlyArray<string>,
    showOnlyAvailable = false,
    offset: number,
  ): Observable<ReadonlyArray<GetSearchRequestResult>> {
    return this.searchService
      .postSearchRoute({
        query,
        tags,
        offset,
        price: [{ currency: this.currency, min: 0 }],
        count: Config.search.querySearchViewResponseLimit,
        showOnlyAvailable,
      })
      .pipe(catchError(error => this.handleRequestError('Can not get search results: ', error)));
  }

  public getLoggedInStatus(): Observable<boolean> {
    return this.store.pipe(select(fromCore.getLoggedIn)).pipe(map(response => response.isLoggedIn));
  }

  public updateSearchResults(
    queryParams: Params,
    showOnlyAvailable: boolean,
    offset: number,
  ): Observable<ISearchResults> {
    const tagList = queryParams.tags[0] ? queryParams.tags : [];

    return forkJoin(
      this.sendQueryTagSuggestion({ query: queryParams.query, tags: tagList }),
      this.getSearchResult(queryParams.query, tagList, showOnlyAvailable, offset),
    ).pipe(
      map(([suggestionTags, searchResultsConsultations]) => ({
        suggestionTags: suggestionTags.tags,
        searchResultsConsultations,
        currentQueryParams: queryParams,
      })),
    );
  }

  private handleRequestError(msg: string, err: HttpErrorResponse): Observable<never> {
    this.loggerService.error(msg, err);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return EMPTY;
  }
}
