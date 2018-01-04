import { Injectable } from '@angular/core';
import { SessionApi } from 'profitelo-api-ng4/api/api';
import { GetSession, AccountLogin } from 'profitelo-api-ng4/model/models';
import { DefaultQueryEncoder } from '../../../shared/providers/default-query-encoder/default-query-encoder.provider';
import { getHttpHeadersOrInit, HttpInterceptorService, RequestInterceptor } from 'ng-http-interceptor';
import { Interceptable } from 'ng-http-interceptor';

@Injectable()
export class SessionService {

  private sessionCache?: Promise<GetSession>;
  private apiKeyKey: string = 'X-Api-Key';
  private httpLoginInterceptor: Interceptable<RequestInterceptor>;
  private readonly unauthorizedCode: number = 401;

  constructor(private sessionApi: SessionApi,
              private httpInterceptor: HttpInterceptorService) {
  }

  public logout = (): Promise<any> =>
    this.sessionApi.logoutCurrentRoute(undefined, { withCredentials: true })
      .toPromise().then(this.onSuccessLogout, this.onFailureLogout)

  public login = (loginDetails: AccountLogin): Promise<GetSession> =>
    this.sessionApi.login(
      loginDetails,
      new DefaultQueryEncoder(),
      { withCredentials: true }
    ).toPromise().then(this.onSuccessLogin)

  private getSessionFromBackend = (): Promise<GetSession> => {
    const defaultQueryEncoder = new DefaultQueryEncoder();
    this.sessionCache = this.sessionApi.checkRoute(
      defaultQueryEncoder,
      { withCredentials: true }
    ).toPromise().then(this.onSuccessLogin);
    return this.sessionCache;
  }

  public getSession = (force: boolean = false): Promise<GetSession> => {
    if (force) {
      this.sessionCache = this.getSessionFromBackend();
      return this.sessionCache;
    }
    else {
      if (typeof this.sessionCache !== 'undefined') {
        return this.sessionCache;
      }
      else {
        return this.getSessionFromBackend();
      }
    }
  }

  private onSuccessLogin = (session: GetSession): GetSession => {
    this.sessionCache = Promise.resolve(session);
    this.setApiKeyHeader(session.apiKey);

    return session;
  }

  private onSuccessLogout = (): void => {
    this.sessionCache = undefined;
    this.httpInterceptor.request().removeInterceptor(<any>this.httpLoginInterceptor);
  }

  private onFailureLogout = (err: any): void => {
    if (err && err.status === this.unauthorizedCode) {
      // user is already logged out so lets do the cache cleanup
      this.onSuccessLogout();
    }
  }

  private setApiKeyHeader = (apiKey: string): void => {
    const interceptor: RequestInterceptor = (data: any[], method: string): any[] => {
      const headers = getHttpHeadersOrInit(data, method);
      headers.set(this.apiKeyKey, apiKey);
      return data;
    };
    this.httpLoginInterceptor = this.httpInterceptor.request().addInterceptor(interceptor);
  }

  public isLoggedIn(): boolean {
    return typeof this.sessionCache !== 'undefined';
  }
}
