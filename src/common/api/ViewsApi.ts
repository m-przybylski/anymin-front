namespace profitelo.api {
  export interface IViewsApi {
    getClientDashboardCallDetailsRoute(sueId: string, extraHttpRequestParams?: any): ng.IPromise<GetCallDetails>
    getDashboardClientActivitiesRoute(activityType?: string, profileId?: string, serviceId?: string, dateFrom?: string, dateTo?: string, limit?: string, offset?: string, extraHttpRequestParams?: any): ng.IPromise<GetActivities>
    getDashboardClientExpertsRoute(extraHttpRequestParams?: any): ng.IPromise<GetDashboardClientExperts>
    getExpertProfileRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<GetExpertProfile>
    getOrganizationProfileRoute(profileId: string, extraHttpRequestParams?: any): ng.IPromise<GetOrganizationProfile>
  }

  /* istanbul ignore next */
  class ViewsApi implements IViewsApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public getClientDashboardCallDetailsRoute = (sueId: string, extraHttpRequestParams?: any): ng.IPromise<GetCallDetails> => {
          const localVarPath = this.apiUrl + '/views/profile/client/sue/{sueId}/details'
              .replace('{' + 'sueId' + '}', String(sueId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'sueId' is not null or undefined
          if (sueId === null || sueId === undefined) {
              throw new Error('Required parameter sueId was null or undefined when calling getClientDashboardCallDetailsRoute.');
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
      public getDashboardClientActivitiesRoute = (activityType?: string, profileId?: string, serviceId?: string, dateFrom?: string, dateTo?: string, limit?: string, offset?: string, extraHttpRequestParams?: any): ng.IPromise<GetActivities> => {
          const localVarPath = this.apiUrl + '/views/profile/client/activities';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          if (activityType !== undefined) {
              queryParameters['activityType'] = activityType;
          }

          if (profileId !== undefined) {
              queryParameters['profileId'] = profileId;
          }

          if (serviceId !== undefined) {
              queryParameters['serviceId'] = serviceId;
          }

          if (dateFrom !== undefined) {
              queryParameters['dateFrom'] = dateFrom;
          }

          if (dateTo !== undefined) {
              queryParameters['dateTo'] = dateTo;
          }

          if (limit !== undefined) {
              queryParameters['limit'] = limit;
          }

          if (offset !== undefined) {
              queryParameters['offset'] = offset;
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
      public getDashboardClientExpertsRoute = (extraHttpRequestParams?: any): ng.IPromise<GetDashboardClientExperts> => {
          const localVarPath = this.apiUrl + '/views/profile/client/experts';

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
      public getExpertProfileRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<GetExpertProfile> => {
          const localVarPath = this.apiUrl + '/views/profile/{profileId}/expert'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling getExpertProfileRoute.');
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
      public getOrganizationProfileRoute = (profileId: string, extraHttpRequestParams?: any): ng.IPromise<GetOrganizationProfile> => {
          const localVarPath = this.apiUrl + '/views/profile/{profileId}/organization'
              .replace('{' + 'profileId' + '}', String(profileId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'profileId' is not null or undefined
          if (profileId === null || profileId === undefined) {
              throw new Error('Required parameter profileId was null or undefined when calling getOrganizationProfileRoute.');
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

  export interface IViewsApiMock {
    getClientDashboardCallDetailsRoute(status: number, sueId: string, data?: GetCallDetails, err?: any): void
    getDashboardClientActivitiesRoute(status: number, activityType?: string, profileId?: string, serviceId?: string, dateFrom?: string, dateTo?: string, limit?: string, offset?: string, data?: GetActivities, err?: any): void
    getDashboardClientExpertsRoute(status: number, data?: GetDashboardClientExperts, err?: any): void
    getExpertProfileRoute(status: number, profileId: string, data?: GetExpertProfile, err?: any): void
    getOrganizationProfileRoute(status: number, profileId: string, data?: GetOrganizationProfile, err?: any): void
  }

  /* istanbul ignore next */
  class ViewsApiMock implements IViewsApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    getClientDashboardCallDetailsRoute(status: number, sueId: string, data?: GetCallDetails, err?: any): void {
      const localVarPath = this.apiUrl + '/views/profile/client/sue/{sueId}/details'
          .replace('{' + 'sueId' + '}', String(sueId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getDashboardClientActivitiesRoute(status: number, activityType?: string, profileId?: string, serviceId?: string, dateFrom?: string, dateTo?: string, limit?: string, offset?: string, data?: GetActivities, err?: any): void {
      const localVarPath = this.apiUrl + '/views/profile/client/activities';

      const queryParameters: any = {}
      if (activityType !== undefined) {
        queryParameters['activityType'] = activityType;
      }
      if (profileId !== undefined) {
        queryParameters['profileId'] = profileId;
      }
      if (serviceId !== undefined) {
        queryParameters['serviceId'] = serviceId;
      }
      if (dateFrom !== undefined) {
        queryParameters['dateFrom'] = dateFrom;
      }
      if (dateTo !== undefined) {
        queryParameters['dateTo'] = dateTo;
      }
      if (limit !== undefined) {
        queryParameters['limit'] = limit;
      }
      if (offset !== undefined) {
        queryParameters['offset'] = offset;
      }
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getDashboardClientExpertsRoute(status: number, data?: GetDashboardClientExperts, err?: any): void {
      const localVarPath = this.apiUrl + '/views/profile/client/experts';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getExpertProfileRoute(status: number, profileId: string, data?: GetExpertProfile, err?: any): void {
      const localVarPath = this.apiUrl + '/views/profile/{profileId}/expert'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getOrganizationProfileRoute(status: number, profileId: string, data?: GetOrganizationProfile, err?: any): void {
      const localVarPath = this.apiUrl + '/views/profile/{profileId}/organization'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
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

  angular.module('profitelo.api.ViewsApi', [])
    .service('ViewsApi', ViewsApi)
    .service('ViewsApiMock', ViewsApiMock)
}
