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
          * @name .1.method:putRecoverPasswordEmail
          * @methodOf .1
          * @description
          * Update password
          **/

          'putRecoverPasswordEmail': {
            method: 'PUT',
            url: apiUrl + '/recover-password/email',
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
          * @name .3.method:postRecoverPasswordVerifyEmail
          * @methodOf .3
          * @description
          * Verify email token
          **/

          'postRecoverPasswordVerifyEmail': {
            method: 'POST',
            url: apiUrl + '/recover-password/verify/email',
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
          * @name .4.method:downloadResizedFilePath
          * @methodOf .4
          * @description
          * Download resized file
          **/

          'downloadResizedFilePath': {
            method: 'GET',
            url: apiUrl + '/files/:token/download/:widthx:height',
            params: {
              'token': '@token',
              'width': '@width',
              'height': '@height',
            },
          },

          /**
          * @ngdoc method
          * @name .5.method:downloadFilePath
          * @methodOf .5
          * @description
          * Download file
          **/

          'downloadFilePath': {
            method: 'GET',
            url: apiUrl + '/files/:token/download',
            params: {
              'token': '@token',
            },
          },

          /**
          * @ngdoc method
          * @name .6.method:profileAvatarsPath
          * @methodOf .6
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
          * @name .7.method:listFilesPath
          * @methodOf .7
          * @description
          * List all files
          **/

          'listFilesPath': {
            method: 'GET',
            url: apiUrl + '/files',
          },

          /**
          * @ngdoc method
          * @name .8.method:tokenPath
          * @methodOf .8
          * @description
          * Get file upload url
          **/

          'tokenPath': {
            method: 'GET',
            url: apiUrl + '/files/token',
          },

          /**
          * @ngdoc method
          * @name .9.method:profileCoversPath
          * @methodOf .9
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
          * @name .10.method:uploadFilePath
          * @methodOf .10
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
      * @name .Search
      * @requires $resource
      * @requires apiUrl
      **/
    .service('SearchApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:searchSuggestions
          * @methodOf .0
          * @description
          * Get search suggestions
          **/

          'searchSuggestions': {
            method: 'GET',
            url: apiUrl + '/search/suggestions',
            params: {
              'q': '@q',
              'type': '@type',
            },
          },

          /**
          * @ngdoc method
          * @name .1.method:search
          * @methodOf .1
          * @description
          * Search for services
          **/

          'search': {
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
          * @name .3.method:getAccountEmailExists
          * @methodOf .3
          * @description
          * Check if email is taken
          **/

          'getAccountEmailExists': {
            method: 'GET',
            url: apiUrl + '/accounts/exists/email/:email',
            params: {
              'email': '@email',
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
          },

          /**
          * @ngdoc method
          * @name .7.method:getRegistrationStatusByMsisdn
          * @methodOf .7
          * @description
          * Retrieve
          **/

          'getRegistrationStatusByMsisdn': {
            method: 'GET',
            url: apiUrl + '/accounts/check',
            params: {
              'msisdn': '@msisdn',
            },
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
          * @name .0.method:getUserServicesPath
          * @methodOf .0
          * @description
          * Get Details of services of users
          **/

          'getUserServicesPath': {
            method: 'GET',
            url: apiUrl + '/services/profile/:accountId',
            params: {
              'accountId': '@accountId',
            },
          },

          /**
          * @ngdoc method
          * @name .1.method:postService
          * @methodOf .1
          * @description
          * Create a service
          **/

          'postService': {
            method: 'POST',
            url: apiUrl + '/services',
          },

          /**
          * @ngdoc method
          * @name .2.method:postServicesVerify
          * @methodOf .2
          * @description
          * Verify services
          **/

          'postServicesVerify': {
            method: 'POST',
            url: apiUrl + '/services/verify',
          },

          /**
          * @ngdoc method
          * @name .3.method:deleteService
          * @methodOf .3
          * @description
          * Remove service by id
          **/

          'deleteService': {
            method: 'DELETE',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          },

          /**
          * @ngdoc method
          * @name .4.method:putService
          * @methodOf .4
          * @description
          * Update Details of a service
          **/

          'putService': {
            method: 'PUT',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          },

          /**
          * @ngdoc method
          * @name .5.method:getService
          * @methodOf .5
          * @description
          * Get Details of a service
          **/

          'getService': {
            method: 'GET',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
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
          * @name .0.method:postEmployments
          * @methodOf .0
          * @description
          * Invite employees
          **/

          'postEmployments': {
            method: 'POST',
            url: apiUrl + '/employments',
          },

          /**
          * @ngdoc method
          * @name .1.method:postEmploymentsAccept
          * @methodOf .1
          * @description
          * Accept employment invitation
          **/

          'postEmploymentsAccept': {
            method: 'POST',
            url: apiUrl + '/employments/:employmentId/accept',
            params: {
              'body': '@body',
            },
          },

          /**
          * @ngdoc method
          * @name .2.method:postEmploymentsReject
          * @methodOf .2
          * @description
          * Reject employment invitation
          **/

          'postEmploymentsReject': {
            method: 'POST',
            url: apiUrl + '/employments/:employmentId/reject',
            params: {
              'body': '@body',
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
          * @name .0.method:getProfilesInvitations
          * @methodOf .0
          * @description
          * Get all invitations
          **/

          'getProfilesInvitations': {
            method: 'GET',
            url: apiUrl + '/profiles/invitations',
            isArray: true,
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
          },

          /**
          * @ngdoc method
          * @name .3.method:getProfile
          * @methodOf .3
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
          * @name .4.method:getProfileWithServices
          * @methodOf .4
          * @description
          * Get Details of profile with services
          **/

          'getProfileWithServices': {
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/services',
            params: {
              'profileId': '@profileId',
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
          * @name .0.method:requestVerification
          * @methodOf .0
          * @description
          * Request msisdn verification
          **/

          'requestVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify',
          },

          /**
          * @ngdoc method
          * @name .1.method:verifyVerification
          * @methodOf .1
          * @description
          * Confirm msisdn verification
          **/

          'verifyVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify/code',
          },

          /**
          * @ngdoc method
          * @name .2.method:confirmVerification
          * @methodOf .2
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/code',
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
          * @name .0.method:requestVerification
          * @methodOf .0
          * @description
          * Request msisdn verification
          **/

          'requestVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify',
          },

          /**
          * @ngdoc method
          * @name .1.method:verifyVerification
          * @methodOf .1
          * @description
          * Confirm msisdn verification
          **/

          'verifyVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify/code',
          },

          /**
          * @ngdoc method
          * @name .2.method:confirmVerification
          * @methodOf .2
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/code',
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Category
      * @requires $resource
      * @requires apiUrl
      **/
    .service('CategoryApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:listCategories
          * @methodOf .0
          * @description
          * List categories
          **/

          'listCategories': {
            method: 'GET',
            url: apiUrl + '/categories',
            isArray: true,
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
    ;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = moduleName;
        }
        exports = moduleName;
    }
}(angular));
