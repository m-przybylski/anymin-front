function proWaitingSpinnerSpan($rootScope, $filter, $q, toastr) {

  function proWaitingSpinnerSpanLinkFn($scope) {
    if ($scope.isPending || $scope.isPending.length > 0) {
      $scope.isPending = true
    } else {
      $scope.isPending = false
    }
  }

  return {
    restrict:       'E',
    replace:        true,
    templateUrl:    'directives/pro-waiting-spinner-span/pro-waiting-spinner-span.tpl.html',
    scope: {
      isPending:    '='
    },
    link: proWaitingSpinnerSpanLinkFn
  }
}

angular.module('profitelo.directives.pro-waiting-spinner-span', [
  'pascalprecht.translate'
])
.directive('proWaitingSpinnerSpan', proWaitingSpinnerSpan)
