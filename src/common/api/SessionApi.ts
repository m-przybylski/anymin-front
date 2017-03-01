namespace profitelo.api {
  export interface ISessionApi {
    checkRoute(extraHttpRequestParams?: any): ng.IPromise<GetSession>
    getSessionsRoute(extraHttpRequestParams?: any): ng.IPromise<Array<GetSession>>
    login(body: AccountLogin, extraHttpRequestParams?: any): ng.IPromise<GetSession>
    logoutCurrentRoute(extraHttpRequestParams?: any): ng.IPromise<JValue>
    logoutRoute(apiKey: string, extraHttpRequestParams?: any): ng.IPromise<JValue>
  }

  /* istanbul ignore next */
  class SessionApi implements ISessionApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public checkRoute = (extraHttpRequestParams?: any): ng.IPromise<GetSession> => {
          const localVarPath = this.apiUrl + '/session';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          let httpRequestParams: ng.IRequestConfig = {
              method: 'GET',
              url: localVarPath,
                                          params: queryParameters,
              headers: this.defaultHeaders //headerParams
          };

          if (extraHttpRequestParams) {
              throw new Error('extraHttpRequestParams not supported')
              //httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
          }

          return this.$http(httpRequestParams).then(response => {
            if (typeof response.data !== 'undefined') {
              return response.data
            }
            else {
              throw new Error('Response was not defined')
            }
          });
      }
      public getSessionsRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<GetSession>> => {
          const localVarPath = this.apiUrl + '/session/list';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          let httpRequestParams: ng.IRequestConfig = {
              method: 'GET',
              url: localVarPath,
                                          params: queryParameters,
              headers: this.defaultHeaders //headerParams
          };

          if (extraHttpRequestParams) {
              throw new Error('extraHttpRequestParams not supported')
              //httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
          }

          return this.$http(httpRequestParams).then(response => {
            if (typeof response.data !== 'undefined') {
              return response.data
            }
            else {
              throw new Error('Response was not defined')
            }
          });
      }
      public login = (body: AccountLogin, extraHttpRequestParams?: any): ng.IPromise<GetSession> => {
          const localVarPath = this.apiUrl + '/session';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling login.');
          }
          let httpRequestParams: ng.IRequestConfig = {
              method: 'POST',
              url: localVarPath,
              data: body,
                            params: queryParameters,
              headers: this.defaultHeaders //headerParams
          };

          if (extraHttpRequestParams) {
              throw new Error('extraHttpRequestParams not supported')
              //httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
          }

          return this.$http(httpRequestParams).then(response => {
            if (typeof response.data !== 'undefined') {
              return response.data
            }
            else {
              throw new Error('Response was not defined')
            }
          });
      }
      public logoutCurrentRoute = (extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/session';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          let httpRequestParams: ng.IRequestConfig = {
              method: 'DELETE',
              url: localVarPath,
                                          params: queryParameters,
              headers: this.defaultHeaders //headerParams
          };

          if (extraHttpRequestParams) {
              throw new Error('extraHttpRequestParams not supported')
              //httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
          }

          return this.$http(httpRequestParams).then(response => {
            if (typeof response.data !== 'undefined') {
              return response.data
            }
            else {
              throw new Error('Response was not defined')
            }
          });
      }
      public logoutRoute = (apiKey: string, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/session/{apiKey}'
              .replace('{' + 'ApiKey' + '}', String(apiKey));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'apiKey' is not null or undefined
          if (apiKey === null || apiKey === undefined) {
              throw new Error('Required parameter apiKey was null or undefined when calling logoutRoute.');
          }
          let httpRequestParams: ng.IRequestConfig = {
              method: 'DELETE',
              url: localVarPath,
                                          params: queryParameters,
              headers: this.defaultHeaders //headerParams
          };

          if (extraHttpRequestParams) {
              throw new Error('extraHttpRequestParams not supported')
              //httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
          }

          return this.$http(httpRequestParams).then(response => {
            if (typeof response.data !== 'undefined') {
              return response.data
            }
            else {
              throw new Error('Response was not defined')
            }
          });
      }
  }

  export interface ISessionApiMock {
    checkRoute(status: number, data?: GetSession, err?: any): void
    getSessionsRoute(status: number, data?: Array<GetSession>, err?: any): void
    login(status: number, data?: GetSession, err?: any): void
    logoutCurrentRoute(status: number, data?: JValue, err?: any): void
    logoutRoute(status: number, apiKey: string, data?: JValue, err?: any): void
  }

  /* istanbul ignore next */
  class SessionApiMock implements ISessionApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    checkRoute(status: number, data?: GetSession, err?: any): void {
      const localVarPath = this.apiUrl + '/session';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getSessionsRoute(status: number, data?: Array<GetSession>, err?: any): void {
      const localVarPath = this.apiUrl + '/session/list';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    login(status: number, data?: GetSession, err?: any): void {
      const localVarPath = this.apiUrl + '/session';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    logoutCurrentRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/session';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    logoutRoute(status: number, apiKey: string, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/session/{apiKey}'
          .replace('{' + 'ApiKey' + '}', String(apiKey));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }

    private serializeQuery = (obj: any) => {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      const url = str.join("&")
      return (url.length >0) ? '?'+url : ''
    }
  }

  angular.module('profitelo.api.SessionApi', [])
    .service('SessionApi', SessionApi)
    .service('SessionApiMock', SessionApiMock)
}
