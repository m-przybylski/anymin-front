function proCreateNewServiceTypeSelfConsultants() {

  function linkFunction(scope, element, attrs) {




  }
  return {
    replace:        true,
    templateUrl:    'directives/wizards/type/pro-create-new-service-self-consultants/pro-create-new-service-self-consultants.tpl.html',
    scope: {
      userProfile:  '=',
      queue:    '=',
      order:    '@',
      service:  '='
    },
    link: linkFunction
  }

}

angular.module('profitelo.directives.wizards.pro-create-new-service-self-consultants', [
])

.directive('proCreateNewServiceTypeSelfConsultants', proCreateNewServiceTypeSelfConsultants)

