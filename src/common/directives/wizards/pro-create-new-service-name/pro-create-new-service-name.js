function proCreateNewServiceName($http) {

  function linkFunction(scope, elem, attrs) {
    console.log($http)
  }

  return {
    replace: true,
    templateUrl: 'directives/wizards/pro-create-new-service-name/pro-create-new-service-name.tpl.html',
    scope: {
      current: '=',
      order: '='
    },
    link: linkFunction
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