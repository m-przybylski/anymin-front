namespace profitelo.api {
  export interface IPaymentsApi {
    addPaymentMethodRoute(body: AddNewPaymentMethod, extraHttpRequestParams?: any): ng.IPromise<JValue>
    createPaymentMethodTransactionRoute(cardToken: string, body: PostTransaction, extraHttpRequestParams?: any): ng.IPromise<JValue>
    createTransactionRoute(body: PostTransaction, extraHttpRequestParams?: any): ng.IPromise<JValue>
    deletePaymentMethodRoute(cardToken: string, extraHttpRequestParams?: any): ng.IPromise<JValue>
    getClientTokenRoute(extraHttpRequestParams?: any): ng.IPromise<ClientToken>
    getCreditCardsRoute(extraHttpRequestParams?: any): ng.IPromise<Array<GetCreditCard>>
    getPayUPaymentLinksRoute(extraHttpRequestParams?: any): ng.IPromise<Array<PaymentLink>>
    getPaymentOptionsRoute(extraHttpRequestParams?: any): ng.IPromise<GetPaymentOptions>
    postPayUNotifyRoute(body: string, extraHttpRequestParams?: any): ng.IPromise<{}>
    postPayUOrderRoute(body: PostOrder, extraHttpRequestParams?: any): ng.IPromise<GetOrder>
    putCreditCardLimitRoute(body: PutCreditCardLimit, extraHttpRequestParams?: any): ng.IPromise<JValue>
    setDefaultPaymentMethodRoute(cardToken: string, extraHttpRequestParams?: any): ng.IPromise<JValue>
  }

  /* istanbul ignore next */
  class PaymentsApi implements IPaymentsApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public addPaymentMethodRoute = (body: AddNewPaymentMethod, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/payment-methods';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling addPaymentMethodRoute.');
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
      public createPaymentMethodTransactionRoute = (cardToken: string, body: PostTransaction, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/transaction'
              .replace('{' + 'cardToken' + '}', String(cardToken));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'cardToken' is not null or undefined
          if (cardToken === null || cardToken === undefined) {
              throw new Error('Required parameter cardToken was null or undefined when calling createPaymentMethodTransactionRoute.');
          }
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling createPaymentMethodTransactionRoute.');
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
      public createTransactionRoute = (body: PostTransaction, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/transaction';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling createTransactionRoute.');
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
      public deletePaymentMethodRoute = (cardToken: string, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}'
              .replace('{' + 'cardToken' + '}', String(cardToken));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'cardToken' is not null or undefined
          if (cardToken === null || cardToken === undefined) {
              throw new Error('Required parameter cardToken was null or undefined when calling deletePaymentMethodRoute.');
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
      public getClientTokenRoute = (extraHttpRequestParams?: any): ng.IPromise<ClientToken> => {
          const localVarPath = this.apiUrl + '/payments/braintree';

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
      public getCreditCardsRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<GetCreditCard>> => {
          const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/credit-cards';

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
      public getPayUPaymentLinksRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<PaymentLink>> => {
          const localVarPath = this.apiUrl + '/payments/payu/payment-links';

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
      public getPaymentOptionsRoute = (extraHttpRequestParams?: any): ng.IPromise<GetPaymentOptions> => {
          const localVarPath = this.apiUrl + '/payments/options';

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
      public postPayUNotifyRoute = (body: string, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/payments/payu/notification';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postPayUNotifyRoute.');
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
      public postPayUOrderRoute = (body: PostOrder, extraHttpRequestParams?: any): ng.IPromise<GetOrder> => {
          const localVarPath = this.apiUrl + '/payments/payu/order';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postPayUOrderRoute.');
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
      public putCreditCardLimitRoute = (body: PutCreditCardLimit, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/limit';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling putCreditCardLimitRoute.');
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
      public setDefaultPaymentMethodRoute = (cardToken: string, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/set-default'
              .replace('{' + 'cardToken' + '}', String(cardToken));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'cardToken' is not null or undefined
          if (cardToken === null || cardToken === undefined) {
              throw new Error('Required parameter cardToken was null or undefined when calling setDefaultPaymentMethodRoute.');
          }
          let httpRequestParams: ng.IRequestConfig = {
              method: 'POST',
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

  export interface IPaymentsApiMock {
    addPaymentMethodRoute(status: number, data?: JValue, err?: any): void
    createPaymentMethodTransactionRoute(status: number, cardToken: string, data?: JValue, err?: any): void
    createTransactionRoute(status: number, data?: JValue, err?: any): void
    deletePaymentMethodRoute(status: number, cardToken: string, data?: JValue, err?: any): void
    getClientTokenRoute(status: number, data?: ClientToken, err?: any): void
    getCreditCardsRoute(status: number, data?: Array<GetCreditCard>, err?: any): void
    getPayUPaymentLinksRoute(status: number, data?: Array<PaymentLink>, err?: any): void
    getPaymentOptionsRoute(status: number, data?: GetPaymentOptions, err?: any): void
    postPayUNotifyRoute(status: number, data?: {}, err?: any): void
    postPayUOrderRoute(status: number, data?: GetOrder, err?: any): void
    putCreditCardLimitRoute(status: number, data?: JValue, err?: any): void
    setDefaultPaymentMethodRoute(status: number, cardToken: string, data?: JValue, err?: any): void
  }

  /* istanbul ignore next */
  class PaymentsApiMock implements IPaymentsApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    addPaymentMethodRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    createPaymentMethodTransactionRoute(status: number, cardToken: string, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/transaction'
          .replace('{' + 'cardToken' + '}', String(cardToken));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    createTransactionRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/braintree/transaction';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    deletePaymentMethodRoute(status: number, cardToken: string, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}'
          .replace('{' + 'cardToken' + '}', String(cardToken));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getClientTokenRoute(status: number, data?: ClientToken, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/braintree';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getCreditCardsRoute(status: number, data?: Array<GetCreditCard>, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/credit-cards';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getPayUPaymentLinksRoute(status: number, data?: Array<PaymentLink>, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/payu/payment-links';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getPaymentOptionsRoute(status: number, data?: GetPaymentOptions, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/options';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postPayUNotifyRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/payu/notification';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postPayUOrderRoute(status: number, data?: GetOrder, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/payu/order';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    putCreditCardLimitRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/limit';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    setDefaultPaymentMethodRoute(status: number, cardToken: string, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/set-default'
          .replace('{' + 'cardToken' + '}', String(cardToken));

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

  angular.module('profitelo.api.PaymentsApi', [])
    .service('PaymentsApi', PaymentsApi)
    .service('PaymentsApiMock', PaymentsApiMock)
}
