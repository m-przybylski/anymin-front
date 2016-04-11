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
          * @name .0.method:listPath
          * @methodOf .0
          * @description
          * Get list of categories
          **/

          'listPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/categories',
            isArray: true,
          }, $resourceActionConfig('0', 'listPath')),

          /**
          * @ngdoc method
          * @name .1.method:detailsPath
          * @methodOf .1
          * @description
          * Get Details of category
          **/

          'detailsPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/categories/:categoryId',
            params: {
              'categoryId': '@categoryId',
            },
          }, $resourceActionConfig('1', 'detailsPath')),

          /**
          * @ngdoc method
          * @name .2.method:listCategoriesPath
          * @methodOf .2
          * @description
          * Get list of categories
          **/

          'listCategoriesPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/index/categories',
          }, $resourceActionConfig('2', 'listCategoriesPath')),

          /**
          * @ngdoc method
          * @name .3.method:servicesCategoryPath
          * @methodOf .3
          * @description
          * Get list of categories linked with service
          **/

          'servicesCategoryPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/categories/:categoryId/services',
            params: {
              'serviceId': '@serviceId',
            },
          }, $resourceActionConfig('3', 'servicesCategoryPath')),

          /**
          * @ngdoc method
          * @name .4.method:subcategoryPath
          * @methodOf .4
          * @description
          * Get list of subCategories
          **/

          'subcategoryPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/categories/:categoryId/subcategories',
            params: {
              'categoryId': '@categoryId',
            },
            isArray: true,
          }, $resourceActionConfig('4', 'subcategoryPath')),

          /**
          * @ngdoc method
          * @name .5.method:getCategoryPath
          * @methodOf .5
          * @description
          * Retrieve category by id
          **/

          'getCategoryPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/index/categories/:categoryId',
            params: {
              'categoryId': '@categoryId',
            },
          }, $resourceActionConfig('5', 'getCategoryPath')),
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
          * @name .0.method:profileCoversPath
          * @methodOf .0
          * @description
          * Get profile cover files
          **/

          'profileCoversPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/covers',
            params: {
              'profileId': '@profileId',
            },
          }, $resourceActionConfig('0', 'profileCoversPath')),

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
          * @name .4.method:profileAvatarsPath
          * @methodOf .4
          * @description
          * Get profile avatar files
          **/

          'profileAvatarsPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/avatars',
            params: {
              'profileId': '@profileId',
            },
          }, $resourceActionConfig('4', 'profileAvatarsPath')),

          /**
          * @ngdoc method
          * @name .5.method:downloadResizedFilePath
          * @methodOf .5
          * @description
          * Download resized file
          **/

          'downloadResizedFilePath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files/:token/download/:widthx:height',
            params: {
              'token': '@token',
              'width': '@width',
              'heigth': '@heigth',
            },
          }, $resourceActionConfig('5', 'downloadResizedFilePath')),

          /**
          * @ngdoc method
          * @name .6.method:listFilesPath
          * @methodOf .6
          * @description
          * List all files
          **/

          'listFilesPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files',
          }, $resourceActionConfig('6', 'listFilesPath')),

          /**
          * @ngdoc method
          * @name .7.method:tokenPath
          * @methodOf .7
          * @description
          * Get file upload url
          **/

          'tokenPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files/token',
          }, $resourceActionConfig('7', 'tokenPath')),

          /**
          * @ngdoc method
          * @name .8.method:profileGalleryPath
          * @methodOf .8
          * @description
          * Get profile gallery files
          **/

          'profileGalleryPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:profileId/gallery',
            params: {
              'profileId': '@profileId',
            },
          }, $resourceActionConfig('8', 'profileGalleryPath')),

          /**
          * @ngdoc method
          * @name .9.method:downloadFilePath
          * @methodOf .9
          * @description
          * Download file
          **/

          'downloadFilePath': angular.extend({
            method: 'GET',
            url: apiUrl + '/files/:token/download',
            params: {
              'token': '@token',
            },
          }, $resourceActionConfig('9', 'downloadFilePath')),

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
          * @name .0.method:confirm
          * @methodOf .0
          * @description
          * Verify registration token
          **/

          'confirm': angular.extend({
            method: 'GET',
            url: apiUrl + '/registration/:token',
            params: {
              'token': '@token',
            },
          }, $resourceActionConfig('0', 'confirm')),

          /**
          * @ngdoc method
          * @name .1.method:register
          * @methodOf .1
          * @description
          * Register with email and password
          **/

          'register': angular.extend({
            method: 'POST',
            url: apiUrl + '/registration',
          }, $resourceActionConfig('1', 'register')),
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
          * @name .0.method:confirm
          * @methodOf .0
          * @description
          * Verify registration token
          **/

          'confirm': angular.extend({
            method: 'GET',
            url: apiUrl + '/registration/:token',
            params: {
              'token': '@token',
            },
          }, $resourceActionConfig('0', 'confirm')),

          /**
          * @ngdoc method
          * @name .1.method:addAccount
          * @methodOf .1
          * @description
          * Create account
          **/

          'addAccount': angular.extend({
            method: 'POST',
            url: apiUrl + '/accounts',
          }, $resourceActionConfig('1', 'addAccount')),

          /**
          * @ngdoc method
          * @name .2.method:listAccounts
          * @methodOf .2
          * @description
          * List accounts
          **/

          'listAccounts': angular.extend({
            method: 'GET',
            url: apiUrl + '/accounts',
            isArray: true,
          }, $resourceActionConfig('2', 'listAccounts')),

          /**
          * @ngdoc method
          * @name .3.method:register
          * @methodOf .3
          * @description
          * Register with email and password
          **/

          'register': angular.extend({
            method: 'POST',
            url: apiUrl + '/registration',
          }, $resourceActionConfig('3', 'register')),

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
          * @name .7.method:statusPath
          * @methodOf .7
          * @description
          * Retrieve status of account by id
          **/

          'statusPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/accounts/:accountId/status',
            params: {
              'accountId': '@accountId',
            },
          }, $resourceActionConfig('7', 'statusPath')),
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
          * @name .0.method:addPath
          * @methodOf .0
          * @description
          * Add new msisdn
          **/

          'addPath': angular.extend({
            method: 'POST',
            url: apiUrl + '/msisdns',
          }, $resourceActionConfig('0', 'addPath')),

          /**
          * @ngdoc method
          * @name .1.method:detailsPath
          * @methodOf .1
          * @description
          * Get Details of msisdn
          **/

          'detailsPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/msisdns',
            params: {
              'msisdnId': '@msisdnId',
            },
          }, $resourceActionConfig('1', 'detailsPath')),

          /**
          * @ngdoc method
          * @name .2.method:deletePath
          * @methodOf .2
          * @description
          * Delete msisdn
          **/

          'deletePath': angular.extend({
            method: 'DELETE',
            url: apiUrl + '/msisdns/:msisdnId',
            params: {
              'msisdnId': '@msisdnId',
            },
          }, $resourceActionConfig('2', 'deletePath')),

          /**
          * @ngdoc method
          * @name .3.method:updatePath
          * @methodOf .3
          * @description
          * Update msisdn
          **/

          'updatePath': angular.extend({
            method: 'PUT',
            url: apiUrl + '/msisdns/:msisdnId',
            params: {
              'msisdnId': '@msisdnId',
            },
          }, $resourceActionConfig('3', 'updatePath')),

          /**
          * @ngdoc method
          * @name .4.method:patchPath
          * @methodOf .4
          * @description
          * Update status msisdn
          **/

          'patchPath': angular.extend({
            method: 'PATCH',
            url: apiUrl + '/msisdns/:msisdnId',
            params: {
              'msisdnId': '@msisdnId',
            },
          }, $resourceActionConfig('4', 'patchPath')),
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
          * @name .0.method:updatePath
          * @methodOf .0
          * @description
          * Update profile
          **/

          'updatePath': angular.extend({
            method: 'PUT',
            url: apiUrl + '/profiles/:expertId',
            params: {
              'expertId': '@expertId',
            },
          }, $resourceActionConfig('0', 'updatePath')),

          /**
          * @ngdoc method
          * @name .1.method:detailsPath
          * @methodOf .1
          * @description
          * Get Details of profile
          **/

          'detailsPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/:expertId',
            params: {
              'expertId': '@expertId',
            },
          }, $resourceActionConfig('1', 'detailsPath')),

          /**
          * @ngdoc method
          * @name .2.method:addPath
          * @methodOf .2
          * @description
          * Add new profile
          **/

          'addPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles/new',
          }, $resourceActionConfig('2', 'addPath')),

          /**
          * @ngdoc method
          * @name .3.method:list
          * @methodOf .3
          * @description
          * List profiles
          **/

          'list': angular.extend({
            method: 'GET',
            url: apiUrl + '/profiles',
          }, $resourceActionConfig('3', 'list')),
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
        .provider('ProfileCreationRequestsApi', function() {

      /**
      * @ngdoc service
      * @name .ProfileCreationRequests
      * @requires $resource
      * @requires apiUrl
      **/

      this.$get = ['$resource', 'apiUrl', '$resourceActionConfig', function($resource, apiUrl, $resourceActionConfig) {
        return $resource(null, null, {

          /**
          * @ngdoc method
          * @name .0.method:profileCreationRequestPath
          * @methodOf .0
          * @description
          * Create profile creation requests
          **/

          'profileCreationRequestPath': angular.extend({
            method: 'POST',
            url: apiUrl + '/profileCreationRequests',
          }, $resourceActionConfig('0', 'profileCreationRequestPath')),
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
          * @name .0.method:postPath
          * @methodOf .0
          * @description
          * Create a service
          **/

          'postPath': angular.extend({
            method: 'POST',
            url: apiUrl + '/services',
          }, $resourceActionConfig('0', 'postPath')),

          /**
          * @ngdoc method
          * @name .1.method:putPath
          * @methodOf .1
          * @description
          * Update Details of a service
          **/

          'putPath': angular.extend({
            method: 'PUT',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          }, $resourceActionConfig('1', 'putPath')),

          /**
          * @ngdoc method
          * @name .2.method:getPath
          * @methodOf .2
          * @description
          * Get Details of a service
          **/

          'getPath': angular.extend({
            method: 'GET',
            url: apiUrl + '/services/:serviceId',
            params: {
              'serviceId': '@serviceId',
            },
          }, $resourceActionConfig('2', 'getPath')),
        });
      }];
    })
    ;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            var exports = module.exports = moduleName;
        }
        exports = moduleName;
    }
}(angular));
