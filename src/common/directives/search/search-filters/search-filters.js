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
        scope.languagesList = options.language.map((lng) => {
          return {
            name: $filter('translate')($filter('normalizeTranslationKey')(('SEARCH.LANGUAGE.' + lng.name))),
            value: lng.value
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

      scope.tagsAction = (tag)=> {
        scope.tagClickAction(tag)
        scope.model.tags = []
      }

      const _maxPriceValue = (maxPrice) => {
        if (angular.isUndefined(maxPrice) || maxPrice === null) {
          return 100
        } else {
          return maxPrice
        }
      }

      searchService.onQueryParamsChange(scope, (params) => {
        scope.model.sortBy = params.sortBy
        scope.model.language = params.language
        scope.model.category = params.category
        scope.model.onlyAvailable = params.onlyAvailable
        scope.model.minPrice = params.minPrice
        scope.model.maxPrice = _maxPriceValue(params.maxPrice)
      })

      searchService.onSearchResults(scope, (results) => {
        scope.model.tags = results.relatedTags
      })

      const setSearchQueryParamsDebounce = _.debounce(searchService.setSearchQueryParams, 500, {
        'leading': false,
        'trailing': true
      })

      const watchGroup = ['sortBy', 'language', 'category', 'onlyAvailable', 'minPrice', 'maxPrice']

      scope.$watchGroup(watchGroup.map((v) => { return 'model.' + v }), (newValues, oldValues) => {
        let searchQueryParams = {}
        angular.forEach(newValues, (value, idx) => {
          if (angular.isDefined(value)) {
            searchQueryParams[watchGroup[idx]] = value
          }
        })
        searchQueryParams['offset'] = 0
        setSearchQueryParamsDebounce(searchQueryParams)
      })
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/search/search-filters/search-filters.tpl.html',
      scope: {
        tagClickAction: '=?',
        searchResults: '=?'
      },
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
