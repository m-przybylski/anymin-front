/* istanbul ignore next */
(function(angular) {
  'use strict';

  var moduleName = 'profitelo.swaggerResources.definitions';

  angular
    .module(moduleName, [])
    /**
      * @ngdoc service
      * @name .Recover-password
      * @requires $resource
      * @requires apiUrl
      **/
    .service('Recover-PasswordApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:putRecoverPasswordMsisdn
          * @methodOf .0
          * @description
          * Update password
          **/

          'putRecoverPasswordMsisdn': {
            method: 'PUT',
            url: apiUrl + '/recover-password/msisdn',
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
          * @name .3.method:postRecoverPassword
          * @methodOf .3
          * @description
          * Create recover password
          **/

          'postRecoverPassword': {
            method: 'POST',
            url: apiUrl + '/recover-password',
          },

          /**
          * @ngdoc method
          * @name .4.method:postRecoverPasswordVerifyEmail
          * @methodOf .4
          * @description
          * Verify email token
          **/

          'postRecoverPasswordVerifyEmail': {
            method: 'POST',
            url: apiUrl + '/recover-password/verify/email',
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
          * @name .3.method:profileAvatarsPath
          * @methodOf .3
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
          * @name .4.method:serviceGalleryPath
          * @methodOf .4
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
          * @name .5.method:downloadResizedFilePath
          * @methodOf .5
          * @description
          * Download resized file
          **/

          'downloadResizedFilePath': {
            method: 'GET',
            url: apiUrl + '/files/:token/download/:widthx:height',
            params: {
              'token': '@token',
              'width': '@width',
              'heigth': '@heigth',
            },
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
          * @name .7.method:tokenPath
          * @methodOf .7
          * @description
          * Get file upload url
          **/

          'tokenPath': {
            method: 'GET',
            url: apiUrl + '/files/token',
          },

          /**
          * @ngdoc method
          * @name .8.method:profileCoversPath
          * @methodOf .8
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
          * @name .9.method:downloadFilePath
          * @methodOf .9
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
      * @name .Msisdn
      * @requires $resource
      * @requires apiUrl
      **/
    .service('MsisdnApiDef', ['apiUrl', function(apiUrl) {
        return {

          /**
          * @ngdoc method
          * @name .0.method:addPath
          * @methodOf .0
          * @description
          * Add new msisdn
          **/

          'addPath': {
            method: 'POST',
            url: apiUrl + '/msisdns',
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
          * @name .2.method:confirmVerification
          * @methodOf .2
          * @description
          * Confirm msisdn verification
          **/

          'confirmVerification': {
            method: 'POST',
            url: apiUrl + '/msisdns/verify/code',
          },

          /**
          * @ngdoc method
          * @name .3.method:patchPath
          * @methodOf .3
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
          * @name .4.method:deletePath
          * @methodOf .4
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
          * @name .5.method:updatePath
          * @methodOf .5
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
          * @name .6.method:detailsPath
          * @methodOf .6
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
          * @name .3.method:partialUpdateAccount
          * @methodOf .3
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
          * @name .4.method:updateAccount
          * @methodOf .4
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
          * @name .5.method:getAccount
          * @methodOf .5
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
          * @name .6.method:getRegistrationStatusByMsisdn
          * @methodOf .6
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
          * @name .7.method:statusPath
          * @methodOf .7
          * @description
          * Retrieve status of account by id
          **/

          'statusPath': {
            method: 'GET',
            url: apiUrl + '/accounts/:accountId/status',
            params: {
              'accountId': '@accountId',
            },
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
          * @name .0.method:detailsPath
          * @methodOf .0
          * @description
          * Get Details of category
          **/

          'detailsPath': {
            method: 'GET',
            url: apiUrl + '/categories/:categoryId',
            params: {
              'categoryId': '@categoryId',
            },
          },

          /**
          * @ngdoc method
          * @name .1.method:listCategoriesPath
          * @methodOf .1
          * @description
          * Get list of categories
          **/

          'listCategoriesPath': {
            method: 'GET',
            url: apiUrl + '/index/categories',
          },

          /**
          * @ngdoc method
          * @name .2.method:listPath
          * @methodOf .2
          * @description
          * Get list of categories
          **/

          'listPath': {
            method: 'GET',
            url: apiUrl + '/categories',
            isArray: true,
          },

          /**
          * @ngdoc method
          * @name .3.method:subcategoryPath
          * @methodOf .3
          * @description
          * Get list of subCategories
          **/

          'subcategoryPath': {
            method: 'GET',
            url: apiUrl + '/categories/:categoryId/subcategories',
            params: {
              'categoryId': '@categoryId',
            },
            isArray: true,
          },

          /**
          * @ngdoc method
          * @name .4.method:getCategoryPath
          * @methodOf .4
          * @description
          * Retrieve category by id
          **/

          'getCategoryPath': {
            method: 'GET',
            url: apiUrl + '/index/categories/:categoryId',
            params: {
              'categoryId': '@categoryId',
            },
          },

          /**
          * @ngdoc method
          * @name .5.method:servicesCategoryPath
          * @methodOf .5
          * @description
          * Get list of categories linked with service
          **/

          'servicesCategoryPath': {
            method: 'GET',
            url: apiUrl + '/categories/:categoryId/services',
            params: {
              'serviceId': '@serviceId',
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
          * @name .0.method:list
          * @methodOf .0
          * @description
          * List profiles
          **/

          'list': {
            method: 'GET',
            url: apiUrl + '/profiles',
          },

          /**
          * @ngdoc method
          * @name .1.method:updatePath
          * @methodOf .1
          * @description
          * Update profile
          **/

          'updatePath': {
            method: 'PUT',
            url: apiUrl + '/profiles/:profileId',
            params: {
              'expertId': '@expertId',
            },
          },

          /**
          * @ngdoc method
          * @name .2.method:detailsPath
          * @methodOf .2
          * @description
          * Get Details of profile
          **/

          'detailsPath': {
            method: 'GET',
            url: apiUrl + '/profiles/:profileId',
            params: {
              'expertId': '@expertId',
            },
          },

          /**
          * @ngdoc method
          * @name .3.method:addPath
          * @methodOf .3
          * @description
          * Add new profile
          **/

          'addPath': {
            method: 'GET',
            url: apiUrl + '/profiles/new',
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
            url: apiUrl + '/msisdns/verify/code',
          }
        };
    }])
        /**
      * @ngdoc service
      * @name .ProfileCreationRequests
      * @requires $resource
      * @requires apiUrl
      **/
    .service('ProfileCreationRequestsApiDef', ['apiUrl', function(apiUrl) {
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
            url: apiUrl + '/profileCreationRequests',
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
