angular.module('profitelo.translations.en-us', [])

.config(function($translateProvider) {

  return $translateProvider.translations('en-us', {
    // Pluralizations
    // **Pluralization** according to current language.
    // More info on how to translate (what formats are available for current language) you'll find in
    // [THIS WEBSITE](http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html)

    // If nothing set it'll show default strings in HTML templates

    'GENERAL.SEND': 'Send',
    'GENERAL.SAVE': 'Save',
    'GENERAL.SAVE_AND_NEXT': 'Save and next',

    'EXPERT_PROFILE.EXPERT_PROFILE': 'Expert\'s profile',
    'EXPERT_PROFILE.ACTIVE_PROFILE': 'Active profile',
    'EXPERT_PROFILE.INACTIVE_PROFILE': 'Inactive profile',
    'EXPERT_PROFILE.FIRSTNAME_LASTNAME_OR_COMPANY_PLACEHOLDER': 'First name and last name (or company name)',
    'EXPERT_PROFILE.GENERAL_INFO_PLACEHOLDER': 'General informations',
    'EXPERT_PROFILE.PROFILE_STATUS_TOOLTIP': 'Podpowiedź o aktywności profilu',
    'EXPERT_PROFILE.PROFILE_BACKGROUND_TOOLTIP': 'Podpowiedź o tle profilu',
    'EXPERT_PROFILE.PROFILE_AVATAR_TOOLTIP': 'Podpowiedź o awatarze profilu',
    'EXPERT_PROFILE.PROFILE_ON_BEHANCE_TOOLTIP': 'Podpowiedź o profilu na portalu Behance',
    'EXPERT_PROFILE.PROFILE_VIDEOS_TOOLTIP': 'Podpowiedź o filmach na profilu',
    'EXPERT_PROFILE.PROFILE_SOCIAL_MEDIA_TOOLTIP': 'Podpowiedź o relacjach z mediami społecznościowymi na profilu',
    'EXPERT_PROFILE.PROFILE_CERTIFICATES_TOOLTIP': 'Podpowiedź o certyfikatach, dokumentach i dyplomach profilu'

  })
})
