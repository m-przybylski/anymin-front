import {GetSession, AccountLogin} from 'profitelo-api-ng/model/models'
import {SessionApi} from 'profitelo-api-ng/api/api'

export class SessionService {

  private sessionCache?: ng.IPromise<GetSession>
  private apiKeyKey: string = 'X-Api-Key'

  /* @ngInject */
  constructor(private SessionApi: SessionApi,
              private $http: ng.IHttpService) {
  }

  public logout = (): ng.IPromise<void> => {
    return this.SessionApi.logoutCurrentRoute().then(this.onSuccessLogout)
  }

  public login = (loginDetails: AccountLogin): ng.IPromise<GetSession> => {

    return this.SessionApi.login(loginDetails).then(this.onSuccessLogin)
  }

  private getSessionFromBackend = (): ng.IPromise<GetSession> => {
    this.sessionCache = this.SessionApi.checkRoute().then(this.onSuccessLogin)
    return this.sessionCache
  }

  public getSession = (force: boolean = false): ng.IPromise<GetSession> => {
    if (force) {
      this.sessionCache = this.getSessionFromBackend()
      return this.sessionCache
    }
    else {
      if (typeof this.sessionCache !== 'undefined') {
        return this.sessionCache
      }
      else {
        return this.getSessionFromBackend()
      }
    }
  }

  private onSuccessLogin = (session: GetSession): GetSession => {
    this.setApiKeyHeader(session.apiKey)

    return session
  }

  private onSuccessLogout = () => {
    this.sessionCache = undefined
    delete this.$http.defaults.headers!.common[this.apiKeyKey]
  }

  private setApiKeyHeader = (apiKey: string) => {
    this.$http.defaults.headers!.common[this.apiKeyKey] = apiKey
  }

  public static $get(SessionApi: SessionApi, $http: ng.IHttpService) {
    return new SessionService(SessionApi, $http)
  }
}
