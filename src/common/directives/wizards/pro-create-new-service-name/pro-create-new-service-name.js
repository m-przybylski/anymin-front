function proCreateNewServiceName($http) {
  return {
    replace: true,
    templateUrl: 'directives/wizards/pro-create-new-service-name/pro-create-new-service-name.tpl.html',
    scope: {
      serviceState: '=',
      userProfile: '='
    },
    link: (scope, elem, attrs) => {
      console.log($http)
      scope.costam = ''
    }
  }
}

angular.module('profitelo.directives.wizards.pro-create-new-service-name', [
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.api.profiles'
])

.directive('proCreateNewServiceName', proCreateNewServiceName)