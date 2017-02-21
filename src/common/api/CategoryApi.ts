namespace profitelo.api {
  export interface ICategoryApi {
    listCategoriesRoute (extraHttpRequestParams?: any ) : ng.IPromise<Array<Category>>
  }

  /* istanbul ignore next */
  class CategoryApi implements ICategoryApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public listCategoriesRoute = (extraHttpRequestParams?: any ) : ng.IPromise<Array<Category>> => {
          const localVarPath = this.apiUrl + '/categories';

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

  angular.module('profitelo.api.CategoryApi', []).service('CategoryApi', CategoryApi)
}
