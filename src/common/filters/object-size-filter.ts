(function() {
  function objectSizeFilter() {
    return (obj) => {
      const keys = Object.keys(obj)
      return keys ? keys.length : 0
    }
  }
  angular.module('profitelo.filters.object-size-filter', [])
    .filter('objSize', objectSizeFilter)
}())
