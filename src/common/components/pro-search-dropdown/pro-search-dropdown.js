(function() {
  /* @ngInject */
  function proSearchDropdownController($q, $scope, $state, $location, $element, searchService, categoryService) {
    const qInput = $element.find('[data-ng-model="vm.ngModel"]')[0]

    this.isCollapsed = true
    this.isFocused = false
    this.mouseOverDropdown = false
    this.categorySlugs = {}
    this.suggestions = {
      primary: '',
      terms: [],
      tags: [],
      services: {},
      experts: {},
      organizations: {}
    }

    const _searchAction = () => {
      if (this.ngModel && this.ngModel.length > 2 && this.isFocused) {
        this.isCollapsed = false

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
        })
        if (qInput && qInput.scrollLeft > 0) {
          this.suggestions.primary = null
        } else {
          this.suggestions.primary = this.ngModel + ' test'
        }
      } else {
        this.isCollapsed = true
      }
    }

    const _searchActionDebounce = _.debounce(_searchAction, 200, {
      'leading': false,
      'trailing': true
    })

    this.autofocus = () => {
      console.log("focus")
      this.collapsed = false
    }

    this.search = () => {
      if ($state.current.name !== 'app.search-result') {
        $state.go('app.search-result', {q: this.ngModel})
      }
      $location.search('tagId', null)
      this.isCollapsed = true
      this.isFocused = false
    }

    this.onFocus = () => {
      this.isFocused = true
      this.isCollapsed = false
      console.log('on focus')
    }

    this.onFocusOut = () => {
      if(!this.mouseOverDropdown) {
        this.isFocused = false
        this.isCollapsed = true
        console.log('on focus out')
      }
    }

    this.onDropdownMouseLeave = () => {
      this.mouseOverDropdown = false
    }

    this.onDropdownMouseEnter = () => {
      this.mouseOverDropdown = true
    }

    $scope.$watch(() => {
      return this.ngModel
    }, () => {
      _searchActionDebounce()
    })

    $element.find('.dropdown-container').perfectScrollbar()
    
    return this
  }

  let proSearchDropdown = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/pro-search-dropdown.tpl.html',
    controller:  proSearchDropdownController,
    controllerAs: 'vm',
    bindings: {
      ngModel: '=?'
    }
  }

  angular.module('profitelo.components.pro-search-dropdown', [
    'commonConfig',
    'profitelo.services.search',
    'profitelo.services.categories',
    'ui.router',
    'profitelo.filters.normalize-translation-key-filter',
    'profitelo.components.pro-search-dropdown.term-suggestions',
    'profitelo.components.pro-search-dropdown.organization-suggestions',
    'profitelo.components.pro-search-dropdown.tag-suggestions',
    'profitelo.components.pro-search-dropdown.service-suggestions',
    'profitelo.components.pro-search-dropdown.expert-suggestions'

  ])
    .component('proSearchDropdown', proSearchDropdown)

}())
