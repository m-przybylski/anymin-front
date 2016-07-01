/* istanbul ignore next */
(function(angular) {
  'use strict';

  var moduleName = 'profitelo.swaggerResources';

  angular
    .module(moduleName, ['ngResource'])
    .provider('$resourceActionConfig', function () {
      var actionConfigs = {$global: {}};

      this.addActionConfig = function (resourceName, actionName, config) {
        if (arguments.length === 1) {
          actionConfigs.$global = resourceName; // resourceName === config
          return this;
        } else if (arguments.length === 2) {
          config = actionName;
          actionName = '$global';
        }

        actionConfigs[resourceName] = actionConfigs[resourceName] || {};
        actionConfigs[resourceName][actionName] = config;
        return this;
      };

      this.$get = function () {
        return function (resourceName, actionName) {
          return actionConfigs[resourceName]
            ? (actionConfigs[resourceName][actionName] || actionConfigs[resourceName].$global)
            : actionConfigs.$global;
        };
      };
    })
    .provider('RecoverPasswordApi', function() {

      /**
      * @ngdoc service
      * @name .RecoverPassword
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:postRecoverPassword
          * @methodOf .0
          * @description
          * Create recover password
          **/

          'postRecoverPassword': angular.extend({
            method: 'POST',
            url: apiUrl + '/recover-password',
          }, $resourceActionConfig('0', 'postRecoverPassword')),

          /**
          * @ngdoc method
          * @name .1.method:putRecoverPasswordEmail
          * @methodOf .1
          * @description
          * Update password
          **/

          'putRecoverPasswordEmail': angular.extend({
            method: 'PUT',
            url: apiUrl + '/recover-password/email',
          }, $resourceActionConfig('1', 'putRecoverPasswordEmail')),

          /**
          * @ngdoc method
          * @name .2.method:postRecoverPasswordVerifyMsisdn
          * @methodOf .2
          * @description
          * Verify Msisdn token
          **/

          'postRecoverPasswordVerifyMsisdn': angular.extend({
            method: 'POST',
            url: apiUrl + '/recover-password/verify/msisdn',
          }, $resourceActionConfig('2', 'postRecoverPasswordVerifyMsisdn')),

          /**
          * @ngdoc method
          * @name .3.method:postRecoverPasswordVerifyEmail
          * @methodOf .3
          * @description
          * Verify email token
          **/

          'postRecoverPasswordVerifyEmail': angular.extend({
            method: 'POST',
            url: apiUrl + '/recover-password/verify/email',
          }, $resourceActionConfig('3', 'postRecoverPasswordVerifyEmail')),

          /**
          * @ngdoc method
          * @name .4.method:putRecoverPasswordMsisdn
          * @methodOf .4
          * @description
          * Update password
          **/

          'putRecoverPasswordMsisdn': angular.extend({
            method: 'PUT',
            url: apiUrl + '/recover-password/msisdn',
          }, $resourceActionConfig('4', 'putRecoverPasswordMsisdn')),
        });
      }];
    })
        .provider('FilesApi', function() {

      /**
      * @ngdoc service
      * @name .Files
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:profileGalleryPath
          * @methodOf .0
          * @description
          * Get profile gallery files
          **/

          'profileGalleryPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/gallery',
            params: {
              'profileId': '@profileId',
            },
          }, $resourceActionConfig('0', 'profileGalleryPath')),

          /**
          * @ngdoc method
          * @name .1.method:updateFilePath
          * @methodOf .1
          * @description
          * Update file
          **/

          'updateFilePath': angular.extend({
            method: 'PUT',
            url: apiUrl + '/files/:token',
            params: {
              'token': '@token',
            },
          }, $resourceActionConfig('1', 'updateFilePath')),

          /**
          * @ngdoc method
          * @name .2.method:fileInfoPath
          * @methodOf .2
          * @description
          * Get details of file
          **/

          'fileInfoPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files/:token',
            params: {
              'token': '@token',
            },
          }, $resourceActionConfig('2', 'fileInfoPath')),

          /**
          * @ngdoc method
          * @name .3.method:serviceGalleryPath
          * @methodOf .3
          * @description
          * Get service gallery files
          **/

          'serviceGalleryPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/services/:serviceId/gallery',
            params: {
              'serviceId': '@serviceId',
            },
          }, $resourceActionConfig('3', 'serviceGalleryPath')),

          /**
          * @ngdoc method
          * @name .4.method:downloadResizedFilePath
          * @methodOf .4
          * @description
          * Download resized file
          **/

          'downloadResizedFilePath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files/:token/download/:widthx:height',
            params: {
              'token': '@token',
              'width': '@width',
              'height': '@height',
            },
          }, $resourceActionConfig('4', 'downloadResizedFilePath')),

          /**
          * @ngdoc method
          * @name .5.method:downloadFilePath
          * @methodOf .5
          * @description
          * Download file
          **/

          'downloadFilePath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files/:token/download',
            params: {
              'token': '@token',
            },
          }, $resourceActionConfig('5', 'downloadFilePath')),

          /**
          * @ngdoc method
          * @name .6.method:profileAvatarsPath
          * @methodOf .6
          * @description
          * Get profile avatar files
          **/

          'profileAvatarsPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/avatars',
            params: {
              'profileId': '@profileId',
            },
          }, $resourceActionConfig('6', 'profileAvatarsPath')),

          /**
          * @ngdoc method
          * @name .7.method:listFilesPath
          * @methodOf .7
          * @description
          * List all files
          **/

          'listFilesPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files',
          }, $resourceActionConfig('7', 'listFilesPath')),

          /**
          * @ngdoc method
          * @name .8.method:tokenPath
          * @methodOf .8
          * @description
          * Get file upload url
          **/

          'tokenPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files/token',
          }, $resourceActionConfig('8', 'tokenPath')),

          /**
          * @ngdoc method
          * @name .9.method:profileCoversPath
          * @methodOf .9
          * @description
          * Get profile cover files
          **/

          'profileCoversPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/covers',
            params: {
              'profileId': '@profileId',
            },
          }, $resourceActionConfig('9', 'profileCoversPath')),

          /**
          * @ngdoc method
          * @name .10.method:uploadFilePath
          * @methodOf .10
          * @description
          * Upload file
          **/

          'uploadFilePath': angular.extend({
            method: 'POST',
            url: apiUrl + '/files/:token/upload',
            params: {
              'token': '@token',
            },
          }, $resourceActionConfig('10', 'uploadFilePath')),
        });
      }];
    })
        .provider('SearchApi', function() {

      /**
      * @ngdoc service
      * @name .Search
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:searchSuggestions
          * @methodOf .0
          * @description
          * Get search suggestions
          **/

          'searchSuggestions': angular.extend({
            method: 'GET',
            url: apiUrl + '/search/suggestions',
            params: {
              'q': '@q',
              'type': '@type',
            },
          }, $resourceActionConfig('0', 'searchSuggestions')),

          /**
          * @ngdoc method
          * @name .1.method:search
          * @methodOf .1
          * @description
          * Search for services
          **/

          'search': angular.extend({
            method: 'GET',
            url: apiUrl + '/search',
            params: {
              'q': '@q',
              'service.name': '@service.name',
              'profile.name': '@profile.name',
              'profile.desc': '@profile.desc',
              'tag.id': '@tag.id',
              'service.category.id': '@service.category.id',
              'profile.type': '@profile.type',
              'onlyAvailable': '@onlyAvailable',
              'sortBy': '@sortBy',
              'language': '@language',
              'offset': '@offset',
              'limit': '@limit',
            },
          }, $resourceActionConfig('1', 'search')),
        });
      }];
    })
        .provider('AccountApi', function() {

      /**
      * @ngdoc service
      * @name .Account
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:addAccount
          * @methodOf .0
          * @description
          * Create account
          **/

          'addAccount': angular.extend({
            method: 'POST',
            url: apiUrl + '/accounts',
          }, $resourceActionConfig('0', 'addAccount')),

          /**
          * @ngdoc method
          * @name .1.method:listAccounts
          * @methodOf .1
          * @description
          * List accounts
          **/

          'listAccounts': angular.extend({
            method: 'GET',
            url: apiUrl + '/accounts',
            isArray: true,
          }, $resourceActionConfig('1', 'listAccounts')),

          /**
          * @ngdoc method
          * @name .2.method:postAccountVerifyEmail
          * @methodOf .2
          * @description
          * Confirm email
          **/

          'postAccountVerifyEmail': angular.extend({
            method: 'POST',
            url: apiUrl + '/accounts/confirm/email/:token',
            params: {
              'token': '@token',
            },
          }, $resourceActionConfig('2', 'postAccountVerifyEmail')),

          /**
          * @ngdoc method
          * @name .3.method:getAccountEmailExists
          * @methodOf .3
          * @description
          * Check if email is taken
          **/

          'getAccountEmailExists': angular.extend({
            method: 'GET',
            url: apiUrl + '/accounts/exists/email/:email',
            params: {
              'email': '@email',
            },
          }, $resourceActionConfig('3', 'getAccountEmailExists')),

          /**
          * @ngdoc method
          * @name .4.method:partialUpdateAccount
          * @methodOf .4
          * @description
          * Partial update account
          **/

          'partialUpdateAccount': angular.extend({
            method: 'PATCH',
            url: apiUrl + '/accounts/:accountId',
            params: {
              'accountId': '@accountId',
            },
          }, $resourceActionConfig('4', 'partialUpdateAccount')),

          /**
          * @ngdoc method
          * @name .5.method:updateAccount
          * @methodOf .5
          * @description
          * Update account
          **/

          'updateAccount': angular.extend({
            method: 'PUT',
            url: apiUrl + '/accounts/:accountId',
            params: {
              'accountId': '@accountId',
            },
          }, $resourceActionConfig('5', 'updateAccount')),

          /**
          * @ngdoc method
          * @name .6.method:getAccount
          * @methodOf .6
          * @description
          * Retrieve account by id
          **/

          'getAccount': angular.extend({
            method: 'GET',
            url: apiUrl + '/accounts/:accountId',
            params: {
              'accountId': '@accountId',
            },
          }, $resourceActionConfig('6', 'getAccount')),

          /**
          * @ngdoc method
          * @name .7.method:getRegistrationStatusByMsisdn
          * @methodOf .7
          * @description
          * Retrieve
          **/

          'getRegistrationStatusByMsisdn': angular.extend({
            method: 'GET',
            url: apiUrl + '/accounts/check',
            params: {
              'msisdn': '@msisdn',
            },
          }, $resourceActionConfig('7', 'getRegistrationStatusByMsisdn')),
        });
      }];
    })
        .provider('ServiceApi', function() {

      /**
      * @ngdoc service
      * @name .Service
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:getUserServicesPath
          * @methodOf .0
          * @description
          * Get Details of services of users
          **/

          'getUserServicesPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/services/profile/:accountId',
            params: {
              'accountId': '@accountId',
            },
          }, $resourceActionConfig('0', 'getUserServicesPath')),

          /**
          * @ngdoc method
          * @name .1.method:postService
          * @methodOf .1
          * @description
          * Create a service
          **/

          'postService': angular.extend({
            method: 'POST',
            url: apiUrl + '/services',
          }, $resourceActionConfig('1', 'postService')),

          /**
          * @ngdoc method
          * @name .2.method:postServicesVerify
          * @methodOf .2
          * @description
          * Verify services
          **/

          'postServicesVerify': angular.extend({
            method: 'POST',
            url: apiUrl + '/services/verify',
          }, $resourceActionConfig('2', 'postServicesVerify')),

          /**
          * @ngdoc method
          * @name .3.method:deleteService
          * @methodOf .3
          * @description
          * Remove service by id
          **/

          'deleteService': angular.extend({
            method: 'DELETE',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          }, $resourceActionConfig('3', 'deleteService')),

          /**
          * @ngdoc method
          * @name .4.method:putService
          * @methodOf .4
          * @description
          * Update Details of a service
          **/

          'putService': angular.extend({
            method: 'PUT',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          }, $resourceActionConfig('4', 'putService')),

          /**
          * @ngdoc method
          * @name .5.method:getService
          * @methodOf .5
          * @description
          * Get Details of a service
          **/

          'getService': angular.extend({
            method: 'GET',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          }, $resourceActionConfig('5', 'getService')),
        });
      }];
    })
        .provider('EmploymentApi', function() {

      /**
      * @ngdoc service
      * @name .Employment
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:postEmployments
          * @methodOf .0
          * @description
          * Invite employees
          **/

          'postEmployments': angular.extend({
            method: 'POST',
            url: apiUrl + '/employments',
          }, $resourceActionConfig('0', 'postEmployments')),

          /**
          * @ngdoc method
          * @name .1.method:postEmploymentsAccept
          * @methodOf .1
          * @description
          * Accept employment invitation
          **/

          'postEmploymentsAccept': angular.extend({
            method: 'POST',
            url: apiUrl + '/employments/:employmentId/accept',
            params: {
              'body': '@body',
            },
          }, $resourceActionConfig('1', 'postEmploymentsAccept')),

          /**
          * @ngdoc method
          * @name .2.method:postEmploymentsReject
          * @methodOf .2
          * @description
          * Reject employment invitation
          **/

          'postEmploymentsReject': angular.extend({
            method: 'POST',
            url: apiUrl + '/employments/:employmentId/reject',
            params: {
              'body': '@body',
            },
          }, $resourceActionConfig('2', 'postEmploymentsReject')),
        });
      }];
    })
        .provider('ProfileApi', function() {

      /**
      * @ngdoc service
      * @name .Profile
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:getProfilesInvitations
          * @methodOf .0
          * @description
          * Get all invitations
          **/

          'getProfilesInvitations': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/invitations',
            isArray: true,
          }, $resourceActionConfig('0', 'getProfilesInvitations')),

          /**
          * @ngdoc method
          * @name .1.method:postProfile
          * @methodOf .1
          * @description
          * Add profile
          **/

          'postProfile': angular.extend({
            method: 'POST',
            url: apiUrl + '/profiles',
          }, $resourceActionConfig('1', 'postProfile')),

          /**
          * @ngdoc method
          * @name .2.method:putProfile
          * @methodOf .2
          * @description
          * Add profile
          **/

          'putProfile': angular.extend({
            method: 'PUT',
            url: apiUrl + '/profiles',
          }, $resourceActionConfig('2', 'putProfile')),

          /**
          * @ngdoc method
          * @name .3.method:getProfile
          * @methodOf .3
          * @description
          * Get Details of profile
          **/

          'getProfile': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:profileId',
            params: {
              'profileId': '@profileId',
            },
          }, $resourceActionConfig('3', 'getProfile')),

          /**
          * @ngdoc method
          * @name .4.method:getProfileWithServices
          * @methodOf .4
          * @description
          * Get Details of profile with services
          **/

          'getProfileWithServices': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/services',
            params: {
              'profileId': '@profileId',
            },
          }, $resourceActionConfig('4', 'getProfileWithServices')),
        });
      }];
    })
        .provider('RegistrationApi', function() {

      /**
      * @ngdoc service
      * @name .Registration
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:requestVerification
          * @methodOf .0
          * @description
          * Request msisdn verification
          **/

          'requestVerification': angular.extend({
            method: 'POST',
            url: apiUrl + '/msisdns/verify',
          }, $resourceActionConfig('0', 'requestVerification')),

          /**
          * @ngdoc method
          * @name .1.method:verifyVerification
          * @methodOf .1
          * @description
          * Confirm msisdn verification
          **/

          'verifyVerification': angular.extend({
            method: 'POST',
            url: apiUrl + '/msisdns/verify/code',
          }, $resourceActionConfig('1', 'verifyVerification')),

          /**
          * @ngdoc method
          * @name .2.method:confirmVerification
          * @methodOf .2
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': angular.extend({
            method: 'POST',
            url: apiUrl + '/msisdns/code',
          }, $resourceActionConfig('2', 'confirmVerification')),
        });
      }];
    })
        .provider('MsisdnApi', function() {

      /**
      * @ngdoc service
      * @name .Msisdn
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:requestVerification
          * @methodOf .0
          * @description
          * Request msisdn verification
          **/

          'requestVerification': angular.extend({
            method: 'POST',
            url: apiUrl + '/msisdns/verify',
          }, $resourceActionConfig('0', 'requestVerification')),

          /**
          * @ngdoc method
          * @name .1.method:verifyVerification
          * @methodOf .1
          * @description
          * Confirm msisdn verification
          **/

          'verifyVerification': angular.extend({
            method: 'POST',
            url: apiUrl + '/msisdns/verify/code',
          }, $resourceActionConfig('1', 'verifyVerification')),

          /**
          * @ngdoc method
          * @name .2.method:confirmVerification
          * @methodOf .2
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': angular.extend({
            method: 'POST',
            url: apiUrl + '/msisdns/code',
          }, $resourceActionConfig('2', 'confirmVerification')),
        });
      }];
    })
        .provider('CategoryApi', function() {

      /**
      * @ngdoc service
      * @name .Category
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:listCategories
          * @methodOf .0
          * @description
          * List categories
          **/

          'listCategories': angular.extend({
            method: 'GET',
            url: apiUrl + '/categories',
            isArray: true,
          }, $resourceActionConfig('0', 'listCategories')),
        });
      }];
    })
        .provider('SessionApi', function() {

      /**
      * @ngdoc service
      * @name .Session
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:login
          * @methodOf .0
          * @description
          * Login with username and password
          **/

          'login': angular.extend({
            method: 'POST',
            url: apiUrl + '/session',
          }, $resourceActionConfig('0', 'login')),

          /**
          * @ngdoc method
          * @name .1.method:logout
          * @methodOf .1
          * @description
          * Logout
          **/

          'logout': angular.extend({
            method: 'DELETE',
            url: apiUrl + '/session',
          }, $resourceActionConfig('1', 'logout')),

          /**
          * @ngdoc method
          * @name .2.method:check
          * @methodOf .2
          * @description
          * Check login state
          **/

          'check': angular.extend({
            method: 'GET',
            url: apiUrl + '/session',
          }, $resourceActionConfig('2', 'check')),
        });
      }];
    })
    ;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = moduleName;
        }
        exports = moduleName;
    }
}(angular));
