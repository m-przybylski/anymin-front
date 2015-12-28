angular.module('profitelo.translations.en-us', [])

.config( function($translateProvider) {

  return $translateProvider.translations('en-us', {
    // Pluralizations
    // **Pluralization** according to current language.
    // More info on how to translate (what formats are available for current language) you'll find in
    // [THIS WEBSITE](http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html)

    // If nothing set it'll show default strings in HTML templates

    'EXPERT_PROFILE.EXPERT_PROFILE': 'Expert\'s profile',
    'EXPERT_PROFILE.INACTIVE_PROFILE': 'Inactive profile',
    'EXPERT_PROFILE.FIRSTNAME_LASTNAME_OR_COMPANY_PLACEHOLDER': 'First name and last name (or company name)',
    'EXPERT_PROFILE.GENERAL_INFO_PLACEHOLDER': 'General informations'


  })
})
