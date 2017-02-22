namespace profitelo.api {
  export interface IRatelApi {
    getRatelAuthConfigRoute(serviceId?: string, extraHttpRequestParams?: any): ng.IPromise<SignedAgent>
    ratelCallStartedHookRoute(body: CallStartedHook, extraHttpRequestParams?: any): ng.IPromise<{}>
    ratelCallStoppedHookRoute(body: CallStoppedHook, extraHttpRequestParams?: any): ng.IPromise<{}>
  }

  /* istanbul ignore next */
  class RatelApi implements IRatelApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public getRatelAuthConfigRoute = (serviceId?: string, extraHttpRequestParams?: any): ng.IPromise<SignedAgent> => {
          const localVarPath = this.apiUrl + '/ratel/config';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          if (serviceId !== undefined) {
              queryParameters['serviceId'] = serviceId;
          }

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
      public ratelCallStartedHookRoute = (body: CallStartedHook, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/ratel/hook/start';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling ratelCallStartedHookRoute.');
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
      public ratelCallStoppedHookRoute = (body: CallStoppedHook, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/ratel/hook/stop';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling ratelCallStoppedHookRoute.');
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
  }

  export interface IRatelApiMock {
    getRatelAuthConfigRoute(status: number, serviceId?: string, data?: SignedAgent, err?: any): void
    ratelCallStartedHookRoute(status: number, data?: {}, err?: any): void
    ratelCallStoppedHookRoute(status: number, data?: {}, err?: any): void
  }

  /* istanbul ignore next */
  class RatelApiMock implements IRatelApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    getRatelAuthConfigRoute(status: number, serviceId?: string, data?: SignedAgent, err?: any): void {
      const localVarPath = this.apiUrl + '/ratel/config';

      const queryParameters: any = {}
      if (serviceId !== undefined) {
        queryParameters['serviceId'] = serviceId;
      }
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    ratelCallStartedHookRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/ratel/hook/start';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    ratelCallStoppedHookRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/ratel/hook/stop';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
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

  angular.module('profitelo.api.RatelApi', [])
    .service('RatelApi', RatelApi)
    .service('RatelApiMock', RatelApiMock)
}
