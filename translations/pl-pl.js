(function(angular) {
    'use strict';

    angular.module('profitelo.translations.pl-pl', [])
    .config(['$translateProvider', function($translateProvider) {

        return $translateProvider.translations('pl-pl', {
        		'COMMON.COPYRIGHT':'2016 - iTelo sp z.o.o. All rights reserved.',
        		'LOGIN.DOWNLOAD_FREE_APP':'Pobierz bezpłatną aplikację na telefon:',
        		'LOGIN.FORGOT_PASSWORD':'Nie pamiętasz hasła?',
        		'LOGIN.OUR_SERVICES_1':'Prowadzimy już',
        		'LOGIN.OUR_SERVICES_2':'usług!',
        		'LOGIN.TRUST_EXPERTS':'Zaufaj ekspertom i rozwiąż swoje problemy'
        })
    }])
})(angular);




