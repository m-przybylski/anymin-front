namespace profitelo.api {
  export interface IRecoverPasswordApi {
    postRecoverPasswordRoute(body: PostRecoverPassword, extraHttpRequestParams?: any): ng.IPromise<JValue>
    postRecoverPasswordVerifyEmailRoute(body: PostRecoverPasswordVerifyEmailToken, extraHttpRequestParams?: any): ng.IPromise<{}>
    postRecoverPasswordVerifyMsisdnRoute(body: PostRecoverPasswordVerifyMsisdnToken, extraHttpRequestParams?: any): ng.IPromise<{}>
    putRecoverPasswordEmailRoute(body: PutRecoverPasswordEmail, extraHttpRequestParams?: any): ng.IPromise<{}>
    putRecoverPasswordMsisdnRoute(body: PutRecoverPasswordMsisdn, extraHttpRequestParams?: any): ng.IPromise<{}>
  }

  /* istanbul ignore next */
  class RecoverPasswordApi implements IRecoverPasswordApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public postRecoverPasswordRoute = (body: PostRecoverPassword, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/recover-password';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postRecoverPasswordRoute.');
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
      public postRecoverPasswordVerifyEmailRoute = (body: PostRecoverPasswordVerifyEmailToken, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/recover-password/verify/email';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postRecoverPasswordVerifyEmailRoute.');
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
      public postRecoverPasswordVerifyMsisdnRoute = (body: PostRecoverPasswordVerifyMsisdnToken, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/recover-password/verify/msisdn';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postRecoverPasswordVerifyMsisdnRoute.');
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
      public putRecoverPasswordEmailRoute = (body: PutRecoverPasswordEmail, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/recover-password/email';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling putRecoverPasswordEmailRoute.');
          }
          let httpRequestParams: ng.IRequestConfig = {
              method: 'PUT',
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
      public putRecoverPasswordMsisdnRoute = (body: PutRecoverPasswordMsisdn, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/recover-password/msisdn';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling putRecoverPasswordMsisdnRoute.');
          }
          let httpRequestParams: ng.IRequestConfig = {
              method: 'PUT',
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

  export interface IRecoverPasswordApiMock {
    postRecoverPasswordRoute(status: number, data?: JValue, err?: any): void
    postRecoverPasswordVerifyEmailRoute(status: number, data?: {}, err?: any): void
    postRecoverPasswordVerifyMsisdnRoute(status: number, data?: {}, err?: any): void
    putRecoverPasswordEmailRoute(status: number, data?: {}, err?: any): void
    putRecoverPasswordMsisdnRoute(status: number, data?: {}, err?: any): void
  }

  /* istanbul ignore next */
  class RecoverPasswordApiMock implements IRecoverPasswordApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    postRecoverPasswordRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/recover-password';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postRecoverPasswordVerifyEmailRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/recover-password/verify/email';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postRecoverPasswordVerifyMsisdnRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/recover-password/verify/msisdn';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    putRecoverPasswordEmailRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/recover-password/email';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    putRecoverPasswordMsisdnRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/recover-password/msisdn';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
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

  angular.module('profitelo.api.RecoverPasswordApi', [])
    .service('RecoverPasswordApi', RecoverPasswordApi)
    .service('RecoverPasswordApiMock', RecoverPasswordApiMock)
}
