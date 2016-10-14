(function() {
  function searchBoldFilter() {
    return (element, query) => {
      
      return element.replace(new RegExp('('+ query + ')', 'gi'), '<strong>$1</strong>')
    }
  }
  angular.module('profitelo.filters.search-bold-filter', [])
    .filter('searchBoldFilter', searchBoldFilter)
}())