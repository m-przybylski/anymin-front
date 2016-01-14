function proCreateNewServiceIndustry($http) {

  function linkFunction(scope, elem, attrs) {
    scope.industries = ['Prawo', 'Biznes', 'Medycyna', 'Motoryzacja', 'Budownictwo', 'Edukacja', 'AGD/RTV', 'Informatyka']

    scope.selectedIndustry = ''
    scope.selectIndustry = (industry) =>{
      if (scope.selectedIndustry===industry) {
        scope.selectedIndustry = ''
      }else {
        scope.selectedIndustry = industry
      }
    }
  }
  return {
    replace:        true,
    templateUrl:    'directives/wizards/pro-create-new-service-tags/pro-create-new-service-tags.tpl.html',
    scope: {
      userProfile:  '='
    },
    link: linkFunction
  }

}

angular.module('profitelo.directives.wizards.pro-create-new-service-tags', [
])

.directive('proCreateNewServiceTags', proCreateNewServiceIndustry)

