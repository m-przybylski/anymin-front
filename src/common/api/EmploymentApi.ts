namespace profitelo.api {
  export interface IEmploymentApi {
    postEmploymentsAcceptRoute (employmentId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}>
    postEmploymentsRejectRoute (employmentId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}>
    postEmploymentsRoute (body: PostEmployment, extraHttpRequestParams?: any ) : ng.IPromise<JValue>
  }

  /* istanbul ignore next */
  class EmploymentApi implements IEmploymentApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public postEmploymentsAcceptRoute = (employmentId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/employments/{employmentId}/accept'
              .replace('{' + 'employmentId' + '}', String(employmentId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'employmentId' is not null or undefined
          if (employmentId === null || employmentId === undefined) {
              throw new Error('Required parameter employmentId was null or undefined when calling postEmploymentsAcceptRoute.');
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
      public postEmploymentsRejectRoute = (employmentId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/employments/{employmentId}/reject'
              .replace('{' + 'employmentId' + '}', String(employmentId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'employmentId' is not null or undefined
          if (employmentId === null || employmentId === undefined) {
              throw new Error('Required parameter employmentId was null or undefined when calling postEmploymentsRejectRoute.');
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
      public postEmploymentsRoute = (body: PostEmployment, extraHttpRequestParams?: any ) : ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/employments';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postEmploymentsRoute.');
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

  angular.module('profitelo.api.EmploymentApi', []).service('EmploymentApi', EmploymentApi)
}
