namespace profitelo.api {
  export interface IFinancesApi {
    getClientBalanceRoute(extraHttpRequestParams?: any): ng.IPromise<MoneyDto>
    getClientTransactionsRoute(extraHttpRequestParams?: any): ng.IPromise<Array<FinancialOperation>>
  }

  /* istanbul ignore next */
  class FinancesApi implements IFinancesApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public getClientBalanceRoute = (extraHttpRequestParams?: any): ng.IPromise<MoneyDto> => {
          const localVarPath = this.apiUrl + '/finances/client/balance';

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
      public getClientTransactionsRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<FinancialOperation>> => {
          const localVarPath = this.apiUrl + '/finances/client/transactions';

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

  export interface IFinancesApiMock {
    getClientBalanceRoute(status: number, data?: MoneyDto, err?: any): void
    getClientTransactionsRoute(status: number, data?: Array<FinancialOperation>, err?: any): void
  }

  /* istanbul ignore next */
  class FinancesApiMock implements IFinancesApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    getClientBalanceRoute(status: number, data?: MoneyDto, err?: any): void {
      const localVarPath = this.apiUrl + '/finances/client/balance';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getClientTransactionsRoute(status: number, data?: Array<FinancialOperation>, err?: any): void {
      const localVarPath = this.apiUrl + '/finances/client/transactions';

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

  angular.module('profitelo.api.FinancesApi', [])
    .service('FinancesApi', FinancesApi)
    .service('FinancesApiMock', FinancesApiMock)
}
