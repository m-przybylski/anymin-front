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
    'EXPERT_PROFILE.PROFILE_CERTIFICATES_TOOLTIP': 'Tooltip about profile\'s certificates, documents, diplomas'
  })
})
