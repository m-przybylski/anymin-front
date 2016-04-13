(function(angular) {
    'use strict';

    angular.module('profitelo.translations.en-us', [])
    .config(['$translateProvider', function($translateProvider) {

        return $translateProvider.translations('en-us', {
        		'COMMON.COPYRIGHT':'2016 - iTelo sp z.o.o. All rights reserved.',
        		'COMMON.DIRECTIVES.INTERFACE.CALENDAR_LABEL':'Kalendarz',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER':'Przeciągnij &amp; Upuść',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER_UPLOAD':'Ukończono',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO':'lub kliknij by wgrać pliki',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO_UPLOAD':'plik {{ file }} z {{ files }}',
        		'DASHBOARD.CREATE_PROFILE.CREATE_PROFILE_TITLE':'Tworzenie konta usługodawcy',
        		'DASHBOARD.CREATE_PROFILE.NEXT_STEP':'Kolejny Etap',
        		'DASHBOARD.CREATE_PROFILE.STEP1_PROGRESS_BAR_TITLE':'Etap 1 - Tworzenie profilu firmy',
        		'DASHBOARD.MENU.CLIENT':'Klient',
        		'DASHBOARD.MENU.EXPERT':'Ekspert',
        		'LOGIN.DOWNLOAD_FREE_APP':'Pobierz bezpłatną aplikację na telefon:',
        		'LOGIN.ENTER_NUMBER':'wpisz swój numer',
        		'LOGIN.ENTER_NUMBER_PLACEHOLDER':'np. 599-546-342',
        		'LOGIN.FORGOT_PASSWORD':'Nie pamiętasz hasła?',
        		'LOGIN.NEXT':'Dalej',
        		'LOGIN.OUR_SERVICES_1':'Prowadzimy już',
        		'LOGIN.OUR_SERVICES_2':'usług!',
        		'LOGIN.PASSWORD_ATTEMPTS_EXCEEDED':'Wpisałeś błędnie hasło zbyt wiele razy. Poczekaj jeszcze {{time}} aby móc spróbować pownownie.',
        		'LOGIN.PHONE_NUMBER_REQUIRED':'Podaj poprawny numer telefonu',
        		'LOGIN.PREFIX':'prefix',
        		'LOGIN.PREFIX_PLACEHOLDER':'+48',
        		'LOGIN.SERVICE_PASSWORD':'Podaj hasło do usługi',
        		'LOGIN.TRUST_EXPERTS':'Zaufaj ekspertom i rozwiąż swoje problemy',
        		'LOGIN.VERIFICATION_ATTEMPTS_EXCEEDED':'Wpisałeś błędnie kod zbyt wiele razy. Poczekaj jeszcze {{time}} aby móc spróbować pownownie.',
        		'REGISTER.CHANGE_PASSWORD':'Zmień',
        		'REGISTER.SERVICE_CODE':'Wpisz kod weryfikacyjny z smsa',
        		'REGISTER.SERVICE_CODE_PLACEHOLDER':'np. 476239'
        })
    }])
})(angular);




