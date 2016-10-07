(function() {
  /* @ngInject */
  function proSearchDropdownController($q, $scope, $state, $location, $element, searchService, categoryService, searchUrlService) {
    const qInput = $element.find('[data-ng-model="vm.ngModel"]')[0]

    this.isCollapsed = true
    this.isFocused = false
    this.isMouseOverDropdown = false
    this.categorySlugs = {}
    this.waitForResponse = false
    this.suggestions = {
      primary: '',
      terms: [],
      tags: [],
      services: {},
      experts: {},
      organizations: {}
    }
    
    this.loadingSuggestion = false
    this.lastSearchWord = ''

    const _updateSuggestions = (searchWord) => {
      if (angular.isDefined(searchWord) && searchWord !== null && searchWord.toString().length >= 3) {
        this.loadingSuggestion = true
        $q.all([
          searchService.suggest(this.ngModel),
          categoryService.getCategorySlugs()
        ]).then((data) => {
          this.suggestions.terms = data[0].terms
          this.suggestions.tags = data[0].tags
          this.suggestions.services = data[0].services
          this.suggestions.experts = data[0].experts
          this.suggestions.organizations = data[0].organizations
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
        if (qInput && qInput.scrollLeft > 0) {
          this.suggestions.primary = null
        } else {
          this.suggestions.primary = this.ngModel + ' test'
        }

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

    this.search = () => {
      _focusOut()
      $state.go('app.search-result', {q: this.ngModel, tagId: ''})
    }

    const _focus = () => {
      this.isFocused = true
      this.isCollapsed = false

      if (!this.loadingSuggestion && angular.isDefined(this.ngModel) && this.ngModel !== this.lastSearchWord) {
        _updateSuggestions(this.ngModel)
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
    }

    $scope.$watch(() => {
      return this.ngModel
    }, () => {
      _searchActionDebounce()
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
      showFn: '&'
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
