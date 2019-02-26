import { Injectable } from '@angular/core';
import { GetSearchRequestResult, GetSuggestedTags, PostSuggestTags, SearchService } from '@anymind-ng/api';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Config } from 'config';

@Injectable({
  providedIn: 'root',
})
export class SearchViewService extends Logger {
  private readonly currency = 'PLN';
  constructor(private searchService: SearchService, private alertService: AlertService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('SearchViewService'));
  }

  public sendQueryTagSuggestion(body: PostSuggestTags): Observable<GetSuggestedTags> {
    return this.searchService
      .postTagsSuggestionsRoute(body)
      .pipe(catchError(error => this.handleRequestError('Can not send tags suggestions: ', error)));
  }

  public getSearchResult(
    query: string,
    tags: ReadonlyArray<string> = [],
  ): Observable<ReadonlyArray<GetSearchRequestResult>> {
    return this.searchService
      .postSearchRoute({
        query,
        tags,
        price: [{ currency: this.currency, min: 0 }],
        count: Config.search.querySearchViewResponseLimit,
        showOnlyAvailable: false,
      })
      .pipe(catchError(error => this.handleRequestError('Can not get search results: ', error)));
  }

  private handleRequestError(msg: string, err: HttpErrorResponse): Observable<never> {
    this.loggerService.error(msg, err);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return EMPTY;
  }
}
