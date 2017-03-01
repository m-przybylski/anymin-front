namespace profitelo.api {
  export interface IPayoutsApi {
    deletePayPalAccountPayoutMethodRoute(extraHttpRequestParams?: any): ng.IPromise<JValue>
    getPayoutMethodsRoute(extraHttpRequestParams?: any): ng.IPromise<PayoutMethodsDto>
    postPayPalAccountPayoutMethodRoute(body: PayPalAccountDto, extraHttpRequestParams?: any): ng.IPromise<JValue>
    putPayPalAccountPayoutMethodRoute(body: PayPalAccountDto, extraHttpRequestParams?: any): ng.IPromise<JValue>
  }

  /* istanbul ignore next */
  class PayoutsApi implements IPayoutsApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public deletePayPalAccountPayoutMethodRoute = (extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payouts/payout-methods/paypal-account';

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
      public getPayoutMethodsRoute = (extraHttpRequestParams?: any): ng.IPromise<PayoutMethodsDto> => {
          const localVarPath = this.apiUrl + '/payouts/payout-methods';

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
      public postPayPalAccountPayoutMethodRoute = (body: PayPalAccountDto, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payouts/payout-methods/paypal-account';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postPayPalAccountPayoutMethodRoute.');
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
      public putPayPalAccountPayoutMethodRoute = (body: PayPalAccountDto, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payouts/payout-methods/paypal-account';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling putPayPalAccountPayoutMethodRoute.');
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

  export interface IPayoutsApiMock {
    deletePayPalAccountPayoutMethodRoute(status: number, data?: JValue, err?: any): void
    getPayoutMethodsRoute(status: number, data?: PayoutMethodsDto, err?: any): void
    postPayPalAccountPayoutMethodRoute(status: number, data?: JValue, err?: any): void
    putPayPalAccountPayoutMethodRoute(status: number, data?: JValue, err?: any): void
  }

  /* istanbul ignore next */
  class PayoutsApiMock implements IPayoutsApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    deletePayPalAccountPayoutMethodRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payouts/payout-methods/paypal-account';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getPayoutMethodsRoute(status: number, data?: PayoutMethodsDto, err?: any): void {
      const localVarPath = this.apiUrl + '/payouts/payout-methods';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postPayPalAccountPayoutMethodRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payouts/payout-methods/paypal-account';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    putPayPalAccountPayoutMethodRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payouts/payout-methods/paypal-account';

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

  angular.module('profitelo.api.PayoutsApi', [])
    .service('PayoutsApi', PayoutsApi)
    .service('PayoutsApiMock', PayoutsApiMock)
}
