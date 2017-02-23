namespace profitelo.api {
  export interface IProfileApi {
    deleteProfileFavouriteExpertRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<{}>
    deleteProfileFavouriteOrganizationRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<{}>
    getEmployersProfilesWithServicesRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<Array<GetProfileWithServices>>
    getProfileRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<GetProfile>
    getProfileWithServicesRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<GetProfileWithServices>
    getProfilesInvitationsRoute(extraHttpRequestParams?: any): ng.IPromise<Array<GetProfileWithServicesEmployments>>
    patchProfileRoute(body: UpdateProfile, extraHttpRequestParams?: any): ng.IPromise<{}>
    postProfileFavouriteExpertRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<JValue>
    postProfileFavouriteOrganizationRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<JValue>
    postProfileRoute(body: PostProfile, extraHttpRequestParams?: any): ng.IPromise<GetProfile>
    putProfileRoute(body: UpdateProfile, extraHttpRequestParams?: any): ng.IPromise<{}>
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

      public deleteProfileFavouriteExpertRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<{}> => {
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
      public deleteProfileFavouriteOrganizationRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<{}> => {
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
      public getEmployersProfilesWithServicesRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<Array<GetProfileWithServices>> => {
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
      public getProfileRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<GetProfile> => {
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
      public getProfileWithServicesRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<GetProfileWithServices> => {
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
      public getProfilesInvitationsRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<GetProfileWithServicesEmployments>> => {
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
      public patchProfileRoute = (body: UpdateProfile, extraHttpRequestParams?: any): ng.IPromise<{}> => {
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
      public postProfileFavouriteExpertRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
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
      public postProfileFavouriteOrganizationRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
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
      public postProfileRoute = (body: PostProfile, extraHttpRequestParams?: any): ng.IPromise<GetProfile> => {
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
      public putProfileRoute = (body: UpdateProfile, extraHttpRequestParams?: any): ng.IPromise<{}> => {
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

  export interface IProfileApiMock {
    deleteProfileFavouriteExpertRoute(status: number, profileId: string, data?: {}, err?: any): void
    deleteProfileFavouriteOrganizationRoute(status: number, profileId: string, data?: {}, err?: any): void
    getEmployersProfilesWithServicesRoute(status: number, profileId: string, data?: Array<GetProfileWithServices>, err?: any): void
    getProfileRoute(status: number, profileId: string, data?: GetProfile, err?: any): void
    getProfileWithServicesRoute(status: number, profileId: string, data?: GetProfileWithServices, err?: any): void
    getProfilesInvitationsRoute(status: number, data?: Array<GetProfileWithServicesEmployments>, err?: any): void
    patchProfileRoute(status: number, data?: {}, err?: any): void
    postProfileFavouriteExpertRoute(status: number, profileId: string, data?: JValue, err?: any): void
    postProfileFavouriteOrganizationRoute(status: number, profileId: string, data?: JValue, err?: any): void
    postProfileRoute(status: number, data?: GetProfile, err?: any): void
    putProfileRoute(status: number, data?: {}, err?: any): void
  }

  /* istanbul ignore next */
  class ProfileApiMock implements IProfileApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    deleteProfileFavouriteExpertRoute(status: number, profileId: string, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/expert'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    deleteProfileFavouriteOrganizationRoute(status: number, profileId: string, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/organization'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getEmployersProfilesWithServicesRoute(status: number, profileId: string, data?: Array<GetProfileWithServices>, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/employers/services'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getProfileRoute(status: number, profileId: string, data?: GetProfile, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles/{profileId}'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getProfileWithServicesRoute(status: number, profileId: string, data?: GetProfileWithServices, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/services'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getProfilesInvitationsRoute(status: number, data?: Array<GetProfileWithServicesEmployments>, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles/invitations';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    patchProfileRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPATCH(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postProfileFavouriteExpertRoute(status: number, profileId: string, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/expert'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postProfileFavouriteOrganizationRoute(status: number, profileId: string, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/organization'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postProfileRoute(status: number, data?: GetProfile, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    putProfileRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/profiles';

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

  angular.module('profitelo.api.ProfileApi', [])
    .service('ProfileApi', ProfileApi)
    .service('ProfileApiMock', ProfileApiMock)
}
