namespace profitelo.filters.searchBold {

  function searchBoldFilter() {
    return (element: any, query: string) => {

      return element.replace(new RegExp('('+ query + ')', 'gi'), '<strong>$1</strong>')
    }
  }
  angular.module('profitelo.filters.search-bold-filter', [])
    .filter('searchBoldFilter', searchBoldFilter)
}
