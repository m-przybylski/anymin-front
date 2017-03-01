namespace profitelo.api {
  export interface IRegistrationApi {
    confirmVerificationRoute(body: VerificationConfirmation, extraHttpRequestParams?: any): ng.IPromise<GetSession>
    requestVerificationRoute(body: VerificationRequest, extraHttpRequestParams?: any): ng.IPromise<GetRegistrationSession>
    verifyVerificationRoute(body: VerificationConfirmation, extraHttpRequestParams?: any): ng.IPromise<{}>
  }

  /* istanbul ignore next */
  class RegistrationApi implements IRegistrationApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public confirmVerificationRoute = (body: VerificationConfirmation, extraHttpRequestParams?: any): ng.IPromise<GetSession> => {
          const localVarPath = this.apiUrl + '/msisdns/code';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling confirmVerificationRoute.');
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
      public requestVerificationRoute = (body: VerificationRequest, extraHttpRequestParams?: any): ng.IPromise<GetRegistrationSession> => {
          const localVarPath = this.apiUrl + '/msisdns/verify';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling requestVerificationRoute.');
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
      public verifyVerificationRoute = (body: VerificationConfirmation, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/msisdns/verify/code';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling verifyVerificationRoute.');
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

  export interface IRegistrationApiMock {
    confirmVerificationRoute(status: number, data?: GetSession, err?: any): void
    requestVerificationRoute(status: number, data?: GetRegistrationSession, err?: any): void
    verifyVerificationRoute(status: number, data?: {}, err?: any): void
  }

  /* istanbul ignore next */
  class RegistrationApiMock implements IRegistrationApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    confirmVerificationRoute(status: number, data?: GetSession, err?: any): void {
      const localVarPath = this.apiUrl + '/msisdns/code';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    requestVerificationRoute(status: number, data?: GetRegistrationSession, err?: any): void {
      const localVarPath = this.apiUrl + '/msisdns/verify';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    verifyVerificationRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/msisdns/verify/code';

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

  angular.module('profitelo.api.RegistrationApi', [])
    .service('RegistrationApi', RegistrationApi)
    .service('RegistrationApiMock', RegistrationApiMock)
}
