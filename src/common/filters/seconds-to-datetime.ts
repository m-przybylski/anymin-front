namespace profitelo.filters.secondsToDatetime {

  function filter() {
    return function(seconds: number) {
      const date = new Date(0, 0, 0, 0, 0, 0, 0)
      date.setSeconds(seconds)
      return date
    }
  }

  angular.module('profitelo.filters.seconds-to-datetime', [])
    .filter('secondsToDateTime', filter)
}
