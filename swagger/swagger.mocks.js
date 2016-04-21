(function(angular) {
    'use strict';

    var moduleName = 'profitelo.swaggerResources.mocked';

    angular
        .module(moduleName, ['ngMockE2E'])
        .run(['apiUrl', '$httpBackend', function(apiUrl, $httpBackend) {
                $httpBackend.whenPUT(apiUrl + '/recover-password/msisdn').respond();
                $httpBackend.whenPUT(apiUrl + '/recover-password/email').respond();
                $httpBackend.whenPOST(apiUrl + '/recover-password/verify/msisdn').respond();
                $httpBackend.whenPOST(apiUrl + '/recover-password').respond();
                $httpBackend.whenPOST(apiUrl + '/recover-password/verify/email').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId/gallery').respond();
                $httpBackend.whenPUT(apiUrl + '/files/:token').respond();
                $httpBackend.whenGET(apiUrl + '/files/:token').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId/avatars').respond();
                $httpBackend.whenGET(apiUrl + '/services/:serviceId/gallery').respond();
                $httpBackend.whenGET(apiUrl + '/files/:token/download/:widthx:height').respond();
                $httpBackend.whenGET(apiUrl + '/files').respond();
                $httpBackend.whenGET(apiUrl + '/files/token').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId/covers').respond();
                $httpBackend.whenGET(apiUrl + '/files/:token/download').respond();
                $httpBackend.whenPOST(apiUrl + '/files/:token/upload').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/verify').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/verify/code').respond();
                $httpBackend.whenPATCH(apiUrl + '/msisdns/:msisdnId').respond();
                $httpBackend.whenDELETE(apiUrl + '/msisdns/:msisdnId').respond();
                $httpBackend.whenPUT(apiUrl + '/msisdns/:msisdnId').respond();
                $httpBackend.whenGET(apiUrl + '/msisdns/:msisdnId').respond();
                $httpBackend.whenGET(apiUrl + '/categories/:categoryId/services').respond();
                $httpBackend.whenGET(apiUrl + '/categories/:categoryId').respond();
                $httpBackend.whenGET(apiUrl + '/index/categories').respond();
                $httpBackend.whenGET(apiUrl + '/categories').respond();
                $httpBackend.whenGET(apiUrl + '/categories/:categoryId/subcategories').respond();
                $httpBackend.whenGET(apiUrl + '/index/categories/:categoryId').respond();
                $httpBackend.whenPATCH(apiUrl + '/accounts/:accountId').respond();
                $httpBackend.whenPUT(apiUrl + '/accounts/:accountId').respond();
                $httpBackend.whenGET(apiUrl + '/accounts/:accountId').respond();
                $httpBackend.whenGET(apiUrl + '/accounts/check').respond();
                $httpBackend.whenGET(apiUrl + '/accounts/:accountId/status').respond();
                $httpBackend.whenPOST(apiUrl + '/accounts').respond();
                $httpBackend.whenGET(apiUrl + '/accounts').respond();
                $httpBackend.whenPOST(apiUrl + '/services').respond();
                $httpBackend.whenPUT(apiUrl + '/services/:serviceId').respond();
                $httpBackend.whenGET(apiUrl + '/services/:serviceId').respond();
                $httpBackend.whenGET(apiUrl + '/profiles').respond();
                $httpBackend.whenPUT(apiUrl + '/profiles/:profileId').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/new').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/verify').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/verify/code').respond();
                $httpBackend.whenPOST(apiUrl + '/session').respond();
                $httpBackend.whenDELETE(apiUrl + '/session').respond();
                $httpBackend.whenGET(apiUrl + '/session').respond();
                $httpBackend.whenPOST(apiUrl + '/profileCreationRequests').respond();
        }]);

    if( typeof exports !== 'undefined' ) {
        if (typeof module !== 'undefined' && module.exports) {
            var exports = module.exports = moduleName;
        }
        exports = moduleName;
    }
})(angular);
