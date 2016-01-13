function proCreateNewServiceIndustry($http) {

  function linkFunction(scope, elem, attrs) {
    scope.industries = ['Prawo', 'Biznes', 'Medycyna', 'Motoryzacja', 'Budownictwo', 'Edukacja', 'AGD/RTV', 'Informatyka']

  }
  return {
    replace:        true,
    templateUrl:    'directives/wizards/pro-create-new-service-industry/pro-create-new-service-industry.tpl.html',
    scope: {
      userProfile:  '='
    },
    link: linkFunction
  }

}

angular.module('profitelo.directives.wizards.pro-create-new-service-industry', [
])

.directive('proCreateNewServiceIndustry', proCreateNewServiceIndustry)

