(function(angular) {
    'use strict';

    angular.module('profitelo.translations.pl-pl', [])
    .config(['$translateProvider', function($translateProvider) {

        return $translateProvider.translations('pl-pl', {
        		'COMMON.COPYRIGHT':'2016 - iTelo sp z.o.o. All rights reserved.',
        		'COMMON.DIRECTIVES.INTERFACE.CALENDAR_LABEL':'Kalendarz',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER':'Przeciągnij &amp; Upuść',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER_UPLOAD':'Ukończono',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO':'lub kliknij by wgrać pliki',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO_UPLOAD':'plik {{ file }} z {{ files }}',
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




