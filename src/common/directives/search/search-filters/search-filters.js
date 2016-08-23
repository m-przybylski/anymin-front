(function() {
  function searchFilters($filter, searchService, categoryService) {
    function linkFunction(scope, element, attrs) {

      scope.model = {
        sortBy: null,
        language: null,
        category: null,
        onlyAvailable: false,
        minPrice: null,
        maxPrice: null,
        tags: []
      }

      scope.languagesList = []
      scope.sortList = []
      scope.categoryList = []

      searchService.getAvailableOptions().then((options) => {

        scope.languagesList = options.language.map((val) => {
          return {
            name: $filter('translate')($filter('normalizeTranslationKey')(('SEARCH.LANGUAGE.' + val))),
            value: val
          }
        })
        scope.sortList = options.sortBy.map((val) => {
          return {
            name: $filter('translate')($filter('normalizeTranslationKey')(('SEARCH.SORT_BY.' + val))),
            value: val
          }
        })
        scope.categoryList = options.category.map((cat) => {
          return {
            name: $filter('translate')($filter('normalizeTranslationKey')(('CATEGORY.' + cat.name))),
            value: cat.value
          }
        })

      })

      scope.tagsAction = (id)=> {
        scope.tagClickAction(id)
      }

      searchService.onQueryParamsChange(scope, (params) => {
        scope.model.sortBy = params.sortBy
        scope.model.language = params.language
        scope.model.category = params.category
        scope.model.onlyAvailable = params.onlyAvailable
        scope.model.minPrice = params.minPrice
        scope.model.maxPrice = params.maxPrice
      })

      searchService.onSearchResults(scope, (results) => {
        let tagMap = {}
        angular.forEach(results.results, (r) => {
          angular.extend(tagMap, r.tags)
        })
        scope.model.tags = []
        angular.forEach(tagMap, (name, id) => {
          scope.model.tags.push({
            id: id,
            name: name
          })
        })
      })

      const watchGroup = ['sortBy', 'language', 'category', 'onlyAvailable', 'minPrice', 'maxPrice']

      scope.$watchGroup(watchGroup.map((v) => { return 'model.' + v }), (newValues, oldValues) => {
        let searchQueryParams = {}
        angular.forEach(newValues, (value, idx) => {
          if (angular.isDefined(value)) {
            searchQueryParams[watchGroup[idx]] = value
          }
        })
        searchService.setSearchQueryParams(searchQueryParams)
      })

    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/search/search-filters/search-filters.tpl.html',
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.search.search-filters', [
    'profitelo.directives.interface.pro-dropdown',
    'profitelo.directives.interface.pro-range-slider',
    'rzModule',
    'pascalprecht.translate',
    'profitelo.directives.pro-tags-slider',
    'profitelo.directives.interface.pro-switcher',
    'profitelo.services.search',
    'profitelo.services.categories',
    'profitelo.filters.normalize-translation-key-filter'
  ])
    .directive('searchFilters', searchFilters)
}())
