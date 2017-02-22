namespace profitelo.api {
  export interface IConfigApi {
    getSupportedLanguagesRoute(extraHttpRequestParams?: any): ng.IPromise<Array<Language>>
    getSupportedPhonePrefixesRoute(extraHttpRequestParams?: any): ng.IPromise<Array<PhonePrefix>>
  }

  /* istanbul ignore next */
  class ConfigApi implements IConfigApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public getSupportedLanguagesRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<Language>> => {
          const localVarPath = this.apiUrl + '/config/languages';

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
      public getSupportedPhonePrefixesRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<PhonePrefix>> => {
          const localVarPath = this.apiUrl + '/config/phone-prefixes';

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
  }

  export interface IConfigApiMock {
    getSupportedLanguagesRoute(status: number, data?: Array<Language>, err?: any): void
    getSupportedPhonePrefixesRoute(status: number, data?: Array<PhonePrefix>, err?: any): void
  }

  /* istanbul ignore next */
  class ConfigApiMock implements IConfigApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    getSupportedLanguagesRoute(status: number, data?: Array<Language>, err?: any): void {
      const localVarPath = this.apiUrl + '/config/languages';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getSupportedPhonePrefixesRoute(status: number, data?: Array<PhonePrefix>, err?: any): void {
      const localVarPath = this.apiUrl + '/config/phone-prefixes';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
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

  angular.module('profitelo.api.ConfigApi', [])
    .service('ConfigApi', ConfigApi)
    .service('ConfigApiMock', ConfigApiMock)
}
