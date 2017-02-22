namespace profitelo.api {
  export interface ISearchApi {
    searchReindexRoute (extraHttpRequestParams?: any ) : ng.IPromise<string>
    searchRoute (q?: string, serviceName?: string, profileName?: string, profileDesc?: string, tagId?: string, serviceCategoryId?: string, profileType?: string, onlyAvailable?: string, sortBy?: string, language?: string, minPrice?: number, maxPrice?: number, offset?: number, limit?: number, extraHttpRequestParams?: any ) : ng.IPromise<SearchResult>
    searchSuggestionsRoute (q?: string, type?: string, extraHttpRequestParams?: any ) : ng.IPromise<SearchSuggestions>
  }

  /* istanbul ignore next */
  class SearchApi implements ISearchApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public searchReindexRoute = (extraHttpRequestParams?: any ) : ng.IPromise<string> => {
          const localVarPath = this.apiUrl + '/search/reindex';

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
      public searchRoute = (q?: string, serviceName?: string, profileName?: string, profileDesc?: string, tagId?: string, serviceCategoryId?: string, profileType?: string, onlyAvailable?: string, sortBy?: string, language?: string, minPrice?: number, maxPrice?: number, offset?: number, limit?: number, extraHttpRequestParams?: any ) : ng.IPromise<SearchResult> => {
          const localVarPath = this.apiUrl + '/search';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          if (q !== undefined) {
              queryParameters['q'] = q;
          }

          if (serviceName !== undefined) {
              queryParameters['service.name'] = serviceName;
          }

          if (profileName !== undefined) {
              queryParameters['profile.name'] = profileName;
          }

          if (profileDesc !== undefined) {
              queryParameters['profile.desc'] = profileDesc;
          }

          if (tagId !== undefined) {
              queryParameters['tag.id'] = tagId;
          }

          if (serviceCategoryId !== undefined) {
              queryParameters['service.category.id'] = serviceCategoryId;
          }

          if (profileType !== undefined) {
              queryParameters['profile.type'] = profileType;
          }

          if (onlyAvailable !== undefined) {
              queryParameters['onlyAvailable'] = onlyAvailable;
          }

          if (sortBy !== undefined) {
              queryParameters['sortBy'] = sortBy;
          }

          if (language !== undefined) {
              queryParameters['language'] = language;
          }

          if (minPrice !== undefined) {
              queryParameters['minPrice'] = minPrice;
          }

          if (maxPrice !== undefined) {
              queryParameters['maxPrice'] = maxPrice;
          }

          if (offset !== undefined) {
              queryParameters['offset'] = offset;
          }

          if (limit !== undefined) {
              queryParameters['limit'] = limit;
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
      public searchSuggestionsRoute = (q?: string, type?: string, extraHttpRequestParams?: any ) : ng.IPromise<SearchSuggestions> => {
          const localVarPath = this.apiUrl + '/search/suggestions';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          if (q !== undefined) {
              queryParameters['q'] = q;
          }

          if (type !== undefined) {
              queryParameters['type'] = type;
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
  }

  angular.module('profitelo.api.SearchApi', []).service('SearchApi', SearchApi)
}
