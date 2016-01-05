angular.module('profitelo.translations.pl-pl', [])

.config( function($translateProvider) {

  return $translateProvider.translations('pl-pl', {
    // Pluralizations
    // **Pluralization** according to current language.
    // More info on how to translate (what formats are available for current language) you'll find in
    // [THIS WEBSITE](http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html)

    // If nothing set it'll show default strings in HTML templates

    'GENERAL.LOADING': 'Wczytywanie',
    'GENERAL.SEND': 'Wyślij',
    'GENERAL.SAVE': 'Zapisz',
    'GENERAL.SAVE_AND_NEXT': 'Zapisz i przejdź dalej',

    'EXPERT_PROFILE.EXPERT_PROFILE': 'Profil Experta',
    'EXPERT_PROFILE.ACTIVE_PROFILE': 'Profil aktywny',
    'EXPERT_PROFILE.INACTIVE_PROFILE': 'Profil nieaktywny',
    'EXPERT_PROFILE.FIRSTNAME_LASTNAME_OR_COMPANY_PLACEHOLDER': 'Imię i nazwisko (lub nazwa firmy)',
    'EXPERT_PROFILE.GENERAL_INFO_PLACEHOLDER': 'Informacje ogólne',
    'EXPERT_PROFILE.PROFILE_STATUS_TOOLTIP': 'Tooltip about active and inactive profile',
    'EXPERT_PROFILE.PROFILE_BACKGROUND_TOOLTIP': 'Tooltip about profile\'s background',
    'EXPERT_PROFILE.PROFILE_AVATAR_TOOLTIP': 'Tooltip about profile\'s avatar',
    'EXPERT_PROFILE.PROFILE_ON_BEHANCE_TOOLTIP': 'Tooltip about user\'s profil,e on behance',
    'EXPERT_PROFILE.PROFILE_VIDEOS_TOOLTIP': 'Tooltip about profile\'s videos',
    'EXPERT_PROFILE.PROFILE_SOCIAL_MEDIA_TOOLTIP': 'Tooltip about profile\'s social media relations',
    'EXPERT_PROFILE.PROFILE_CERTIFICATES_TOOLTIP': 'Tooltip about profile\'s certificates, documents, diplomas',
    'EXPERT_PROFILE.MESSAGES.FULLNAME_REQUIRED': 'Pole z imieniem i nazwiskiem (lub nazwą firmą) nie może być puste',
    'EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY': 'Dane zapisano pomyślnie',
    'EXPERT_PROGRESS.EXPERT.TITLE':'Profil experta',
    'EXPERT_PROGRESS.EXPERT.DESCRIPTION':  'Stwórz swoją wizytówkę! Opisz firmę, dodaj referencje...',
    'EXPERT_PROGRESS.EXPERT.UISREF.TITLE': 'Uzupełnij profil',
    'EXPERT_PROGRESS.EXPERT.UISREF.TITLE.DONE':'Zobacz profil',
    'EXPERT_PROGRESS.SERVICES.TITLE':'Usługi',
    'EXPERT_PROGRESS.SERVICES.DESCRIPTION': 'Opisz czym się zajmujesz i jakiej pomocy inni moga oczekiwać',
    'EXPERT_PROGRESS.SERVICES.UISREF.TITLE': 'Dodaj usługę',
    'EXPERT_PROGRESS.SERVICES.UISREF.TITLE.DONE':'Zobacz usługę',
    'EXPERT_PROGRESS.VERIFICATION.TITLE': 'Weryfikacja',
    'EXPERT_PROGRESS.VERIFICATION.DESCRIPTION': 'Zweryfikuj profil. Sprawdzimy czy wszystko się zgadza',
    'EXPERT_PROGRESS.VERIFICATION.UISREF.TITLE': 'Zgłoś do weryfikacji'
  })
})
