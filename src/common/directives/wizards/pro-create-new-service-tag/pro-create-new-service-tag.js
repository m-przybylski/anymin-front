function proCreateNewServiceTag($http) {

  function linkFunction(scope, elem, attrs) {
    scope.tags = ['VAT', 'Prawo finansowe', 'Księgowość', 'Prawo podatkowe', 'PIT', 'CIT', 'Biuro rachunkowe', 'Inwestycje']
    scope.tagMap = new Object()
    angular.forEach(scope.tags, (value, key) =>{
      scope.tagMap[value] = false
    })

    scope.selectTag = (tag) =>{
      scope.tagMap[tag] = !scope.tagMap[tag]
    }
  }
  return {
    replace:        true,
    templateUrl:    'directives/wizards/pro-create-new-service-tag/pro-create-new-service-tag.tpl.html',
    scope: {
      userProfile:  '='
    },
    link: linkFunction
  }

}

angular.module('profitelo.directives.wizards.pro-create-new-service-tag', [
])

.directive('proCreateNewServiceTag', proCreateNewServiceTag)

