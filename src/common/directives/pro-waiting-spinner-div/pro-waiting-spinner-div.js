function proWaitingSpinnerDiv($rootScope, $filter, $q, toastr) {

  function proWaitingSpinnerDivLinkFn($scope) {
    if ($scope.isPending || $scope.isPending.length > 0) {
      $scope.isPending = true
    } else {
      $scope.isPending = false
    }
  }

  return {
    restrict:       'E',
    replace:        true,
    templateUrl:    'directives/pro-waiting-spinner-div/pro-waiting-spinner-div.tpl.html',
    scope: {
      isPending:    '='
    },
    link: proWaitingSpinnerDivLinkFn
  }
}

angular.module('profitelo.directives.pro-waiting-spinner-div', [
  'pascalprecht.translate'
])
.directive('proWaitingSpinnerDiv', proWaitingSpinnerDiv)
