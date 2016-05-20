/* istanbul ignore next */
(function(angular) {
  'use strict';

  var moduleName = 'profitelo.swaggerResources.definitions';

  angular
    .module(moduleName, [])
    /**
      * @ngdoc service
      * @name .RecoverPassword
      * @requires $resource
      * @requires apiUrl
      **/
    .service('RecoverPasswordApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:postRecoverPassword
          * @methodOf .0
          * @description
          * Create recover password
          **/

          'postRecoverPassword': {
            method: 'POST',
            url: apiUrl + '/recover-password',
          },

          /**
          * @ngdoc method
          * @name .1.method:postRecoverPasswordVerifyEmail
          * @methodOf .1
          * @description
          * Verify email token
          **/

          'postRecoverPasswordVerifyEmail': {
            method: 'POST',
            url: apiUrl + '/recover-password/verify/email',
          },

          /**
          * @ngdoc method
          * @name .2.method:postRecoverPasswordVerifyMsisdn
          * @methodOf .2
          * @description
          * Verify Msisdn token
          **/

          'postRecoverPasswordVerifyMsisdn': {
            method: 'POST',
            url: apiUrl + '/recover-password/verify/msisdn',
          },

          /**
          * @ngdoc method
          * @name .3.method:putRecoverPasswordEmail
          * @methodOf .3
          * @description
          * Update password
          **/

          'putRecoverPasswordEmail': {
            method: 'PUT',
            url: apiUrl + '/recover-password/email',
          },

          /**
          * @ngdoc method
          * @name .4.method:putRecoverPasswordMsisdn
          * @methodOf .4
          * @description
          * Update password
          **/

          'putRecoverPasswordMsisdn': {
            method: 'PUT',
            url: apiUrl + '/recover-password/msisdn',
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Files
      * @requires $resource
      * @requires apiUrl
      **/
    .service('FilesApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:profileGalleryPath
          * @methodOf .0
          * @description
          * Get profile gallery files
          **/

          'profileGalleryPath': {
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/gallery',
            params: {
              'profileId': '@profileId',
            },
          },

          /**
          * @ngdoc method
          * @name .1.method:updateFilePath
          * @methodOf .1
          * @description
          * Update file
          **/

          'updateFilePath': {
            method: 'PUT',
            url: apiUrl + '/files/:token',
            params: {
              'token': '@token',
            },
          },

          /**
          * @ngdoc method
          * @name .2.method:fileInfoPath
          * @methodOf .2
          * @description
          * Get details of file
          **/

          'fileInfoPath': {
            method: 'GET',
            url: apiUrl + '/files/:token',
            params: {
              'token': '@token',
            },
          },

          /**
          * @ngdoc method
          * @name .3.method:serviceGalleryPath
          * @methodOf .3
          * @description
          * Get service gallery files
          **/

          'serviceGalleryPath': {
            method: 'GET',
            url: apiUrl + '/services/:serviceId/gallery',
            params: {
              'serviceId': '@serviceId',
            },
          },

          /**
          * @ngdoc method
          * @name .4.method:profileAvatarsPath
          * @methodOf .4
          * @description
          * Get profile avatar files
          **/

          'profileAvatarsPath': {
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/avatars',
            params: {
              'profileId': '@profileId',
            },
          },

          /**
          * @ngdoc method
          * @name .5.method:listFilesPath
          * @methodOf .5
          * @description
          * List all files
          **/

          'listFilesPath': {
            method: 'GET',
            url: apiUrl + '/files',
          },

          /**
          * @ngdoc method
          * @name .6.method:tokenPath
          * @methodOf .6
          * @description
          * Get file upload url
          **/

          'tokenPath': {
            method: 'GET',
            url: apiUrl + '/files/token',
          },

          /**
          * @ngdoc method
          * @name .7.method:profileCoversPath
          * @methodOf .7
          * @description
          * Get profile cover files
          **/

          'profileCoversPath': {
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/covers',
            params: {
              'profileId': '@profileId',
            },
          },

          /**
          * @ngdoc method
          * @name .8.method:uploadFilePath
          * @methodOf .8
          * @description
          * Upload file
          **/

          'uploadFilePath': {
            method: 'POST',
            url: apiUrl + '/files/:token/upload',
            params: {
              'token': '@token',
            },
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Registration
      * @requires $resource
      * @requires apiUrl
      **/
    .service('RegistrationApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:confirmVerification
          * @methodOf .0
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/code',
          },

          /**
          * @ngdoc method
          * @name .1.method:requestVerification
          * @methodOf .1
          * @description
          * Request msisdn verification
          **/

          'requestVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify',
          },

          /**
          * @ngdoc method
          * @name .2.method:verifyVerification
          * @methodOf .2
          * @description
          * Confirm msisdn verification
          **/

          'verifyVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify/code',
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Msisdn
      * @requires $resource
      * @requires apiUrl
      **/
    .service('MsisdnApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:confirmVerification
          * @methodOf .0
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/code',
          },

          /**
          * @ngdoc method
          * @name .1.method:addPath
          * @methodOf .1
          * @description
          * Add new msisdn
          **/

          'addPath': {
            method: 'POST',
            url: apiUrl + '/msisdns',
          },

          /**
          * @ngdoc method
          * @name .2.method:requestVerification
          * @methodOf .2
          * @description
          * Request msisdn verification
          **/

          'requestVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify',
          },

          /**
          * @ngdoc method
          * @name .3.method:verifyVerification
          * @methodOf .3
          * @description
          * Confirm msisdn verification
          **/

          'verifyVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify/code',
          },

          /**
          * @ngdoc method
          * @name .4.method:patchPath
          * @methodOf .4
          * @description
          * Update status msisdn
          **/

          'patchPath': {
            method: 'PATCH',
            url: apiUrl + '/msisdns/:msisdnId',
            params: {
              'msisdnId': '@msisdnId',
            },
          },

          /**
          * @ngdoc method
          * @name .5.method:deletePath
          * @methodOf .5
          * @description
          * Delete msisdn
          **/

          'deletePath': {
            method: 'DELETE',
            url: apiUrl + '/msisdns/:msisdnId',
            params: {
              'msisdnId': '@msisdnId',
            },
          },

          /**
          * @ngdoc method
          * @name .6.method:updatePath
          * @methodOf .6
          * @description
          * Update msisdn
          **/

          'updatePath': {
            method: 'PUT',
            url: apiUrl + '/msisdns/:msisdnId',
            params: {
              'msisdnId': '@msisdnId',
            },
          },

          /**
          * @ngdoc method
          * @name .7.method:detailsPath
          * @methodOf .7
          * @description
          * Get Details of msisdn
          **/

          'detailsPath': {
            method: 'GET',
            url: apiUrl + '/msisdns/:msisdnId',
            params: {
              'msisdnId': '@msisdnId',
            },
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Account
      * @requires $resource
      * @requires apiUrl
      **/
    .service('AccountApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:addAccount
          * @methodOf .0
          * @description
          * Create account
          **/

          'addAccount': {
            method: 'POST',
            url: apiUrl + '/accounts',
          },

          /**
          * @ngdoc method
          * @name .1.method:listAccounts
          * @methodOf .1
          * @description
          * List accounts
          **/

          'listAccounts': {
            method: 'GET',
            url: apiUrl + '/accounts',
            isArray: true,
          },

          /**
          * @ngdoc method
          * @name .2.method:postAccountVerifyEmail
          * @methodOf .2
          * @description
          * Confirm email
          **/

          'postAccountVerifyEmail': {
            method: 'POST',
            url: apiUrl + '/accounts/confirm/email/:token',
            params: {
              'token': '@token',
            },
          },

          /**
          * @ngdoc method
          * @name .3.method:getRegistrationStatusByMsisdn
          * @methodOf .3
          * @description
          * Retrieve
          **/

          'getRegistrationStatusByMsisdn': {
            method: 'GET',
            url: apiUrl + '/accounts/check',
            params: {
              'msisdn': '@msisdn',
            },
          },

          /**
          * @ngdoc method
          * @name .4.method:partialUpdateAccount
          * @methodOf .4
          * @description
          * Partial update account
          **/

          'partialUpdateAccount': {
            method: 'PATCH',
            url: apiUrl + '/accounts/:accountId',
            params: {
              'accountId': '@accountId',
            },
          },

          /**
          * @ngdoc method
          * @name .5.method:updateAccount
          * @methodOf .5
          * @description
          * Update account
          **/

          'updateAccount': {
            method: 'PUT',
            url: apiUrl + '/accounts/:accountId',
            params: {
              'accountId': '@accountId',
            },
          },

          /**
          * @ngdoc method
          * @name .6.method:getAccount
          * @methodOf .6
          * @description
          * Retrieve account by id
          **/

          'getAccount': {
            method: 'GET',
            url: apiUrl + '/accounts/:accountId',
            params: {
              'accountId': '@accountId',
            },
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Profile
      * @requires $resource
      * @requires apiUrl
      **/
    .service('ProfileApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:getProfile
          * @methodOf .0
          * @description
          * Get Details of profile
          **/

          'getProfile': {
            method: 'GET',
            url: apiUrl + '/profiles/:profileId',
            params: {
              'profileId': '@profileId',
            },
          },

          /**
          * @ngdoc method
          * @name .1.method:postProfile
          * @methodOf .1
          * @description
          * Add profile
          **/

          'postProfile': {
            method: 'POST',
            url: apiUrl + '/profiles',
          },

          /**
          * @ngdoc method
          * @name .2.method:putProfile
          * @methodOf .2
          * @description
          * Add profile
          **/

          'putProfile': {
            method: 'PUT',
            url: apiUrl + '/profiles',
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Session
      * @requires $resource
      * @requires apiUrl
      **/
    .service('SessionApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:login
          * @methodOf .0
          * @description
          * Login with username and password
          **/

          'login': {
            method: 'POST',
            url: apiUrl + '/session',
          },

          /**
          * @ngdoc method
          * @name .1.method:logout
          * @methodOf .1
          * @description
          * Logout
          **/

          'logout': {
            method: 'DELETE',
            url: apiUrl + '/session',
          },

          /**
          * @ngdoc method
          * @name .2.method:check
          * @methodOf .2
          * @description
          * Check login state
          **/

          'check': {
            method: 'GET',
            url: apiUrl + '/session',
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Employment
      * @requires $resource
      * @requires apiUrl
      **/
    .service('EmploymentApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:profileCreationRequestPath
          * @methodOf .0
          * @description
          * Create profile creation requests
          **/

          'profileCreationRequestPath': {
            method: 'POST',
            url: apiUrl + '/employments',
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Service
      * @requires $resource
      * @requires apiUrl
      **/
    .service('ServiceApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:postPath
          * @methodOf .0
          * @description
          * Create a service
          **/

          'postPath': {
            method: 'POST',
            url: apiUrl + '/services',
          },

          /**
          * @ngdoc method
          * @name .1.method:putPath
          * @methodOf .1
          * @description
          * Update Details of a service
          **/

          'putPath': {
            method: 'PUT',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          },

          /**
          * @ngdoc method
          * @name .2.method:getPath
          * @methodOf .2
          * @description
          * Get Details of a service
          **/

          'getPath': {
            method: 'GET',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          }
        };
    }])
    ;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = moduleName;
        }
        exports = moduleName;
    }
}(angular));
