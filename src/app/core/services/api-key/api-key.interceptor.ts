// tslint:disable:no-any
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { Config } from '../../../../config';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

interface IHeaders {
  [key: string]: string;
}

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromCore.IState>) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.getApiKey().pipe(
      this.mapApiKeyToHeaders(),
      this.handleNext(request, next),
    );
  }

  private buildHeaders(apiKey: string | undefined): IHeaders {
    const headers: IHeaders = {};
    if (apiKey !== undefined) {
      headers[Config.http.apiHeader] = apiKey;
    }

    return headers;
  }

  private mapApiKeyToHeaders(): (source: Observable<string | undefined>) => Observable<IHeaders> {
    return (source: Observable<string | undefined>): Observable<IHeaders> =>
      source.pipe(map(this.buildHeaders.bind(this)));
  }

  private handleNext(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): (source: Observable<IHeaders>) => Observable<HttpEvent<any>> {
    return (source: Observable<IHeaders>): Observable<HttpEvent<any>> =>
      source.pipe(mergeMap(setHeaders => next.handle(request.clone({ setHeaders }))));
  }

  private getApiKey(): Observable<string | undefined> {
    return this.store.pipe(
      select(fromCore.getSession),
      map(getSessionWithAccount => getSessionWithAccount && getSessionWithAccount.session.apiKey),
      take(1),
    );
  }
}
