(function() {
  /* @ngInject */
  function proSearchDropdownController($q, $scope, $state, $location, $element, searchService, categoryService) {
    const qInput = $element.find('[data-ng-model="vm.ngModel"]')[0]

    this.collapsed = true
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
      if (this.ngModel && this.ngModel.length > 2) {
        this.collapsed = false

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
        this.collapsed = true
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
    }

    $scope.$watch(() => {
      return this.ngModel
    }, () => {
      _searchActionDebounce()
    })

    this.hideSuggestionMenu = () => {
      if ($state.name === 'app.home') {
        return !angular.element('.search-bar-container').find('input:focus')[1]
      } else {
        return !angular.element('.search-bar-container').find('input:focus')[0]
      }
    }

    $('.dropdown-container').perfectScrollbar()
    
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
