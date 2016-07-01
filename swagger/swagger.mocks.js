/* istanbul ignore next */
(function(angular) {
    'use strict';

    var moduleName = 'profitelo.swaggerResources.mocked';

    angular
        .module(moduleName, ['ngMockE2E'])
        .run(['apiUrl', '$httpBackend', function(apiUrl, $httpBackend) {
                $httpBackend.whenPOST(apiUrl + '/recover-password').respond();
                $httpBackend.whenPUT(apiUrl + '/recover-password/email').respond();
                $httpBackend.whenPOST(apiUrl + '/recover-password/verify/msisdn').respond();
                $httpBackend.whenPOST(apiUrl + '/recover-password/verify/email').respond();
                $httpBackend.whenPUT(apiUrl + '/recover-password/msisdn').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId/gallery').respond();
                $httpBackend.whenPUT(apiUrl + '/files/:token').respond();
                $httpBackend.whenGET(apiUrl + '/files/:token').respond();
                $httpBackend.whenGET(apiUrl + '/services/:serviceId/gallery').respond();
                $httpBackend.whenGET(apiUrl + '/files/:token/download/:widthx:height').respond();
                $httpBackend.whenGET(apiUrl + '/files/:token/download').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId/avatars').respond();
                $httpBackend.whenGET(apiUrl + '/files').respond();
                $httpBackend.whenGET(apiUrl + '/files/token').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId/covers').respond();
                $httpBackend.whenPOST(apiUrl + '/files/:token/upload').respond();
                $httpBackend.whenGET(apiUrl + '/search/suggestions').respond();
                $httpBackend.whenGET(apiUrl + '/search').respond();
                $httpBackend.whenPOST(apiUrl + '/accounts').respond();
                $httpBackend.whenGET(apiUrl + '/accounts').respond();
                $httpBackend.whenPOST(apiUrl + '/accounts/confirm/email/:token').respond();
                $httpBackend.whenGET(apiUrl + '/accounts/exists/email/:email').respond();
                $httpBackend.whenPATCH(apiUrl + '/accounts/:accountId').respond();
                $httpBackend.whenPUT(apiUrl + '/accounts/:accountId').respond();
                $httpBackend.whenGET(apiUrl + '/accounts/:accountId').respond();
                $httpBackend.whenGET(apiUrl + '/accounts/check').respond();
                $httpBackend.whenGET(apiUrl + '/services/profile/:accountId').respond();
                $httpBackend.whenPOST(apiUrl + '/services').respond();
                $httpBackend.whenPOST(apiUrl + '/services/verify').respond();
                $httpBackend.whenDELETE(apiUrl + '/services/:serviceId').respond();
                $httpBackend.whenPUT(apiUrl + '/services/:serviceId').respond();
                $httpBackend.whenGET(apiUrl + '/services/:serviceId').respond();
                $httpBackend.whenPOST(apiUrl + '/employments').respond();
                $httpBackend.whenPOST(apiUrl + '/employments/:employmentId/accept').respond();
                $httpBackend.whenPOST(apiUrl + '/employments/:employmentId/reject').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/invitations').respond();
                $httpBackend.whenPOST(apiUrl + '/profiles').respond();
                $httpBackend.whenPUT(apiUrl + '/profiles').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId').respond();
                $httpBackend.whenGET(apiUrl + '/profiles/:profileId/services').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/verify').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/verify/code').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/code').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/verify').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/verify/code').respond();
                $httpBackend.whenPOST(apiUrl + '/msisdns/code').respond();
                $httpBackend.whenGET(apiUrl + '/categories').respond();
                $httpBackend.whenPOST(apiUrl + '/session').respond();
                $httpBackend.whenDELETE(apiUrl + '/session').respond();
                $httpBackend.whenGET(apiUrl + '/session').respond();
        }]);

    if( typeof exports !== 'undefined' ) {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = moduleName;
        }
        exports = moduleName;
    }
})(angular);
