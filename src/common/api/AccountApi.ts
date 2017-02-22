namespace profitelo.api {
  export interface IAccountApi {
    addAccountRoute(body: AddAccount, extraHttpRequestParams?: any): ng.IPromise<Account>
    changePasswordRoute(body: ChangeAccountPassword, extraHttpRequestParams?: any): ng.IPromise<{}>
    confirmMsisdnVerificationRoute(body: ConfirmMsisdnVerificationRequest, extraHttpRequestParams?: any): ng.IPromise<{}>
    getAccountEmailExistsRoute(email: string, extraHttpRequestParams?: any): ng.IPromise<{}>
    getAccountRoute(accountId: string, extraHttpRequestParams?: any): ng.IPromise<AccountWithExtras>
    getCompanyInfoRoute(extraHttpRequestParams?: any): ng.IPromise<CompanyInfo>
    getMobileProtectedViewsRoute(extraHttpRequestParams?: any): ng.IPromise<GetMobileProtectedViews>
    getRegistrationStatusByMsisdnRoute(msisdn: string, extraHttpRequestParams?: any): ng.IPromise<GetRegistrationStatus>
    getSupportedCountriesRoute(extraHttpRequestParams?: any): ng.IPromise<Array<Country>>
    listAccountsRoute(extraHttpRequestParams?: any): ng.IPromise<Array<Account>>
    newMsisdnVerificationRoute(body: CreateMsisdnVerificationRequest, extraHttpRequestParams?: any): ng.IPromise<JValue>
    partialUpdateAccountRoute(accountId: string, body: PatchAccount, extraHttpRequestParams?: any): ng.IPromise<Account>
    patchMobileViewsPermissionsRoute(body: PatchMobileViewsPermissions, extraHttpRequestParams?: any): ng.IPromise<Account>
    postAccountVerifyEmailRoute(token: string, extraHttpRequestParams?: any): ng.IPromise<AccountWithExtras>
    postCompanyInfoRoute(body: PostCompanyInfo, extraHttpRequestParams?: any): ng.IPromise<CompanyInfo>
    postMobilePinRoute(body: PostMobileViewsPermissions, extraHttpRequestParams?: any): ng.IPromise<Account>
    putGeneralSettingsRoute(body: PutGeneralSettings, extraHttpRequestParams?: any): ng.IPromise<{}>
    updateAccountRoute(accountId: string, body: UpdateAccount, extraHttpRequestParams?: any): ng.IPromise<Account>
    validateMobilePinRoute(pin: string, extraHttpRequestParams?: any): ng.IPromise<{}>
  }

  /* istanbul ignore next */
  class AccountApi implements IAccountApi {
      protected apiUrl = '';
      public defaultHeaders : any = {};

      static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

      constructor(protected $http: ng.IHttpService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
          if (apiUrl !== undefined) {
              this.apiUrl = apiUrl;
          }
      }

      public addAccountRoute = (body: AddAccount, extraHttpRequestParams?: any): ng.IPromise<Account> => {
          const localVarPath = this.apiUrl + '/accounts';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling addAccountRoute.');
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
      public changePasswordRoute = (body: ChangeAccountPassword, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/accounts/settings/change-password';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling changePasswordRoute.');
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
      public confirmMsisdnVerificationRoute = (body: ConfirmMsisdnVerificationRequest, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/accounts/settings/msisdn-verification/confirm';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling confirmMsisdnVerificationRoute.');
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
      public getAccountEmailExistsRoute = (email: string, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/accounts/exists/email/{email}'
              .replace('{' + 'email' + '}', String(email));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'email' is not null or undefined
          if (email === null || email === undefined) {
              throw new Error('Required parameter email was null or undefined when calling getAccountEmailExistsRoute.');
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
      public getAccountRoute = (accountId: string, extraHttpRequestParams?: any): ng.IPromise<AccountWithExtras> => {
          const localVarPath = this.apiUrl + '/accounts/{accountId}'
              .replace('{' + 'accountId' + '}', String(accountId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'accountId' is not null or undefined
          if (accountId === null || accountId === undefined) {
              throw new Error('Required parameter accountId was null or undefined when calling getAccountRoute.');
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
      public getCompanyInfoRoute = (extraHttpRequestParams?: any): ng.IPromise<CompanyInfo> => {
          const localVarPath = this.apiUrl + '/accounts/settings/company-info';

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
      public getMobileProtectedViewsRoute = (extraHttpRequestParams?: any): ng.IPromise<GetMobileProtectedViews> => {
          const localVarPath = this.apiUrl + '/accounts/mobile-permissions/protected-views';

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
      public getRegistrationStatusByMsisdnRoute = (msisdn: string, extraHttpRequestParams?: any): ng.IPromise<GetRegistrationStatus> => {
          const localVarPath = this.apiUrl + '/accounts/check';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'msisdn' is not null or undefined
          if (msisdn === null || msisdn === undefined) {
              throw new Error('Required parameter msisdn was null or undefined when calling getRegistrationStatusByMsisdnRoute.');
          }
          if (msisdn !== undefined) {
              queryParameters['msisdn'] = msisdn;
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
      public getSupportedCountriesRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<Country>> => {
          const localVarPath = this.apiUrl + '/accounts/settings/countries';

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
      public listAccountsRoute = (extraHttpRequestParams?: any): ng.IPromise<Array<Account>> => {
          const localVarPath = this.apiUrl + '/accounts';

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
      public newMsisdnVerificationRoute = (body: CreateMsisdnVerificationRequest, extraHttpRequestParams?: any): ng.IPromise<JValue> => {
          const localVarPath = this.apiUrl + '/accounts/settings/msisdn-verification/create';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling newMsisdnVerificationRoute.');
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
      public partialUpdateAccountRoute = (accountId: string, body: PatchAccount, extraHttpRequestParams?: any): ng.IPromise<Account> => {
          const localVarPath = this.apiUrl + '/accounts/{accountId}'
              .replace('{' + 'accountId' + '}', String(accountId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'accountId' is not null or undefined
          if (accountId === null || accountId === undefined) {
              throw new Error('Required parameter accountId was null or undefined when calling partialUpdateAccountRoute.');
          }
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling partialUpdateAccountRoute.');
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
      public patchMobileViewsPermissionsRoute = (body: PatchMobileViewsPermissions, extraHttpRequestParams?: any): ng.IPromise<Account> => {
          const localVarPath = this.apiUrl + '/accounts/mobile-permissions';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling patchMobileViewsPermissionsRoute.');
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
      public postAccountVerifyEmailRoute = (token: string, extraHttpRequestParams?: any): ng.IPromise<AccountWithExtras> => {
          const localVarPath = this.apiUrl + '/accounts/confirm/email/{token}'
              .replace('{' + 'token' + '}', String(token));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'token' is not null or undefined
          if (token === null || token === undefined) {
              throw new Error('Required parameter token was null or undefined when calling postAccountVerifyEmailRoute.');
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
      public postCompanyInfoRoute = (body: PostCompanyInfo, extraHttpRequestParams?: any): ng.IPromise<CompanyInfo> => {
          const localVarPath = this.apiUrl + '/accounts/settings/company-info';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postCompanyInfoRoute.');
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
      public postMobilePinRoute = (body: PostMobileViewsPermissions, extraHttpRequestParams?: any): ng.IPromise<Account> => {
          const localVarPath = this.apiUrl + '/accounts/mobile-permissions';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling postMobilePinRoute.');
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
      public putGeneralSettingsRoute = (body: PutGeneralSettings, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/accounts/settings/general';

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling putGeneralSettingsRoute.');
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
      public updateAccountRoute = (accountId: string, body: UpdateAccount, extraHttpRequestParams?: any): ng.IPromise<Account> => {
          const localVarPath = this.apiUrl + '/accounts/{accountId}'
              .replace('{' + 'accountId' + '}', String(accountId));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'accountId' is not null or undefined
          if (accountId === null || accountId === undefined) {
              throw new Error('Required parameter accountId was null or undefined when calling updateAccountRoute.');
          }
          // verify required parameter 'body' is not null or undefined
          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling updateAccountRoute.');
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
      public validateMobilePinRoute = (pin: string, extraHttpRequestParams?: any): ng.IPromise<{}> => {
          const localVarPath = this.apiUrl + '/accounts/mobile-permissions/{pin}'
              .replace('{' + 'pin' + '}', String(pin));

          let queryParameters: any = {};
          //let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
          // verify required parameter 'pin' is not null or undefined
          if (pin === null || pin === undefined) {
              throw new Error('Required parameter pin was null or undefined when calling validateMobilePinRoute.');
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

  export interface IAccountApiMock {
    addAccountRoute(status: number, data?: Account, err?: any): void
    changePasswordRoute(status: number, data?: {}, err?: any): void
    confirmMsisdnVerificationRoute(status: number, data?: {}, err?: any): void
    getAccountEmailExistsRoute(status: number, email: string, data?: {}, err?: any): void
    getAccountRoute(status: number, accountId: string, data?: AccountWithExtras, err?: any): void
    getCompanyInfoRoute(status: number, data?: CompanyInfo, err?: any): void
    getMobileProtectedViewsRoute(status: number, data?: GetMobileProtectedViews, err?: any): void
    getRegistrationStatusByMsisdnRoute(status: number, msisdn: string, data?: GetRegistrationStatus, err?: any): void
    getSupportedCountriesRoute(status: number, data?: Array<Country>, err?: any): void
    listAccountsRoute(status: number, data?: Array<Account>, err?: any): void
    newMsisdnVerificationRoute(status: number, data?: JValue, err?: any): void
    partialUpdateAccountRoute(status: number, accountId: string, data?: Account, err?: any): void
    patchMobileViewsPermissionsRoute(status: number, data?: Account, err?: any): void
    postAccountVerifyEmailRoute(status: number, token: string, data?: AccountWithExtras, err?: any): void
    postCompanyInfoRoute(status: number, data?: CompanyInfo, err?: any): void
    postMobilePinRoute(status: number, data?: Account, err?: any): void
    putGeneralSettingsRoute(status: number, data?: {}, err?: any): void
    updateAccountRoute(status: number, accountId: string, data?: Account, err?: any): void
    validateMobilePinRoute(status: number, pin: string, data?: {}, err?: any): void
  }

  /* istanbul ignore next */
  class AccountApiMock implements IAccountApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    addAccountRoute(status: number, data?: Account, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    changePasswordRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/settings/change-password';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    confirmMsisdnVerificationRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/settings/msisdn-verification/confirm';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getAccountEmailExistsRoute(status: number, email: string, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/exists/email/{email}'
          .replace('{' + 'email' + '}', String(email));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getAccountRoute(status: number, accountId: string, data?: AccountWithExtras, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/{accountId}'
          .replace('{' + 'accountId' + '}', String(accountId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getCompanyInfoRoute(status: number, data?: CompanyInfo, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/settings/company-info';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getMobileProtectedViewsRoute(status: number, data?: GetMobileProtectedViews, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/mobile-permissions/protected-views';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getRegistrationStatusByMsisdnRoute(status: number, msisdn: string, data?: GetRegistrationStatus, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/check';

      const queryParameters: any = {}
      if (msisdn !== undefined) {
        queryParameters['msisdn'] = msisdn;
      }
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    getSupportedCountriesRoute(status: number, data?: Array<Country>, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/settings/countries';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    listAccountsRoute(status: number, data?: Array<Account>, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    newMsisdnVerificationRoute(status: number, data?: JValue, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/settings/msisdn-verification/create';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    partialUpdateAccountRoute(status: number, accountId: string, data?: Account, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/{accountId}'
          .replace('{' + 'accountId' + '}', String(accountId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPATCH(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    patchMobileViewsPermissionsRoute(status: number, data?: Account, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/mobile-permissions';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPATCH(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postAccountVerifyEmailRoute(status: number, token: string, data?: AccountWithExtras, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/confirm/email/{token}'
          .replace('{' + 'token' + '}', String(token));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postCompanyInfoRoute(status: number, data?: CompanyInfo, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/settings/company-info';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    postMobilePinRoute(status: number, data?: Account, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/mobile-permissions';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    putGeneralSettingsRoute(status: number, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/settings/general';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    updateAccountRoute(status: number, accountId: string, data?: Account, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/{accountId}'
          .replace('{' + 'accountId' + '}', String(accountId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    validateMobilePinRoute(status: number, pin: string, data?: {}, err?: any): void {
      const localVarPath = this.apiUrl + '/accounts/mobile-permissions/{pin}'
          .replace('{' + 'pin' + '}', String(pin));

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

  angular.module('profitelo.api.AccountApi', [])
    .service('AccountApi', AccountApi)
    .service('AccountApiMock', AccountApiMock)
}
