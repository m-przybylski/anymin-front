(function() {
  function semicolonToCommaInputFilter() {
    return function(input) {

      return input.replace(',', '.')
    }
  }
  angular.module('profitelo.filters.input-filter.semicolon-to-comma-input-filter', [])
    .filter('semicolonToCommaInputFilter', semicolonToCommaInputFilter)
}())