(function() {
  function searchFilters($filter, $timeout, searchService, $window) {
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

      const searchDebounceTimeout = 500

      scope.languagesList = []
      scope.sortList = []
      scope.categoryList = []
      scope.showMobileFilters = false

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
        scope.profileTypeList = options.profileType.map((type) => {
          return {
            name: $filter('translate')($filter('normalizeTranslationKey')(('SEARCH.PROFILE_TYPE.' + type.name))),
            value: type.value
          }
        })
      })

      scope.handleMobileFiltersDisplay = () => {
        const windowSize = $window.innerWidth
        return windowSize < 768 && !scope.showMobileFilters
      }

      scope.showFilters = () => {
        scope.showMobileFilters = scope.showMobileFilters ? false : true
      }

      scope.showMobileFilterButton = () => {
        const windowSize = $window.innerWidth
        return windowSize < 768
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
        scope.model.profileType = params.profileType
        scope.model.minPrice = params.minPrice
        scope.model.maxPrice = _maxPriceValue(params.maxPrice)
      })

      scope.$watch( () => {
        return scope.searchResults.relatedTags
      }, (newValue) => {
        if (newValue) {
          scope.model.tags = scope.searchResults.relatedTags
        }
      })

      const _setSearchQueryParamsDebounce = _.debounce(scope.setSearchParams, searchDebounceTimeout, {
        'leading': false,
        'trailing': true
      })

      const watchGroup = ['sortBy', 'language', 'category', 'onlyAvailable', 'minPrice', 'maxPrice', 'profileType']

      scope.$watchGroup(watchGroup.map((v) => {
        return 'model.' + v
      }), (newValues, oldValues) => {
        if (!angular.equals(newValues, oldValues)) {
          let searchQueryParams = {}
          angular.forEach(newValues, (value, idx) => {
            if (angular.isDefined(value)) {
              searchQueryParams[watchGroup[idx]] = value
            }
          })
          searchQueryParams['offset'] = 0
          _setSearchQueryParamsDebounce(searchQueryParams)
        }
      })
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/search/search-filters/search-filters.tpl.html',
      scope: {
        searchResults: '=?',
        setSearchParams: '='
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
