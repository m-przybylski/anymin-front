(function() {
  /* @ngInject */
  function proSearchDropdownController($q, $scope, $state, $timeout, $element, searchService, categoryService) {

    this.isCollapsed = true
    this.isFocused = false
    this.isMouseOverDropdown = false
    this.categorySlugs = {}
    this.currentTagId = null
    this.suggestions = {
      primary: '',
      terms: [],
      tags: [],
      services: {},
      experts: {},
      organizations: {}
    }

    this.suggestionsLength = 0
    
    this.loadingSuggestion = false
    this.lastSearchWord = ''

    const _deserializeSuggestions = (rawData) => {
      const result = {
        primary: '',
        terms: [],
        tags: [],
        services: {},
        experts: {},
        organizations: {}
      }
      if (angular.isUndefined(rawData)) {
        return result
      }
      if (angular.isDefined(rawData.terms)) {
        result.terms = rawData.terms
      }
      if (angular.isDefined(rawData.tags)) {
        result.tags = rawData.tags
      }
      if (angular.isDefined(rawData.services)) {
        result.services = rawData.services
      }
      if (angular.isDefined(rawData.experts)) {
        result.experts = rawData.experts
      }
      if (angular.isDefined(rawData.organizations)) {
        result.organizations = rawData.organizations
      }
      return result
    }

    const _countSuggestions = (suggestions) => {
      const servicesCount = angular.isDefined(suggestions.services.count) ? suggestions.services.count : 0
      const expertsCount = angular.isDefined(suggestions.experts.count) ? suggestions.experts.count : 0
      const organizationsCount = angular.isDefined(suggestions.organizations.count) ? suggestions.organizations.count : 0
      return suggestions.terms.length + suggestions.tags.length + servicesCount + expertsCount + organizationsCount
    }

    const _updateSuggestions = (searchWord) => {
      if (angular.isDefined(searchWord) && searchWord !== null && searchWord.toString().length >= 3) {
        this.loadingSuggestion = true
        $q.all([
          searchService.suggest(this.ngModel),
          categoryService.getCategorySlugs()
        ]).then((data) => {
          this.suggestions = _deserializeSuggestions(data[0])
          this.suggestionsLength = _countSuggestions(this.suggestions)
          this.categorySlugs = data[1]
          this.lastSearchWord = searchWord
          this.loadingSuggestion = false
        }, () => {
          this.loadingSuggestion = false
        })
      }
    }

    const _searchAction = () => {
      if (this.ngModel && this.ngModel.length >= 3 && this.isFocused) {
        this.isCollapsed = false
        _updateSuggestions(this.ngModel)

      } else {
        this.isCollapsed = true
      }
    }

    const _focusOut = () => {
      this.isFocused = false
      this.isCollapsed = true
    }

    const _searchActionDebounce = _.debounce(_searchAction, 200, {
      'leading': false,
      'trailing': true
    })

    const _focus = () => {
      this.isFocused = true
      this.isCollapsed = false

      if (!this.loadingSuggestion && angular.isDefined(this.ngModel) && this.ngModel !== this.lastSearchWord) {
        _updateSuggestions(this.ngModel)
      }
    }

    this.search = () => {
      _focusOut()
      if (angular.isDefined(this.ngModel) && this.ngModel.length > 0) {
        $state.go('app.search-result', {q: this.ngModel, tagId: this.currentTagId})
      }

    }

    this.onFocus = () => {
      _focus()
    }

    this.onFocusOut = () => {
      if (!this.isMouseOverDropdown) {
        _focusOut()
      }
    }

    this.onDropdownMouseLeave = () => {
      this.isMouseOverDropdown = false
    }

    this.onDropdownMouseEnter = () => {
      this.isMouseOverDropdown = true
    }

    this.clearModel = () => {
      this.ngModel = null
      this.currentTagId = null
    }

    this.showResultsCounter = () => {
      return !!this.searchCount && this.searchCount > 0 && this.isCollapsed
    }

    $scope.$watch(() => {
      return this.ngModel
    }, (newValue) => {
      if (angular.isDefined(newValue) && newValue !== null && !this.isCollapsed
        && newValue.length > 2 && !!this.suggestions.tags && this.suggestions.tags.length > 0
        && ((this.suggestions.tags[0].name).toLowerCase()).includes(this.ngModel.toLowerCase())) {
        this.suggestions.primary = this.suggestions.tags[0].name
      } else {
        this.currentTagId = null
        this.suggestions.primary = null
      }
      _searchActionDebounce()
    })

    $element.bind('keydown keypress', (event) => {
      const keyCode = event.which || event.keyCode
      if (keyCode === 39 && this.suggestions.primary !== null) {
        this.ngModel = this.suggestions.primary
        this.currentTagId = this.suggestions.tags[0].id
        $scope.$digest()
      } else if (keyCode === 8) {
        this.currentTagId = null
      }
    })

    $element.find('.dropdown-container').perfectScrollbar()
    
    return this
  }

  const proSearchDropdown = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/pro-search-dropdown.tpl.html',
    controller:  proSearchDropdownController,
    controllerAs: 'vm',
    bindings: {
      ngModel: '=?',
      hideFn: '&',
      showFn: '&',
      searchCount: '=?'
    }
  }

  angular.module('profitelo.components.pro-search-dropdown', [
    'commonConfig',
    'profitelo.services.search',
    'profitelo.services.categories',
    'ui.router',
    'profitelo.components.interface.preloader',
    'profitelo.filters.normalize-translation-key-filter',
    'profitelo.components.pro-search-dropdown.term-suggestions',
    'profitelo.components.pro-search-dropdown.organization-suggestions',
    'profitelo.components.pro-search-dropdown.tag-suggestions',
    'profitelo.components.pro-search-dropdown.service-suggestions',
    'profitelo.components.pro-search-dropdown.expert-suggestions'

  ])
    .component('proSearchDropdown', proSearchDropdown)

}())
