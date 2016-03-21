(function(angular) {
    'use strict';

    angular.module('profitelo.translations.en-us', [])
    .config(['$translateProvider', function($translateProvider) {

        return $translateProvider.translations('en-us', {
        		'APP.WIZARDS.CREATE_NEW_SERVICE.NEW_SERVICE':'Nowa usługa',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.EXPERT_PROFILE':'Profil Eksperta',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.FIRSTNAME_LASTNAME_OR_COMPANY_PLACEHOLDER':'Imię i nazwisko (lub nazwa firmy)',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.GENERAL_INFO_PLACEHOLDER':'Informacje ogólne',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY':'Dane zapisano pomyślnie',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.MESSAGES.FULLNAME_REQUIRED':'Pole z imieniem i nazwiskiem (lub nazwą firmy) nie może być puste',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.PROFILE_AVATAR_TOOLTIP':'Podpowiedź o awatarze profilu',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.PROFILE_BACKGROUND_TOOLTIP':'Podpowiedź o tle profilu',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.PROFILE_CERTIFICATES_TOOLTIP':'Podpowiedź o certyfikatach dla profilu',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.PROFILE_ON_BEHANCE_TOOLTIP':'Podpowiedź o profilu na portalu Behance',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.PROFILE_SOCIAL_MEDIA_TOOLTIP':'Podpowiedź o mediach społecznościowych dla profilu',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.PROFILE_VIDEOS_TOOLTIP':'Podpowiedź o plikach video dla profilu',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROFILE.SAVE_AND_NEXT':'Zapisz i dalej',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROGRESS.CREATING_EXPERT_PROFILE':'Tworzenie profilu eksperta',
        		'COMMON.DIRECTIVES.PRO_EXPERT_PROGRESS.PROFILE_DURING_THE_REVIEW':'Profil w trakcie weryfikacji',
        		'COMMON.DIRECTIVES.PRO_PROFILE_STATUS.ACTIVE_PROFILE':'Profil aktywny',
        		'COMMON.DIRECTIVES.PRO_PROFILE_STATUS.INACTIVE_PROFILE':'Profil nieaktywny',
        		'COMMON.DIRECTIVES.PRO_PROFILE_STATUS.PROFILE_STATUS_TOOLTIP':'Podpowiedź o status profilu',
        		'COMMON.DIRECTIVES.PRO_PROGRESS_BAR.CANCEL_EDITING':'Anuluj edycję',
        		'COMMON.DIRECTIVES.PRO_PROGRESS_BAR.NEXT_STEP':'Następny krok',
        		'COMMON.DIRECTIVES.PRO_PROGRESS_BAR.SAVE_EDITING':'Zapisz edycję',
        		'COMMON.DIRECTIVES.PRO_PROGRESS_BOX.COMPLETED':'Ukończone',
        		'COMMON.DIRECTIVES.PRO_REGISTRATION.PARTIAL.STEP1.CONTINUE':'Kontynuuj',
        		'COMMON.DIRECTIVES.PRO_REGISTRATION.PARTIAL.STEP1.EMAIL_SENT':'E-mail został wysłany. Sprawdź swoją skrzyknę mailową.',
        		'COMMON.DIRECTIVES.PRO_REGISTRATION.PARTIAL.STEP1.LOGIN_WITH_FACEBOOK':'Zaloguj się za pomocą fejsbuka',
        		'COMMON.DIRECTIVES.PRO_REGISTRATION.PARTIAL.STEP1.REGISTRATION':'Rejestracja',
        		'COMMON.DIRECTIVES.PRO_REGISTRATION.PARTIAL.STEP2.ALMOST_DONE':'Prawie gotowe',
        		'COMMON.DIRECTIVES.PRO_REGISTRATION.PARTIAL.STEP2.ID_NUMER':'Numer ID',
        		'COMMON.DIRECTIVES.PRO_WAITING_SPINNER_DIV.LOADING':'Wczytywanie'
        })
    }])
})(angular);




