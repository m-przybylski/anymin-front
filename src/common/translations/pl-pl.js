angular.module('profitelo.translations.pl-pl', [])

.config( function($translateProvider) {

  return $translateProvider.translations('pl-pl', {
    // Pluralizations
    // **Pluralization** according to current language.
    // More info on how to translate (what formats are available for current language) you'll find in
    // [THIS WEBSITE](http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html)

    // If nothing set it'll show default strings in HTML templates

    'SAMPLE_TEST': 'Przykładowy test'

  })
})
