namespace profitelo.filters.semicolonToCommaInput {

  function semicolonToCommaInputFilter() {
    return function(input: string) {

      return input.replace(',', '.')
    }
  }

  angular.module('profitelo.filters.input-filter.semicolon-to-comma-input-filter', [])
    .filter('semicolonToCommaInputFilter', semicolonToCommaInputFilter)
}
