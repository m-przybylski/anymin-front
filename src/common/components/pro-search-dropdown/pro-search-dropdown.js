(function() {
  /* @ngInject */
  function proSearchDropdownController($q, $scope, searchService, categoryService) {
    const qInput = $('[data-ng-model="q"]')

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

    $scope.$watch('q', () => {
      if ($scope.q && $scope.q.length > 0) {
        this.collapsed = false

        $q.all([
          searchService.suggest($scope.q),
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
          this.suggestions.primary = this.q + ' test'
        }
      } else {
        this.collapsed = true
      }

    })

    return this

  }

  let proSearchDropdown = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/pro-search-dropdown.tpl.html',
    controller:  [proSearchDropdownController],
    controllerAs: 'vm',
    bindings: {
    }
  }

  angular.module('profitelo.components.pro-search-dropdown', [
    'commonConfig',
    'profitelo.services.search',
    'profitelo.services.categories',
    'profitelo.filters.normalize-translation-key-filter',
    'profitelo.components.pro-search-dropdown.term-suggestions',
    'profitelo.components.pro-search-dropdown.organization-suggestions',
    'profitelo.components.pro-search-dropdown.tag-suggestions',
    'profitelo.components.pro-search-dropdown.service-suggestions',
    'profitelo.components.pro-search-dropdown.expert-suggestions'

  ])
    .component('proSearchDropdown', proSearchDropdown)

}())
