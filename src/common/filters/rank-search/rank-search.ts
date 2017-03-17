namespace profitelo.filters.rankSearch {

  function filter() {
    return function(array: Array<any>, searchKey: string, props: Array<string>) {
      if (!array || !searchKey || !props) {
        return array
      }

      for (let i = 0; i < array.length; i++) {
        const obj = array[i]
        obj.rankSearch = 0
        for (let j = 0; j < props.length; j++) {
          const index = obj[props[j]].indexOf(searchKey)
          obj.rankSearch += (index === -1 ? 15 : index) * ((j + 1) * 8)
        }
      }

      return array
    }
  }

  angular.module('profitelo.filters.rankSearch', [])
    .filter('rankSearch', filter)
}
