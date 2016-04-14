(function(angular) {
    'use strict';

    angular.module('profitelo.translations.en-us', [])
    .config(['$translateProvider', function($translateProvider) {

        return $translateProvider.translations('en-us', {
        		'COMMON.COPYRIGHT':'2016 - iTelo sp z.o.o. All rights reserved.',
        		'COMMON.DIRECTIVES.INTERFACE.CALENDAR_LABEL':'Kalendarz',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER':'Przeciągnij & Upuść',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER_UPLOAD':'Ukończono',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO':'lub kliknij by wgrać pliki',
        		'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO_UPLOAD':'plik {{ file }} z {{ files }}',
        		'DASHBOARD.CREATE_PROFILE.CREATE_PROFILE_TITLE':'Tworzenie konta usługodawcy',
        		'DASHBOARD.CREATE_PROFILE.FILE_PREVIEW':'Podgląd Pliku',
        		'DASHBOARD.CREATE_PROFILE.NEXT_STEP':'Kolejny Etap',
        		'DASHBOARD.CREATE_PROFILE.STEP':'Krok:  {{ step }} / {{ steps }}',
        		'DASHBOARD.CREATE_PROFILE.STEP1_CHOOSE_PROFILE_DESCRIPTION':'Usługa może być świadczona tylko przez Ciebie, jak i przez Twoich pracowników.',
        		'DASHBOARD.CREATE_PROFILE.STEP1_CHOOSE_PROFILE_TITLE':'Zamierzam świadczyć konsultacje jako:',
        		'DASHBOARD.CREATE_PROFILE.STEP1_MORE_PERSON':'Świadczę usługę wieloosobowo',
        		'DASHBOARD.CREATE_PROFILE.STEP1_PROGRESS_BAR_TITLE':'Etap 1 - Tworzenie profilu firmy',
        		'DASHBOARD.CREATE_PROFILE.STEP2_DESCRIPTION':'Podaj swoją nazwę firmy pod którą będziesz prowadził konsultacje.',
        		'DASHBOARD.CREATE_PROFILE.STEP2_TITLE':'Nazwa Firmy*:',
        		'DASHBOARD.CREATE_PROFILE.STEP3_DESCRIPTION':'Logo powinno być w formacie jpg, png i nie przekraczać 2mb.',
        		'DASHBOARD.CREATE_PROFILE.STEP3_TITLE':'Logo Firmy*:',
        		'DASHBOARD.CREATE_PROFILE.STEP4_DESCRIPTION':'Krótki opis działalności firmy, czego można spodziewać po konsultacji.',
        		'DASHBOARD.CREATE_PROFILE.STEP4_TITLE':'Opis Twojej działalności:',
        		'DASHBOARD.CREATE_PROFILE.STEP5_DESCRIPTION':'Wgraj certyfikaty, dokumenty lub wizytówkę firmy.',
        		'DASHBOARD.CREATE_PROFILE.STEP5_TITLE':'Dokumenty:',
        		'DASHBOARD.CREATE_PROFILE.STEP5_UPLOAD_DOCUMENT':'Wgrane dokumenty:',
        		'DASHBOARD.CREATE_PROFILE.STEP6_DESCRIPTION':'Podziel się linkami społecznościowymi lub inną stroną www.',
        		'DASHBOARD.CREATE_PROFILE.STEP6_TITLE':'Linki zewnętrzne:',
        		'DASHBOARD.MENU.AVAILABILITY':'Dostępność',
        		'DASHBOARD.MENU.CLIENT':'Klient',
        		'DASHBOARD.MENU.EXPERT':'Ekspert',
        		'DASHBOARD.MENU.EXPERT_BASE':'Baza Ekspertów',
        		'DASHBOARD.MENU.FAVOURITES':'Ulubione',
        		'DASHBOARD.MENU.MY_ACCOUNT':'Moje Konto',
        		'DASHBOARD.MENU.NOTIFICATION':'Powiadomienia',
        		'DASHBOARD.MENU.STEP1_ONE_PERSON':'Świadczę usługę jednoosobowo',
        		'LOGIN.ACCEPT_RULES_1':'Zapoznałem się i akceptuje',
        		'LOGIN.ACCEPT_RULES_2':'regulamin',
        		'LOGIN.ACCEPT_RULES_3':'serwisu',
        		'LOGIN.BAD_LOGIN_CREDENTIALS':'Błędne hasło. Spróbuj ponownie.',
        		'LOGIN.DOWNLOAD_FREE_APP':'Pobierz bezpłatną aplikację na telefon:',
        		'LOGIN.ENTER_NUMBER':'wpisz swój numer',
        		'LOGIN.ENTER_NUMBER_PLACEHOLDER':'np. 599-546-342',
        		'LOGIN.FORGOT_PASSWORD':'Nie pamiętasz hasła?',
        		'LOGIN.NEXT':'Dalej',
        		'LOGIN.NO_EMPTY_PASSWORD':'Hasło nie może być puste',
        		'LOGIN.OUR_SERVICES_1':'Prowadzimy już',
        		'LOGIN.OUR_SERVICES_2':'usług!',
        		'LOGIN.PASSWORD_ATTEMPTS_EXCEEDED':'Wpisałeś błędnie hasło zbyt wiele razy. Poczekaj jeszcze {{time}} aby móc spróbować pownownie.',
        		'LOGIN.PHONE_NUMBER_REQUIRED':'Podaj poprawny numer telefonu',
        		'LOGIN.PREFIX':'prefix',
        		'LOGIN.PREFIX_PLACEHOLDER':'+48',
        		'LOGIN.SERVICE_PASSWORD':'Podaj hasło do usługi',
        		'LOGIN.SUCCESSFUL_LOGIN':'Zostałeś poprawnie zalogowany',
        		'LOGIN.TRUST_EXPERTS':'Zaufaj ekspertom i rozwiąż swoje problemy',
        		'LOGIN.VERIFICATION_ATTEMPTS_EXCEEDED':'Wpisałeś błędnie kod zbyt wiele razy. Poczekaj jeszcze {{time}} aby móc spróbować pownownie.',
        		'REGISTER.CHANGE_PASSWORD':'Zmień',
        		'REGISTER.CODE_REQUIRED':'Podaj poprawny kod weryfikacyjny',
        		'REGISTER.EMAIL_REQUIRED':'Podaj poprawny adres email',
        		'REGISTER.SERVICE_CODE':'Wpisz kod weryfikacyjny z smsa',
        		'REGISTER.SERVICE_CODE_PLACEHOLDER':'np. 476239',
        		'REGISTER.SERVICE_EMAIL':'Wpisz swój adres email',
        		'REGISTER.SERVICE_EMAIL_PLACEHOLDER':'np. jan.kowalski@profitelo.pl',
        		'REGISTER.SERVICE_PASSWORD':'ustaw nowe hasło do swojego konta',
        		'REGISTER.SERVICE_PASSWORD_PLACEHOLDER':'Hasło powinno składać się z minimum 8 znaków',
        		'REGISTER.SERVICE_PASSWORD_STRENGTH':'Siła Hasła'
        })
    }])
})(angular);




