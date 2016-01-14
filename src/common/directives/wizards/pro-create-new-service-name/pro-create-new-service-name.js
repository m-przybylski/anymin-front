function proCreateNewServiceName($http, $timeout) {

  function linkFunction(scope, elem, attrs) {

    let order = parseInt(scope.order, 10)

    scope.show = false
    scope.past = false

    scope.$watch('queue', (newValue) => {
      scope.show = angular.equals(scope.queue.currentActiveSection, order)
      scope.past = scope.queue.currentActiveSection > order

    }, true)

  }

  return {
    replace: true,
    templateUrl: 'directives/wizards/pro-create-new-service-name/pro-create-new-service-name.tpl.html',
    scope: {
      queue:      '=',
      order:        '@'
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