namespace profitelo.api {
  export interface IRatelApi {
    getRatelAuthConfigRoute (serviceId?: string, extraHttpRequestParams?: any ) : ng.IPromise<SignedAgent>
    ratelCallStartedHookRoute (body: CallStartedHook, extraHttpRequestParams?: any ) : ng.IPromise<{}>
    ratelCallStoppedHookRoute (body: CallStoppedHook, extraHttpRequestParams?: any ) : ng.IPromise<{}>
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

      public getRatelAuthConfigRoute = (serviceId?: string, extraHttpRequestParams?: any ) : ng.IPromise<SignedAgent> => {
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
      public ratelCallStartedHookRoute = (body: CallStartedHook, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
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
      public ratelCallStoppedHookRoute = (body: CallStoppedHook, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
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

  angular.module('profitelo.api.RatelApi', []).service('RatelApi', RatelApi)
}
