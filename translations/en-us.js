(function(angular) {
    'use strict';

    angular.module('profitelo.translations.en-us', [])
    .config(['$translateProvider', function($translateProvider) {

        return $translateProvider.translations('en-us', {
        		'COMMON.COPYRIGHT':'2016 - iTelo sp z.o.o. All rights reserved.',
        		'LOGIN.DOWNLOAD_FREE_APP':'Pobierz bezpłatną aplikację na telefon:',
        		'LOGIN.ENTER_NUMBER':'wpisz swój numer',
        		'LOGIN.ENTER_NUMBER_PLACEHOLDER':'np. 599-546-342',
        		'LOGIN.FORGOT_PASSWORD':'Nie pamiętasz hasła?',
        		'LOGIN.NEXT':'Dalej',
        		'LOGIN.OUR_SERVICES_1':'Prowadzimy już',
        		'LOGIN.OUR_SERVICES_2':'usług!',
        		'LOGIN.PREFIX':'prefix',
        		'LOGIN.PREFIX_PLACEHOLDER':'+48',
        		'LOGIN.SERVICE_PASSWORD':'Podaj hasło do usługi',
        		'LOGIN.TRUST_EXPERTS':'Zaufaj ekspertom i rozwiąż swoje problemy'
        })
    }])
})(angular);




