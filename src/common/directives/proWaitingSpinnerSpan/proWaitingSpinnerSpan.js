angular.module('profitelo.directives.proWaitingSpinnerSpan', [
  'pascalprecht.translate'
])

.directive('proWaitingSpinnerSpan', function() {
  return {
    restrict:       'E',
    replace:        true,
    templateUrl:    'directives/proWaitingSpinnerSpan/proWaitingSpinnerSpan.tpl.html',
    scope: {
      isPending:    '='
    },
    link: function($scope) {
      if ($scope.isPending || $scope.isPending.length > 0) {
        $scope.isPending = true
      } else {
        $scope.isPending = false
      }
    }
  }
})
