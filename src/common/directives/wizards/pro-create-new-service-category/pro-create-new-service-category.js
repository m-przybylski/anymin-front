function proCreateNewServiceCategory($http) {

  function linkFunction(scope, elem, attrs) {

    let order = parseInt(scope.order, 10)

    scope.show = false
    scope.past = false

    scope.$watch('queue', (newValue) => {
      scope.show = angular.equals(scope.queue.currentActiveSection, order)
      scope.past = scope.queue.currentActiveSection > order
    }, true)

    scope.categories = ['Podatki', 'Prawo finansowe', 'Księgowość', 'Prawo podatkowe', 'Dokumenty', 'Pomoc biurowa', 'Biuro rachunkowe', 'Inwestycje']

    scope.selectedCategory = ''
    scope.selectCategory = (category) =>{
      if (scope.selectedCategory===category) {
        scope.selectedCategory = ''
      }else {
        scope.selectedCategory = category
      }
    }
  }
  return {
    replace: true,
    templateUrl: 'directives/wizards/pro-create-new-service-category/pro-create-new-service-category.tpl.html',
    scope: {
      userProfile:  '=',
      queue:        '=',
      order:        '@'
    },
    link: linkFunction
  }
}

angular.module('profitelo.directives.wizards.pro-create-new-service-category', [
])

.directive('proCreateNewServiceCategory', proCreateNewServiceCategory)

