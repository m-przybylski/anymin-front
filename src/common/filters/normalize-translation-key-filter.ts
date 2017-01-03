(function() {
  function normalizeTranslationKeyFilter() {
    return function(input) {
      return String(input).toUpperCase().split('-').join('_')
    }
  }
  angular.module('profitelo.filters.normalize-translation-key-filter', [])
    .filter('normalizeTranslationKey', normalizeTranslationKeyFilter)
}())
