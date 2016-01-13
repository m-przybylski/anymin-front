function proCreateNewServiceCategory($http) {

  function linkFunction(scope, elem, attrs) {
    scope.categories = ['Podatki', 'Prawo finansowe', 'Księgowość', 'Prawo podatkowe', 'Dokumenty', 'Pomoc biurowa', 'Biuro rachunkowe', 'Inwestycje']

    scope.selectedCategory = ""
    scope.selectCategory = (category) =>{
      if(scope.selectedCategory==category) {
        scope.selectedCategory = ""
      }else{
        scope.selectedCategory = category
      }
    }
  }
  return {
    replace:        true,
    templateUrl:    'directives/wizards/pro-create-new-service-category/pro-create-new-service-category.tpl.html',
    scope: {
      userProfile:  '='
    },
    link: linkFunction
  }

}

angular.module('profitelo.directives.wizards.pro-create-new-service-category', [
])

.directive('proCreateNewServiceCategory', proCreateNewServiceCategory)

