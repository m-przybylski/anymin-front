(function() {
  function filter() {
    return function(array, searchKey, props) {
      if (!array || !searchKey || !props) {
        return array
      }

      for (var i =0; i<array.length; i++) {
        var obj = array[i]
        obj.rankSearch = 0
        for (var j=0; j<props.length; j++) {
          var index = obj[props[j]].indexOf(searchKey)
          obj.rankSearch += (index === -1 ? 15 : index) * ((j+1)*8)
        }
      }

      return array
    }
  }

  angular.module('profitelo.filters.rankSearch', [])
    .filter('rankSearch', filter)
}())