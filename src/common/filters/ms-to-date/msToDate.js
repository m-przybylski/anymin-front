(function() {
  function filter() {
    return function(milliseconds) {
      const date = new Date(0, 0, 0, 0, 0, 0, 0)
      date.setMilliseconds(milliseconds)
      return date
    }
  }

  angular.module('profitelo.filters.milliseconds-to-datetime', [])
    .filter('millisecondsToDatetime', filter)
}())