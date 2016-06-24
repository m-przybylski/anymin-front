(function() {
  function proSearchDropdown($q, searchService, categoryService) {

    function linkFunction(scope, element) {
      const qInput = element.find('[data-ng-model="q"]')[0]

      scope.collapsed = true
      scope.categorySlugs = {}
      scope.suggestions = {
        primary: '',
        terms: [],
        tags: [],
        services: {},
        experts: {},
        organizations: {}
      }

      scope.$watch('q', () => {
        if (scope.q && scope.q.length > 0) {
          scope.collapsed = false

          $q.all([
            searchService.suggest(scope.q),
            categoryService.getCategorySlugs()
          ]).then((data) => {
            scope.suggestions.terms = data[0].terms
            scope.suggestions.tags = data[0].tags
            scope.suggestions.services = data[0].services
            scope.suggestions.experts = data[0].experts
            scope.suggestions.organizations = data[0].organizations
            scope.categorySlugs = data[1]
          })
          if (qInput && qInput.scrollLeft > 0) {
            scope.suggestions.primary = null
          } else {
            scope.suggestions.primary = scope.q + ' test'
          }
        } else {
          scope.collapsed = true
        }
      })

    }

    return {
      templateUrl:  'directives/pro-search-dropdown/pro-search-dropdown.tpl.html',
      restrict:     'E',
      replace:      true,
      link:         linkFunction,
      scope: {
        ngModel: '='
      }
    }
  }

  angular.module('profitelo.directives.pro-search-dropdown', [
    'profitelo.services.search',
    'profitelo.services.categories'
  ])
  .directive('proSearchDropdown', proSearchDropdown)

}())
