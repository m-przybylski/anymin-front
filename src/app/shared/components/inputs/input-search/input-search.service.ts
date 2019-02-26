import { Injectable } from '@angular/core';
import { GetSuggestedQueries, SearchService } from '@anymind-ng/api';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Config } from 'config';

@Injectable()
export class InputSearchService extends Logger {
  constructor(private searchService: SearchService, private alertService: AlertService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('InputSearchService'));
  }

  public searchQuerySuggestions(query: string): Observable<GetSuggestedQueries> {
    return this.searchService
      .postQueriesSuggestionsRoute({ query, count: Config.search.queryResponseLimit })
      .pipe(catchError(error => this.handleRequestError('Can not get query suggestions: ', error)));
  }

  private handleRequestError(msg: string, err: HttpErrorResponse): Observable<never> {
    this.loggerService.error(msg, err);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return EMPTY;
  }
}
