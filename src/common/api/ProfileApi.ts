namespace profitelo.api {
  export interface IProfileApi {
    deleteProfileFavouriteExpertRoute (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}>
    deleteProfileFavouriteOrganizationRoute (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}>
    getEmployersProfilesWithServicesRoute (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<Array<GetProfileWithServices>>
    getProfileRoute (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<GetProfile>
    getProfileWithServicesRoute (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<GetProfileWithServices>
    getProfilesInvitationsRoute (extraHttpRequestParams?: any ) : ng.IPromise<Array<GetProfileWithServicesEmployments>>
    patchProfileRoute (body: UpdateProfile, extraHttpRequestParams?: any ) : ng.IPromise<{}>
    postProfileFavouriteExpertRoute (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<JValue>
    postProfileFavouriteOrganizationRoute (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<JValue>
    postProfileRoute (body: PostProfile, extraHttpRequestParams?: any ) : ng.IPromise<GetProfile>
    putProfileRoute (body: UpdateProfile, extraHttpRequestParams?: any ) : ng.IPromise<{}>
  }

  /* istanbul ignore next */
  class ProfileApi implements IProfileApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public deleteProfileFavouriteExpertRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/expert'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling deleteProfileFavouriteExpertRoute.');
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
      public deleteProfileFavouriteOrganizationRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/organization'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling deleteProfileFavouriteOrganizationRoute.');
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
      public getEmployersProfilesWithServicesRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<Array<GetProfileWithServices>> => {
          const localVarPath = this.apiUrl + '/profiles/{profileId}/employers/services'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling getEmployersProfilesWithServicesRoute.');
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
      public getProfileRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<GetProfile> => {
          const localVarPath = this.apiUrl + '/profiles/{profileId}'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling getProfileRoute.');
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
      public getProfileWithServicesRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<GetProfileWithServices> => {
          const localVarPath = this.apiUrl + '/profiles/{profileId}/services'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling getProfileWithServicesRoute.');
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
      public getProfilesInvitationsRoute = (extraHttpRequestParams?: any ) : ng.IPromise<Array<GetProfileWithServicesEmployments>> => {
          const localVarPath = this.apiUrl + '/profiles/invitations';

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
      public patchProfileRoute = (body: UpdateProfile, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/profiles';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling patchProfileRoute.');
          }
          let httpRequestParams: ng.IRequestConfig = {
              method: 'PATCH',
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
      public postProfileFavouriteExpertRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/expert'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling postProfileFavouriteExpertRoute.');
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
      public postProfileFavouriteOrganizationRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/organization'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling postProfileFavouriteOrganizationRoute.');
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
      public postProfileRoute = (body: PostProfile, extraHttpRequestParams?: any ) : ng.IPromise<GetProfile> => {
          const localVarPath = this.apiUrl + '/profiles';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postProfileRoute.');
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
      public putProfileRoute = (body: UpdateProfile, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/profiles';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling putProfileRoute.');
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

  angular.module('profitelo.api.ProfileApi', []).service('ProfileApi', ProfileApi)
}
