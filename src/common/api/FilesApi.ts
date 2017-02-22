namespace profitelo.api {
  export interface IFilesApi {
    createFileTokenPath (collectionType: string, body: PostProcessOption, extraHttpRequestParams?: any ) : ng.IPromise<FileIdDto>
    fileInfoPath (token: string, extraHttpRequestParams?: any ) : ng.IPromise<FileInfo>
  }

  /* istanbul ignore next */
  class FilesApi implements IFilesApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public createFileTokenPath = (collectionType: string, body: PostProcessOption, extraHttpRequestParams?: any ) : ng.IPromise<FileIdDto> => {
          const localVarPath = this.apiUrl + '/files/token/{collectionType}'
              .replace('{' + 'collectionType' + '}', String(collectionType));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'collectionType' is not null or undefined
          if (collectionType === null || collectionType === undefined) {
              throw new Error('Required parameter collectionType was null or undefined when calling createFileTokenPath.');
          }
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling createFileTokenPath.');
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
      public fileInfoPath = (token: string, extraHttpRequestParams?: any ) : ng.IPromise<FileInfo> => {
          const localVarPath = this.apiUrl + '/files/{token}'
              .replace('{' + 'token' + '}', String(token));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'token' is not null or undefined
          if (token === null || token === undefined) {
              throw new Error('Required parameter token was null or undefined when calling fileInfoPath.');
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

  angular.module('profitelo.api.FilesApi', []).service('FilesApi', FilesApi)
}
