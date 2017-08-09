namespace profitelo.filters.searchBold {

  function searchBoldFilter(): (element: any, query: string) => string {
    return (element: any, query: string): string =>
      element.replace(new RegExp('(' + query + ')', 'gi'), '<strong>$1</strong>')
  }
  angular.module('profitelo.filters.search-bold-filter', [])
    .filter('searchBoldFilter', searchBoldFilter)
}
