namespace profitelo.api {
  export interface IPaymentsApi {
    addPaymentMethodRoute (body: PaymentMethod, extraHttpRequestParams?: any ) : ng.IPromise<JValue>
    createPaymentMethodTransactionRoute (cardToken: string, body: PostTransaction, extraHttpRequestParams?: any ) : ng.IPromise<JValue>
    createTransactionRoute (body: PostTransaction, extraHttpRequestParams?: any ) : ng.IPromise<JValue>
    deletePaymentMethodRoute (cardToken: string, extraHttpRequestParams?: any ) : ng.IPromise<JValue>
    getClientTokenRoute (extraHttpRequestParams?: any ) : ng.IPromise<ClientToken>
    getPayUPaymentLinksRoute (extraHttpRequestParams?: any ) : ng.IPromise<Array<PaymentLink>>
    getPaymentMethodsRoute (extraHttpRequestParams?: any ) : ng.IPromise<PaymentMethods>
    getPaymentOptionsRoute (extraHttpRequestParams?: any ) : ng.IPromise<GetPaymentOptions>
    postPayUNotifyRoute (body: string, extraHttpRequestParams?: any ) : ng.IPromise<{}>
    postPayUOrderRoute (body: PostOrder, extraHttpRequestParams?: any ) : ng.IPromise<GetOrder>
    setDefaultPaymentMethodRoute (cardToken: string, extraHttpRequestParams?: any ) : ng.IPromise<JValue>
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

      public addPaymentMethodRoute = (body: PaymentMethod, extraHttpRequestParams?: any ) : ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/paymentMethods';

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
      public createPaymentMethodTransactionRoute = (cardToken: string, body: PostTransaction, extraHttpRequestParams?: any ) : ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/paymentMethods/{cardToken}/transaction'
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
      public createTransactionRoute = (body: PostTransaction, extraHttpRequestParams?: any ) : ng.IPromise<JValue> => {
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
      public deletePaymentMethodRoute = (cardToken: string, extraHttpRequestParams?: any ) : ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/paymentMethods/{cardToken}'
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
      public getClientTokenRoute = (extraHttpRequestParams?: any ) : ng.IPromise<ClientToken> => {
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
      public getPayUPaymentLinksRoute = (extraHttpRequestParams?: any ) : ng.IPromise<Array<PaymentLink>> => {
          const localVarPath = this.apiUrl + '/payments/payu/paymentLinks';

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
      public getPaymentMethodsRoute = (extraHttpRequestParams?: any ) : ng.IPromise<PaymentMethods> => {
          const localVarPath = this.apiUrl + '/payments/braintree/paymentMethods';

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
      public getPaymentOptionsRoute = (extraHttpRequestParams?: any ) : ng.IPromise<GetPaymentOptions> => {
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
      public postPayUNotifyRoute = (body: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
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
      public postPayUOrderRoute = (body: PostOrder, extraHttpRequestParams?: any ) : ng.IPromise<GetOrder> => {
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
      public setDefaultPaymentMethodRoute = (cardToken: string, extraHttpRequestParams?: any ) : ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/payments/braintree/paymentMethods/{cardToken}/setDefault'
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

  angular.module('profitelo.api.PaymentsApi', []).service('PaymentsApi', PaymentsApi)
}
