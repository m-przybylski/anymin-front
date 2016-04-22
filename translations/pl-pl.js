/* istanbul ignore next */
(function(angular) {
    'use strict';

    angular.module('profitelo.translations.pl-pl', [])
    .config(['$translateProvider', function($translateProvider) {

        return $translateProvider.translations('pl-pl', {
        		"COMMON.COPYRIGHT":"2016 - iTelo sp z.o.o. All rights reserved.",
        		"COMMON.DIRECTIVES.INTERFACE.CALENDAR_LABEL":"Kalendarz",
        		"COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER":"Przeciągnij & Upuść",
        		"COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER_UPLOAD":"Ukończono",
        		"COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO":"lub kliknij by wgrać pliki",
        		"COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO_UPLOAD":"plik {{ file }} z {{ files }}",
        		"DASHBOARD.CONSULTATION_RANGE.ADD_NEXT_CONSULTATION":"Dodaj kolejną konsultację",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_COST_DESCRIPTION":"Sugerowana stawka 5zł",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_COST_PLACEHOLDER":"np. 5",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_CURRENCY_LABEL":"Waluta",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_NAME":"Nazwa Konsultacji",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_NAME_DESCRIPTION":"Możesz wpisać kilka problemów, w których się specjalizujesz.",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_NAME_PLACEHOLDER":"np: Poszukiwanie funduszy inwestycyjnych",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_RANGE_COST_PER_MINUTE":"Stawka za minutę połączenia",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_RANGE_PLACEHOLDER":"np: PIT",
        		"DASHBOARD.CONSULTATION_RANGE.CONSULTATION_RANGE_TITLE":"Zakres Konsultacji",
        		"DASHBOARD.CONSULTATION_RANGE.COST_SUMMARY":"{{ (cost/1.25) | number }} zł po odtrąceniu prowizji przez Profitelo (25%)",
        		"DASHBOARD.CONSULTATION_RANGE.CURRENCY_PLACEHOLDER":"PLN",
        		"DASHBOARD.CREATE_PROFILE.CREATE_PROFILE_PLACEHOLDER":"http://",
        		"DASHBOARD.CREATE_PROFILE.CREATE_PROFILE_TITLE":"Tworzenie konta usługodawcy",
        		"DASHBOARD.CREATE_PROFILE.CREATE_PROFILE_YOUR_LINKS":"Twoje linki:",
        		"DASHBOARD.CREATE_PROFILE.FILE_PREVIEW":"Podgląd Pliku",
        		"DASHBOARD.CREATE_PROFILE.NAME_COMPANY_PLACEHOLDER":"np. Profitelo",
        		"DASHBOARD.CREATE_PROFILE.NEXT_STEP":"Kolejny Etap",
        		"DASHBOARD.CREATE_PROFILE.STEP":"Krok:  {{ step }} / {{ steps }}",
        		"DASHBOARD.CREATE_PROFILE.STEP1_CHOOSE_PROFILE_DESCRIPTION":"Usługa może być świadczona tylko przez Ciebie, jak i przez Twoich pracowników.",
        		"DASHBOARD.CREATE_PROFILE.STEP1_CHOOSE_PROFILE_TITLE":"Zamierzam świadczyć konsultacje jako:",
        		"DASHBOARD.CREATE_PROFILE.STEP1_MORE_PERSON":"Świadczę usługę wieloosobowo",
        		"DASHBOARD.CREATE_PROFILE.STEP1_PROGRESS_BAR_TITLE":"Etap 1 - Tworzenie profilu firmy",
        		"DASHBOARD.CREATE_PROFILE.STEP2_DESCRIPTION":"Podaj swoją nazwę firmy pod którą będziesz prowadził konsultacje.",
        		"DASHBOARD.CREATE_PROFILE.STEP2_TITLE":"Nazwa Firmy*:",
        		"DASHBOARD.CREATE_PROFILE.STEP3_DESCRIPTION":"Logo powinno być w formacie jpg, png i nie przekraczać 2mb.",
        		"DASHBOARD.CREATE_PROFILE.STEP3_TITLE":"Logo Firmy*:",
        		"DASHBOARD.CREATE_PROFILE.STEP4_DESCRIPTION":"Krótki opis działalności firmy, czego można spodziewać po konsultacji.",
        		"DASHBOARD.CREATE_PROFILE.STEP4_TITLE":"Opis Twojej działalności:",
        		"DASHBOARD.CREATE_PROFILE.STEP5_DESCRIPTION":"Wgraj certyfikaty, dokumenty lub wizytówkę firmy.",
        		"DASHBOARD.CREATE_PROFILE.STEP5_TITLE":"Dokumenty:",
        		"DASHBOARD.CREATE_PROFILE.STEP5_UPLOAD_DOCUMENT":"Wgrane dokumenty:",
        		"DASHBOARD.CREATE_PROFILE.STEP6_DESCRIPTION":"Podziel się linkami społecznościowymi lub inną stroną www.",
        		"DASHBOARD.CREATE_PROFILE.STEP6_TITLE":"Linki zewnętrzne:",
        		"DASHBOARD.EXPERT_ACCOUNT.EXPERT_DESCRIPTION":"Opis Experta",
        		"DASHBOARD.EXPERT_ACCOUNT.EXPERT_DOCUMENT_TITLE_DESCRIPTION":"Wgraj certyfikaty, dokumenty lub swoją wizytówkę.",
        		"DASHBOARD.EXPERT_ACCOUNT.EXPERT_LANGUAGES":"Języki w jakich świadczysz konsultacje",
        		"DASHBOARD.EXPERT_ACCOUNT.EXPERT_LANGUAGE_PLACEHOLDER":"np. Język Angielski",
        		"DASHBOARD.EXPERT_ACCOUNT.EXPERT_PLACEHOLDER":"np. Jan Kowalski",
        		"DASHBOARD.EXPERT_ACCOUNT.EXPERT_TITLE_DESCRIPTION":"Krótki opis Twojej działalności, czego można spodziewać po konsultacji.",
        		"DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT":"Imię Nazwisko",
        		"DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION":"Podaj swoje Imię i Nazwisko pod którym będziesz prowadził konsultacje.",
        		"DASHBOARD.EXPERT_ACCOUNT.PROFILE_PHOTO":"Zdjęcie Profilowe",
        		"DASHBOARD.EXPERT_ACCOUNT.PROFILE_PHOTO_DESCRIPTION":"Zdjęcie powinno być w formacie jpg, png i nie przekraczać 2mb.",
        		"DASHBOARD.EXPERT_ACCOUNT.STEP1_PROGRESS_BAR_TITLE":"Etap 1 - Tworzenie profilu eksperta",
        		"DASHBOARD.MENU.AVAILABILITY":"Dostępność",
        		"DASHBOARD.MENU.CLIENT":"Klient",
        		"DASHBOARD.MENU.EXPERT":"Ekspert",
        		"DASHBOARD.MENU.EXPERT_BASE":"Baza Ekspertów",
        		"DASHBOARD.MENU.FAVOURITES":"Ulubione",
        		"DASHBOARD.MENU.LOGOUT":"Wyloguj",
        		"DASHBOARD.MENU.MY_ACCOUNT":"Moje Konto",
        		"DASHBOARD.MENU.NOTIFICATION":"Powiadomienia",
        		"DASHBOARD.MENU.SEARCH":"Wyszukiwarka",
        		"DASHBOARD.MENU.STEP1_ONE_PERSON":"Świadczę usługę jednoosobowo",
        		"INTERFACE.ALERT_ERROR":"Error",
        		"INTERFACE.ALERT_INFO":"Info",
        		"INTERFACE.ALERT_SUCCESS":"Success",
        		"INTERFACE.ALERT_WARNING":"Warning",
        		"INTERFACE.API_ERROR":"Błąd podczas komunikacji z serwisem. Spróbuj ponownie",
        		"LOGIN.ACCEPT_RULES":"Zapoznałem się i akceptuje <a>regulamin</a> serwisu",
        		"LOGIN.BACK":"Cofnij",
        		"LOGIN.BAD_LOGIN_CREDENTIALS":"Błędne hasło. Spróbuj ponownie.",
        		"LOGIN.DOWNLOAD_FREE_APP":"Pobierz bezpłatną aplikację na telefon:",
        		"LOGIN.ENTER_NUMBER":"wpisz swój numer",
        		"LOGIN.ENTER_NUMBER_PLACEHOLDER":"np. 599546342",
        		"LOGIN.FORGOT_PASSWORD":"Nie pamiętasz hasła?",
        		"LOGIN.FORGOT_PASSWORD.BAD_EMAIL_TOKEN":"Błędny link. Sprawdź poprawność lub wygeneruj nowy.",
        		"LOGIN.FORGOT_PASSWORD.BAD_SMS_CODE":"Błędnie wpisany kod",
        		"LOGIN.FORGOT_PASSWORD.EMAIL_HAD_BEEN_SENT":"Na twój adres email został wysłany link do zmiany hasła.",
        		"LOGIN.NEXT":"Dalej",
        		"LOGIN.NO_EMPTY_PASSWORD":"Hasło nie może być puste",
        		"LOGIN.OUR_SERVICES_1":"Prowadzimy już",
        		"LOGIN.OUR_SERVICES_2":"usług!",
        		"LOGIN.PASSWORD_ATTEMPTS_EXCEEDED":"Wpisałeś błędnie hasło zbyt wiele razy. Poczekaj jeszcze {{time}} aby móc spróbować pownownie.",
        		"LOGIN.PASSWORD_RECOVERY.ERROR":"Błąd podczas próby odzyskania twojego hasła. Spróbuj ponownie lub skontaktuj się z BOK.",
        		"LOGIN.PASSWORD_RECOVERY.PASSWORD_HAD_BEEN_CHANGED":"Hasło zostało pomyślnie zmienione. Możesz zalogować się do swojego konta korzystając z nowego hasła.",
        		"LOGIN.PHONE_NUMBER_REQUIRED":"Podaj poprawny numer telefonu",
        		"LOGIN.PREFIX":"prefix",
        		"LOGIN.PREFIX_PLACEHOLDER":"+48",
        		"LOGIN.SERVICE_PASSWORD":"Podaj hasło do usługi",
        		"LOGIN.SUCCESSFUL_LOGIN":"Zostałeś poprawnie zalogowany",
        		"LOGIN.SUCCESSFUL_LOGOUT":"Zostałeś poprawnie wylogowany.",
        		"LOGIN.TRUST_EXPERTS":"Zaufaj ekspertom i rozwiąż swoje problemy",
        		"LOGIN.VERIFICATION_ATTEMPTS_EXCEEDED":"Wpisałeś błędnie kod zbyt wiele razy. Poczekaj jeszcze {{time}} aby móc spróbować pownownie.",
        		"REGISTER.CHANGE_PASSWORD":"Zmień",
        		"REGISTER.CODE_REQUIRED":"Podaj poprawny kod weryfikacyjny",
        		"REGISTER.DONE":"Zakończ",
        		"REGISTER.EMAIL_REQUIRED":"Podaj poprawny adres email",
        		"REGISTER.ENTER_PHONE_NUMBER_FIRST":"Podaj najpierw numer telefonu.",
        		"REGISTER.REGISTRATION_SUCCESS":"Twoje konto zostało poprawnie założone. Zweryfikuj email, albo korzystać w pełni.",
        		"REGISTER.SERVICE_CODE":"Wpisz kod weryfikacyjny z smsa",
        		"REGISTER.SERVICE_CODE_PLACEHOLDER":"np. 476239",
        		"REGISTER.SERVICE_EMAIL":"Wpisz swój adres email",
        		"REGISTER.SERVICE_EMAIL_PLACEHOLDER":"np. jan.kowalski@profitelo.pl",
        		"REGISTER.SERVICE_PASSWORD":"ustaw nowe hasło do swojego konta",
        		"REGISTER.SERVICE_PASSWORD_PLACEHOLDER":"Hasło powinno składać się z minimum 8 znaków",
        		"REGISTER.SERVICE_PASSWORD_STRENGTH":"Siła Hasła",
        		"REGISTER.USER_PHONE":"Twój numer:",
        		"REGISTER.VALID_CHECKBOX":"Zaakceptuj regulamin",
        		"REGISTER.VALID_PASSWORD":"Podaj Hasło"
        })
    }])
})(angular);




