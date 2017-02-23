namespace profitelo.api {
  export interface IServiceApi {
    addServiceUsageRequestRoute(serviceId: string, body: AddServiceUsageRequest, extraHttpRequestParams?: any): ng.IPromise<GetServiceUsageRequest>
    deleteServiceRoute(serviceId: string, extraHttpRequestParams?: any): ng.IPromise<number>
    getProfileServicesRoute(accountId: string, extraHttpRequestParams?: any): ng.IPromise<Array<GetService>>
    getServiceRoute(serviceId: string, extraHttpRequestParams?: any): ng.IPromise<GetService>
    getSuggestionsRoute(expression: string, extraHttpRequestParams?: any): ng.IPromise<number>
    postServiceRecommendationRoute(serviceUsageEventId: string, extraHttpRequestParams?: any): ng.IPromise<GetService>
    postServiceRoute(body: PostService, extraHttpRequestParams?: any): ng.IPromise<GetService>
    postServiceWithEmployeesRoute(body: PostServicesWithEmployees, extraHttpRequestParams?: any): ng.IPromise<Array<GetServiceWithEmployees>>
    postServicesTagsRoute(body: PostServicesTags, extraHttpRequestParams?: any): ng.IPromise<Array<GetServiceTags>>
    postServicesVerifyRoute(extraHttpRequestParams?: any): ng.IPromise<{}>
    putServiceRecommendationsRoute(serviceUsageEventId: string, body: PutServiceRecommendations, extraHttpRequestParams?: any): ng.IPromise<GetService>
    putServiceRoute(serviceId: string, body: PutService, extraHttpRequestParams?: any): ng.IPromise<GetService>
  }

  /* istanbul ignore next */
  class ServiceApi implements IServiceApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public addServiceUsageRequestRoute = (serviceId: string, body: AddServiceUsageRequest, extraHttpRequestParams?: any): ng.IPromise<GetServiceUsageRequest> => {
          const localVarPath = this.apiUrl + '/services/{serviceId}/usage-request'
              .replace('{' + 'serviceId' + '}', String(serviceId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'serviceId' is not null or undefined
          if (serviceId === null || serviceId === undefined) {
              throw new Error('Required parameter serviceId was null or undefined when calling addServiceUsageRequestRoute.');
          }
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling addServiceUsageRequestRoute.');
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
      public deleteServiceRoute = (serviceId: string, extraHttpRequestParams?: any): ng.IPromise<number> => {
          const localVarPath = this.apiUrl + '/services/{serviceId}'
              .replace('{' + 'serviceId' + '}', String(serviceId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'serviceId' is not null or undefined
          if (serviceId === null || serviceId === undefined) {
              throw new Error('Required parameter serviceId was null or undefined when calling deleteServiceRoute.');
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
      public getProfileServicesRoute = (accountId: string, extraHttpRequestParams?: any): ng.IPromise<Array<GetService>> => {
          const localVarPath = this.apiUrl + '/services/profile/{accountId}'
              .replace('{' + 'accountId' + '}', String(accountId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'accountId' is not null or undefined
          if (accountId === null || accountId === undefined) {
              throw new Error('Required parameter accountId was null or undefined when calling getProfileServicesRoute.');
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
      public getServiceRoute = (serviceId: string, extraHttpRequestParams?: any): ng.IPromise<GetService> => {
          const localVarPath = this.apiUrl + '/services/{serviceId}'
              .replace('{' + 'serviceId' + '}', String(serviceId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'serviceId' is not null or undefined
          if (serviceId === null || serviceId === undefined) {
              throw new Error('Required parameter serviceId was null or undefined when calling getServiceRoute.');
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
      public getSuggestionsRoute = (expression: string, extraHttpRequestParams?: any): ng.IPromise<number> => {
          const localVarPath = this.apiUrl + '/services/suggest/{expression}'
              .replace('{' + 'expression' + '}', String(expression));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'expression' is not null or undefined
          if (expression === null || expression === undefined) {
              throw new Error('Required parameter expression was null or undefined when calling getSuggestionsRoute.');
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
      public postServiceRecommendationRoute = (serviceUsageEventId: string, extraHttpRequestParams?: any): ng.IPromise<GetService> => {
          const localVarPath = this.apiUrl + '/services/{serviceUsageEventId}/recommend'
              .replace('{' + 'serviceUsageEventId' + '}', String(serviceUsageEventId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'serviceUsageEventId' is not null or undefined
          if (serviceUsageEventId === null || serviceUsageEventId === undefined) {
              throw new Error('Required parameter serviceUsageEventId was null or undefined when calling postServiceRecommendationRoute.');
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
      public postServiceRoute = (body: PostService, extraHttpRequestParams?: any): ng.IPromise<GetService> => {
          const localVarPath = this.apiUrl + '/services';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postServiceRoute.');
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
      public postServiceWithEmployeesRoute = (body: PostServicesWithEmployees, extraHttpRequestParams?: any): ng.IPromise<Array<GetServiceWithEmployees>> => {
          const localVarPath = this.apiUrl + '/services/employees';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postServiceWithEmployeesRoute.');
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
      public postServicesTagsRoute = (body: PostServicesTags, extraHttpRequestParams?: any): ng.IPromise<Array<GetServiceTags>> => {
          const localVarPath = this.apiUrl + '/services/tags';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postServicesTagsRoute.');
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
      public postServicesVerifyRoute = (extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/services/verify';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
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
      public putServiceRecommendationsRoute = (serviceUsageEventId: string, body: PutServiceRecommendations, extraHttpRequestParams?: any): ng.IPromise<GetService> => {
          const localVarPath = this.apiUrl + '/services/{serviceUsageEventId}/recommend'
              .replace('{' + 'serviceUsageEventId' + '}', String(serviceUsageEventId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'serviceUsageEventId' is not null or undefined
          if (serviceUsageEventId === null || serviceUsageEventId === undefined) {
              throw new Error('Required parameter serviceUsageEventId was null or undefined when calling putServiceRecommendationsRoute.');
          }
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling putServiceRecommendationsRoute.');
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
      public putServiceRoute = (serviceId: string, body: PutService, extraHttpRequestParams?: any): ng.IPromise<GetService> => {
          const localVarPath = this.apiUrl + '/services/{serviceId}'
              .replace('{' + 'serviceId' + '}', String(serviceId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'serviceId' is not null or undefined
          if (serviceId === null || serviceId === undefined) {
              throw new Error('Required parameter serviceId was null or undefined when calling putServiceRoute.');
          }
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling putServiceRoute.');
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

  export interface IServiceApiMock {
    addServiceUsageRequestRoute(status: number, serviceId: string, data?: GetServiceUsageRequest, err?: any): void
    deleteServiceRoute(status: number, serviceId: string, data?: number, err?: any): void
    getProfileServicesRoute(status: number, accountId: string, data?: Array<GetService>, err?: any): void
    getServiceRoute(status: number, serviceId: string, data?: GetService, err?: any): void
    getSuggestionsRoute(status: number, expression: string, data?: number, err?: any): void
    postServiceRecommendationRoute(status: number, serviceUsageEventId: string, data?: GetService, err?: any): void
    postServiceRoute(status: number, data?: GetService, err?: any): void
    postServiceWithEmployeesRoute(status: number, data?: Array<GetServiceWithEmployees>, err?: any): void
    postServicesTagsRoute(status: number, data?: Array<GetServiceTags>, err?: any): void
    postServicesVerifyRoute(status: number, data?: {}, err?: any): void
    putServiceRecommendationsRoute(status: number, serviceUsageEventId: string, data?: GetService, err?: any): void
    putServiceRoute(status: number, serviceId: string, data?: GetService, err?: any): void
  }

  /* istanbul ignore next */
  class ServiceApiMock implements IServiceApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    addServiceUsageRequestRoute(status: number, serviceId: string, data?: GetServiceUsageRequest, err?: any): void {
      const localVarPath = this.apiUrl + '/services/{serviceId}/usage-request'
          .replace('{' + 'serviceId' + '}', String(serviceId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    deleteServiceRoute(status: number, serviceId: string, data?: number, err?: any): void {
      const localVarPath = this.apiUrl + '/services/{serviceId}'
          .replace('{' + 'serviceId' + '}', String(serviceId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getProfileServicesRoute(status: number, accountId: string, data?: Array<GetService>, err?: any): void {
      const localVarPath = this.apiUrl + '/services/profile/{accountId}'
          .replace('{' + 'accountId' + '}', String(accountId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getServiceRoute(status: number, serviceId: string, data?: GetService, err?: any): void {
      const localVarPath = this.apiUrl + '/services/{serviceId}'
          .replace('{' + 'serviceId' + '}', String(serviceId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getSuggestionsRoute(status: number, expression: string, data?: number, err?: any): void {
      const localVarPath = this.apiUrl + '/services/suggest/{expression}'
          .replace('{' + 'expression' + '}', String(expression));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postServiceRecommendationRoute(status: number, serviceUsageEventId: string, data?: GetService, err?: any): void {
      const localVarPath = this.apiUrl + '/services/{serviceUsageEventId}/recommend'
          .replace('{' + 'serviceUsageEventId' + '}', String(serviceUsageEventId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postServiceRoute(status: number, data?: GetService, err?: any): void {
      const localVarPath = this.apiUrl + '/services';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postServiceWithEmployeesRoute(status: number, data?: Array<GetServiceWithEmployees>, err?: any): void {
      const localVarPath = this.apiUrl + '/services/employees';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postServicesTagsRoute(status: number, data?: Array<GetServiceTags>, err?: any): void {
      const localVarPath = this.apiUrl + '/services/tags';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postServicesVerifyRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/services/verify';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    putServiceRecommendationsRoute(status: number, serviceUsageEventId: string, data?: GetService, err?: any): void {
      const localVarPath = this.apiUrl + '/services/{serviceUsageEventId}/recommend'
          .replace('{' + 'serviceUsageEventId' + '}', String(serviceUsageEventId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    putServiceRoute(status: number, serviceId: string, data?: GetService, err?: any): void {
      const localVarPath = this.apiUrl + '/services/{serviceId}'
          .replace('{' + 'serviceId' + '}', String(serviceId));

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

  angular.module('profitelo.api.ServiceApi', [])
    .service('ServiceApi', ServiceApi)
    .service('ServiceApiMock', ServiceApiMock)
}
