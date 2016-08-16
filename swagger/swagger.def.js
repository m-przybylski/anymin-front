/* istanbul ignore next */
(function(angular) {
  'use strict';

  var moduleName = 'profitelo.swaggerResources.definitions';

  angular
    .module(moduleName, [])
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
          * @name .0.method:getProfileServices
          * @methodOf .0
          * @description
          * Get Details of services of users
          **/

          'getProfileServices': {
            method: 'GET',
            url: apiUrl + '/services/profile/:accountId',
            params: {
              'accountId': '@accountId',
            },
            isArray: true,
          },

          /**
          * @ngdoc method
          * @name .1.method:postServicesVerify
          * @methodOf .1
          * @description
          * Verify services
          **/

          'postServicesVerify': {
            method: 'POST',
            url: apiUrl + '/services/verify',
          },

          /**
          * @ngdoc method
          * @name .2.method:addServiceUsageRequest
          * @methodOf .2
          * @description
          * Request usage of service
          **/

          'addServiceUsageRequest': {
            method: 'POST',
            url: apiUrl + '/services/:serviceId/usage-request',
            params: {
              'serviceId': '@serviceId',
            },
          },

          /**
          * @ngdoc method
          * @name .3.method:getService
          * @methodOf .3
          * @description
          * Get Details of a service
          **/

          'getService': {
            method: 'GET',
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
          * @name .5.method:deleteService
          * @methodOf .5
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
          * @name .6.method:postServicesTags
          * @methodOf .6
          * @description
          * Get services tags
          **/

          'postServicesTags': {
            method: 'POST',
            url: apiUrl + '/services/tags',
            isArray: true,
          },

          /**
          * @ngdoc method
          * @name .7.method:postService
          * @methodOf .7
          * @description
          * Create a service
          **/

          'postService': {
            method: 'POST',
            url: apiUrl + '/services',
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
          * @name .0.method:postProfile
          * @methodOf .0
          * @description
          * Add profile
          **/

          'postProfile': {
            method: 'POST',
            url: apiUrl + '/profiles',
          },

          /**
          * @ngdoc method
          * @name .1.method:putProfile
          * @methodOf .1
          * @description
          * Add profile
          **/

          'putProfile': {
            method: 'PUT',
            url: apiUrl + '/profiles',
          },

          /**
          * @ngdoc method
          * @name .2.method:getProfileWithServices
          * @methodOf .2
          * @description
          * Get Details of profile with services
          **/

          'getProfileWithServices': {
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/services',
            params: {
              'profileId': '@profileId',
            },
          },

          /**
          * @ngdoc method
          * @name .3.method:getProfilesInvitations
          * @methodOf .3
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
          * @name .4.method:getProfile
          * @methodOf .4
          * @description
          * Get Details of profile
          **/

          'getProfile': {
            method: 'GET',
            url: apiUrl + '/profiles/:profileId',
            params: {
              'profileId': '@profileId',
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
          * @name .0.method:postAccountVerifyEmail
          * @methodOf .0
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
          * @name .2.method:addAccount
          * @methodOf .2
          * @description
          * Create account
          **/

          'addAccount': {
            method: 'POST',
            url: apiUrl + '/accounts',
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
          * @name .4.method:getAccount
          * @methodOf .4
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
          * @name .6.method:partialUpdateAccount
          * @methodOf .6
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
      * @name .Search
      * @requires $resource
      * @requires apiUrl
      **/
    .service('SearchApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:searchReindex
          * @methodOf .0
          * @description
          * Rebuild index
          **/

          'searchReindex': {
            method: 'GET',
            url: apiUrl + '/search/reindex',
          },

          /**
          * @ngdoc method
          * @name .1.method:searchSuggestions
          * @methodOf .1
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
          * @name .2.method:search
          * @methodOf .2
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
      * @name .Employment
      * @requires $resource
      * @requires apiUrl
      **/
    .service('EmploymentApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:postEmploymentsReject
          * @methodOf .0
          * @description
          * Reject employment invitation
          **/

          'postEmploymentsReject': {
            method: 'POST',
            url: apiUrl + '/employments/:employmentId/reject',
            params: {
              'employmentId': '@employmentId',
            },
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
              'employmentId': '@employmentId',
            },
          },

          /**
          * @ngdoc method
          * @name .2.method:postEmployments
          * @methodOf .2
          * @description
          * Invite employees
          **/

          'postEmployments': {
            method: 'POST',
            url: apiUrl + '/employments',
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
          * @name .0.method:fileInfoPath
          * @methodOf .0
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
          * @name .2.method:profileAvatarsPath
          * @methodOf .2
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
          * @name .3.method:uploadFilePath
          * @methodOf .3
          * @description
          * Upload file
          **/

          'uploadFilePath': {
            method: 'POST',
            url: apiUrl + '/files/:token/upload',
            params: {
              'token': '@token',
            },
          },

          /**
          * @ngdoc method
          * @name .4.method:profileGalleryPath
          * @methodOf .4
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
          * @name .5.method:tokenPath
          * @methodOf .5
          * @description
          * Get file upload url
          **/

          'tokenPath': {
            method: 'GET',
            url: apiUrl + '/files/token',
          },

          /**
          * @ngdoc method
          * @name .6.method:listFilesPath
          * @methodOf .6
          * @description
          * List all files
          **/

          'listFilesPath': {
            method: 'GET',
            url: apiUrl + '/files',
          },

          /**
          * @ngdoc method
          * @name .7.method:downloadResizedFilePath
          * @methodOf .7
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
          * @name .8.method:serviceGalleryPath
          * @methodOf .8
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
          * @name .10.method:downloadFilePath
          * @methodOf .10
          * @description
          * Download file
          **/

          'downloadFilePath': {
            method: 'GET',
            url: apiUrl + '/files/:token/download',
            params: {
              'token': '@token',
            },
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Tag
      * @requires $resource
      * @requires apiUrl
      **/
    .service('TagApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:postTagSuggest
          * @methodOf .0
          * @description
          * Get tag suggestions
          **/

          'postTagSuggest': {
            method: 'POST',
            url: apiUrl + '/tags/suggest',
          }
        };
    }])
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
          * @name .0.method:postRecoverPasswordVerifyEmail
          * @methodOf .0
          * @description
          * Verify email token
          **/

          'postRecoverPasswordVerifyEmail': {
            method: 'POST',
            url: apiUrl + '/recover-password/verify/email',
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
          * @name .2.method:postRecoverPassword
          * @methodOf .2
          * @description
          * Create recover password
          **/

          'postRecoverPassword': {
            method: 'POST',
            url: apiUrl + '/recover-password',
          },

          /**
          * @ngdoc method
          * @name .3.method:putRecoverPasswordMsisdn
          * @methodOf .3
          * @description
          * Update password
          **/

          'putRecoverPasswordMsisdn': {
            method: 'PUT',
            url: apiUrl + '/recover-password/msisdn',
          },

          /**
          * @ngdoc method
          * @name .4.method:postRecoverPasswordVerifyMsisdn
          * @methodOf .4
          * @description
          * Verify Msisdn token
          **/

          'postRecoverPasswordVerifyMsisdn': {
            method: 'POST',
            url: apiUrl + '/recover-password/verify/msisdn',
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
          * @name .0.method:check
          * @methodOf .0
          * @description
          * Check login state
          **/

          'check': {
            method: 'GET',
            url: apiUrl + '/session',
          },

          /**
          * @ngdoc method
          * @name .1.method:login
          * @methodOf .1
          * @description
          * Login with username and password
          **/

          'login': {
            method: 'POST',
            url: apiUrl + '/session',
          },

          /**
          * @ngdoc method
          * @name .2.method:logout
          * @methodOf .2
          * @description
          * Logout
          **/

          'logout': {
            method: 'DELETE',
            url: apiUrl + '/session',
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
          * @name .1.method:confirmVerification
          * @methodOf .1
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/code',
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
          * @name .1.method:confirmVerification
          * @methodOf .1
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/code',
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
      * @name .Ratel
      * @requires $resource
      * @requires apiUrl
      **/
    .service('RatelApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:getRatelAuthConfig
          * @methodOf .0
          * @description
          * Get config for ratel authentication
          **/

          'getRatelAuthConfig': {
            method: 'GET',
            url: apiUrl + '/ratel/config',
            params: {
              'serviceId': '@serviceId',
            },
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .Config
      * @requires $resource
      * @requires apiUrl
      **/
    .service('ConfigApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:getRatelAuthConfig
          * @methodOf .0
          * @description
          * Get config for ratel authentication
          **/

          'getRatelAuthConfig': {
            method: 'GET',
            url: apiUrl + '/ratel/config',
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
